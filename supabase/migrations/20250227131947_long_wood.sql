/*
  # Create tools table

  1. New Tables
    - `tools`
      - `id` (uuid, primary key)
      - `name` (text)
      - `logo` (text)
      - `banner` (text)
      - `category` (text)
      - `description` (text)
      - `rating` (numeric)
      - `popularity` (integer)
      - `pricing_model` (text)
      - `pricing` (text)
      - `release_date` (date)
      - `last_updated` (date)
      - `developer` (text)
      - `website` (text)
      - `ease_of_use` (integer)
      - `features` (text[])
      - `use_cases` (text[])
      - `integrations` (text[])
      - `security` (text[])
      - `review_count` (integer)
      - `featured` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  2. Security
    - Enable RLS on `tools` table
    - Add policy for public read access
*/

CREATE TABLE IF NOT EXISTS tools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  logo text,
  banner text,
  category text,
  description text,
  rating numeric DEFAULT 0,
  popularity integer DEFAULT 0,
  pricing_model text,
  pricing text,
  release_date date,
  last_updated date,
  developer text,
  website text,
  ease_of_use integer,
  features text[],
  use_cases text[],
  integrations text[],
  security text[],
  review_count integer DEFAULT 0,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE tools ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tools are viewable by everyone"
  ON tools
  FOR SELECT
  TO public
  USING (true);