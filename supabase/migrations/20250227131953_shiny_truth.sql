/*
  # Create saved tools table

  1. New Tables
    - `saved_tools`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles.id)
      - `tool_id` (uuid, references tools.id)
      - `created_at` (timestamp)
  2. Security
    - Enable RLS on `saved_tools` table
    - Add policy for authenticated users to read their own saved tools
    - Add policy for authenticated users to insert their own saved tools
    - Add policy for authenticated users to delete their own saved tools
*/

CREATE TABLE IF NOT EXISTS saved_tools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  tool_id uuid REFERENCES tools(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, tool_id)
);

ALTER TABLE saved_tools ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own saved tools"
  ON saved_tools
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can save tools"
  ON saved_tools
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unsave tools"
  ON saved_tools
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);