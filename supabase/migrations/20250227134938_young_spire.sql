/*
  # Seed Initial Data for AI Tools Discovery App

  1. Purpose
    - Populate the database with initial AI tools data
    - Create sample data for testing and demonstration

  2. Contents
    - Sample AI tools with details, features, and categories
*/

-- Insert sample tools data
INSERT INTO tools (
  name, logo, banner, category, description, rating, popularity, 
  pricing_model, pricing, release_date, last_updated, developer, 
  website, ease_of_use, features, use_cases, integrations, 
  security, review_count, featured
) VALUES
(
  'ChatGPT',
  'https://images.unsplash.com/photo-1679958157996-64ca061dcfa9?q=80&w=200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1677442135136-760c813a743d?q=80&w=800&auto=format&fit=crop',
  'Chatbots',
  'ChatGPT is an AI-powered chatbot developed by OpenAI, based on the GPT (Generative Pre-trained Transformer) language model. It can engage in conversational dialogue and provide responses that can appear surprisingly human.',
  4.8,
  98,
  'Freemium',
  'Free tier available. ChatGPT Plus at $20/month for priority access, faster response times, and access to GPT-4.',
  '2022-11-30',
  '2023-09-15',
  'OpenAI',
  'https://chat.openai.com',
  9,
  ARRAY['Natural language processing', 'Contextual understanding', 'Code generation and debugging', 'Content creation assistance', 'Language translation', 'Personalized responses'],
  ARRAY['Content creation', 'Research assistance', 'Programming help', 'Learning and education', 'Creative writing'],
  ARRAY['Web browser', 'Mobile app', 'API access (for Plus users)', 'Microsoft products'],
  ARRAY['Data encryption', 'User authentication', 'Privacy controls'],
  1245,
  true
),
(
  'DALL-E',
  'https://images.unsplash.com/photo-1679958157878-95cd08bf2d2c?q=80&w=200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1686193142599-2b0b77ac624d?q=80&w=800&auto=format&fit=crop',
  'Image Generation',
  'DALL-E is an AI system developed by OpenAI that can create realistic images and art from natural language descriptions. It combines concepts, attributes, and styles to generate completely new images.',
  4.7,
  92,
  'Paid',
  'Credit-based system. Users receive a certain number of free credits each month, with the option to purchase additional credits.',
  '2021-01-05',
  '2023-07-20',
  'OpenAI',
  'https://openai.com/dall-e-3',
  8,
  ARRAY['Text-to-image generation', 'High-resolution outputs', 'Style customization', 'Realistic rendering', 'Creative concept mixing'],
  ARRAY['Digital art creation', 'Design mockups', 'Marketing materials', 'Content illustration', 'Concept visualization'],
  ARRAY['Web interface', 'API access', 'Adobe Creative Cloud (limited)'],
  ARRAY['Content filtering', 'User authentication', 'Usage monitoring'],
  876,
  true
),
(
  'Midjourney',
  'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?q=80&w=200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1686193142599-2b0b77ac624d?q=80&w=800&auto=format&fit=crop',
  'Image Generation',
  'Midjourney is an AI-powered tool that generates images from textual descriptions. It specializes in creating artistic, surreal, and highly detailed visuals based on user prompts.',
  4.9,
  95,
  'Subscription',
  'Subscription-based with different tiers. Basic plan starts at $10/month, Standard at $30/month, and Pro at $60/month.',
  '2022-07-12',
  '2023-08-05',
  'Midjourney, Inc.',
  'https://www.midjourney.com',
  7,
  ARRAY['Text-to-image generation', 'Style variation control', 'High artistic quality', 'Batch processing', 'Image upscaling'],
  ARRAY['Concept art', 'Illustration', 'Creative inspiration', 'Game design', 'Visual storytelling'],
  ARRAY['Discord', 'Web app (beta)', 'API (limited access)'],
  ARRAY['Content moderation', 'User verification', 'Usage tracking'],
  1032,
  true
),
(
  'GitHub Copilot',
  'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=800&auto=format&fit=crop',
  'Coding',
  'GitHub Copilot is an AI pair programmer that helps developers write better code faster. It suggests whole lines or blocks of code as you type, drawing context from comments and the code you''re working with.',
  4.7,
  93,
  'Subscription',
  'Subscription-based at $10/month or $100/year. Free for students, teachers, and maintainers of popular open source projects.',
  '2021-06-29',
  '2023-08-15',
  'GitHub & OpenAI',
  'https://github.com/features/copilot',
  9,
  ARRAY['Code completion', 'Function generation', 'Comment-to-code conversion', 'Multiple language support', 'IDE integration'],
  ARRAY['Software development', 'Code refactoring', 'Learning new languages', 'Boilerplate code generation', 'Documentation assistance'],
  ARRAY['Visual Studio Code', 'Visual Studio', 'JetBrains IDEs', 'Neovim', 'GitHub.com'],
  ARRAY['Telemetry controls', 'Public code filtering', 'Data handling policies'],
  823,
  true
),
(
  'Anthropic Claude',
  'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop',
  'Chatbots',
  'Claude is an AI assistant created by Anthropic to be helpful, harmless, and honest. It''s designed to be a conversational AI that can assist with a wide range of tasks while being more transparent and safer than other AI systems.',
  4.7,
  89,
  'Freemium',
  'Free tier with limitations. Claude Pro at $20/month for increased usage limits and priority access.',
  '2023-03-14',
  '2023-09-25',
  'Anthropic',
  'https://www.anthropic.com/claude',
  9,
  ARRAY['Natural conversation', 'Long context understanding', 'Nuanced reasoning', 'Content generation', 'Information analysis', 'Code assistance'],
  ARRAY['Research assistance', 'Content creation', 'Programming help', 'Data analysis', 'Learning and education'],
  ARRAY['Web interface', 'API access', 'Amazon Bedrock', 'Slack'],
  ARRAY['Data privacy controls', 'User authentication', 'Responsible AI design'],
  487,
  true
);