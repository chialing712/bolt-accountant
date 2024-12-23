/*
  # Additional Security Policies

  This migration adds new security policies for project management and document handling.

  1. New Policies
    - Project deletion policy for owners
    - Document deletion policy
    - Message deletion policy
    - Review modification policies
*/

-- Projects policies
CREATE POLICY "Project owners can delete their projects"
  ON projects FOR DELETE
  USING (auth.uid() = client_id);

-- Documents policies
CREATE POLICY "Document owners can delete their documents"
  ON documents FOR DELETE
  USING (auth.uid() = uploaded_by);

-- Messages policies
CREATE POLICY "Message senders can delete their messages"
  ON messages FOR DELETE
  USING (auth.uid() = sender_id);

-- Reviews policies
CREATE POLICY "Review authors can update their reviews"
  ON reviews FOR UPDATE
  USING (auth.uid() = reviewer_id);

CREATE POLICY "Review authors can delete their reviews"
  ON reviews FOR DELETE
  USING (auth.uid() = reviewer_id);