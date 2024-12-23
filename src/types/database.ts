export interface Profile {
  id: string;
  user_type: 'client' | 'accountant';
  full_name: string;
  company_name?: string;
  bio?: string;
  hourly_rate?: number;
  specializations?: string[];
  certifications?: string[];
  is_verified: boolean;
  rating: number;
  total_reviews: number;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  client_id: string;
  accountant_id?: string;
  title: string;
  description: string;
  budget_min: number;
  budget_max: number;
  status: 'draft' | 'open' | 'in_progress' | 'completed' | 'cancelled';
  start_date?: string;
  end_date?: string;
  created_at: string;
  updated_at: string;
}

export interface ProjectRequirement {
  id: string;
  project_id: string;
  requirement: string;
  is_mandatory: boolean;
  created_at: string;
}

export interface Document {
  id: string;
  project_id?: string;
  uploaded_by: string;
  name: string;
  file_path: string;
  file_type: string;
  file_size: number;
  is_private: boolean;
  created_at: string;
}

export interface Conversation {
  id: string;
  project_id?: string;
  created_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  is_read: boolean;
  created_at: string;
}

export interface Review {
  id: string;
  project_id: string;
  reviewer_id: string;
  reviewee_id: string;
  rating: number;
  comment?: string;
  created_at: string;
}