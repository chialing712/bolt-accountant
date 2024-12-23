/*
  # Initial Database Schema for Accountant Marketplace

  1. New Tables
    - `profiles`
      - Extends auth.users with additional profile information
      - Stores user type (client/accountant) and verification status
    - `projects`
      - Stores project details, budget, timeline
      - Links to client and assigned accountant
    - `project_requirements`
      - Stores detailed project requirements
      - Links to parent project
    - `documents`
      - Secure document storage
      - Links to projects and conversations
    - `conversations`
      - Messaging system between users
      - Links to projects
    - `messages`
      - Individual messages within conversations
    - `reviews`
      - Two-way rating system
      - Links to projects and users

  2. Security
    - Enable RLS on all tables
    - Add policies for data access control
    - Implement role-based permissions
*/

-- Profiles table extending auth.users
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  user_type text NOT NULL CHECK (user_type IN ('client', 'accountant')),
  full_name text,
  company_name text,
  bio text,
  hourly_rate integer,
  specializations text[],
  certifications text[],
  is_verified boolean DEFAULT false,
  rating decimal(3,2) DEFAULT 0,
  total_reviews integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Projects table
CREATE TABLE projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES profiles(id) NOT NULL,
  accountant_id uuid REFERENCES profiles(id),
  title text NOT NULL,
  description text NOT NULL,
  budget_min integer NOT NULL,
  budget_max integer NOT NULL,
  status text NOT NULL CHECK (status IN ('draft', 'open', 'in_progress', 'completed', 'cancelled')),
  start_date date,
  end_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Project requirements
CREATE TABLE project_requirements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  requirement text NOT NULL,
  is_mandatory boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Documents table
CREATE TABLE documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  uploaded_by uuid REFERENCES profiles(id) NOT NULL,
  name text NOT NULL,
  file_path text NOT NULL,
  file_type text NOT NULL,
  file_size integer NOT NULL,
  is_private boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Conversations table
CREATE TABLE conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

-- Messages table
CREATE TABLE messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid REFERENCES conversations(id) ON DELETE CASCADE NOT NULL,
  sender_id uuid REFERENCES profiles(id) NOT NULL,
  content text NOT NULL,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Reviews table
CREATE TABLE reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  reviewer_id uuid REFERENCES profiles(id) NOT NULL,
  reviewee_id uuid REFERENCES profiles(id) NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_requirements ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Projects policies
CREATE POLICY "Clients can create projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = client_id);

CREATE POLICY "Projects are viewable by everyone"
  ON projects FOR SELECT
  USING (true);

CREATE POLICY "Project owners can update their projects"
  ON projects FOR UPDATE
  USING (auth.uid() = client_id);

-- Documents policies
CREATE POLICY "Document owners can manage their documents"
  ON documents FOR ALL
  USING (auth.uid() = uploaded_by);

CREATE POLICY "Project participants can view documents"
  ON documents FOR SELECT
  USING (
    auth.uid() IN (
      SELECT client_id FROM projects WHERE id = project_id
      UNION
      SELECT accountant_id FROM projects WHERE id = project_id
    )
  );

-- Messages policies
CREATE POLICY "Conversation participants can view messages"
  ON messages FOR SELECT
  USING (
    auth.uid() IN (
      SELECT client_id FROM projects 
      WHERE id = (SELECT project_id FROM conversations WHERE id = conversation_id)
      UNION
      SELECT accountant_id FROM projects 
      WHERE id = (SELECT project_id FROM conversations WHERE id = conversation_id)
    )
  );

CREATE POLICY "Users can send messages"
  ON messages FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = sender_id);

-- Reviews policies
CREATE POLICY "Reviews are viewable by everyone"
  ON reviews FOR SELECT
  USING (true);

CREATE POLICY "Project participants can create reviews"
  ON reviews FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = reviewer_id AND
    reviewer_id IN (
      SELECT client_id FROM projects WHERE id = project_id
      UNION
      SELECT accountant_id FROM projects WHERE id = project_id
    )
  );