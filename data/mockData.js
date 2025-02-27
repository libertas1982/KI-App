// Mock data for AI Tool Discovery App

// Categories
export const categories = [
  { id: 'writing', name: 'Writing' },
  { id: 'image', name: 'Image Generation' },
  { id: 'art', name: 'Art' },
  { id: 'chatbots', name: 'Chatbots' },
  { id: 'language', name: 'Language' },
  { id: 'music', name: 'Music' },
  { id: 'video', name: 'Video' },
  { id: 'productivity', name: 'Productivity' },
  { id: 'coding', name: 'Coding' },
  { id: 'business', name: 'Business' }
];

// Pricing Models
export const pricingModels = [
  'Free',
  'Freemium',
  'Paid',
  'Subscription',
  'Enterprise'
];

// Features
export const features = [
  'API Access',
  'Mobile App',
  'Desktop App',
  'Browser Extension',
  'Offline Mode',
  'Team Collaboration',
  'Custom Templates',
  'Export Options',
  'Integrations',
  'Multi-language Support'
];

// Mock Tools Data
export const mockTools = [
  {
    id: 1,
    name: 'ChatGPT',
    logo: 'https://images.unsplash.com/photo-1679958157996-64ca061dcfa9?q=80&w=200&auto=format&fit=crop',
    banner: 'https://images.unsplash.com/photo-1677442135136-760c813a743d?q=80&w=800&auto=format&fit=crop',
    category: 'Chatbots',
    description: 'ChatGPT is an AI-powered chatbot developed by OpenAI, based on the GPT (Generative Pre-trained Transformer) language model. It can engage in conversational dialogue and provide responses that can appear surprisingly human.',
    rating: 4.8,
    popularity: 98,
    pricingModel: 'Freemium',
    pricing: 'Free tier available. ChatGPT Plus at $20/month for priority access, faster response times, and access to GPT-4.',
    releaseDate: '2022-11-30',
    lastUpdated: '2023-09-15',
    developer: 'OpenAI',
    website: 'https://chat.openai.com',
    easeOfUse: 9,
    features: [
      'Natural language processing',
      'Contextual understanding',
      'Code generation and debugging',
      'Content creation assistance',
      'Language translation',
      'Personalized responses'
    ],
    useCases: [
      'Content creation',
      'Research assistance',
      'Programming help',
      'Learning and education',
      'Creative writing'
    ],
    integrations: [
      'Web browser',
      'Mobile app',
      'API access (for Plus users)',
      'Microsoft products'
    ],
    security: [
      'Data encryption',
      'User authentication',
      'Privacy controls'
    ],
    pricingTiers: [
      {
        name: 'Free',
        price: '$0',
        features: [
          'Access to GPT-3.5',
          'Standard response speed',
          'Standard availability'
        ]
      },
      {
        name: 'Plus',
        price: '$20/mo',
        features: [
          'Access to GPT-4',
          'Faster response times',
          'Priority access during peak times',
          'Early access to new features'
        ]
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        features: [
          'Custom solutions',
          'Advanced security',
          'Dedicated support',
          'Service level agreements'
        ]
      }
    ],
    reviewCount: 1245,
    featured: true
  },
  {
    id: 2,
    name: 'DALL-E',
    logo: 'https://images.unsplash.com/photo-1679958157878-95cd08bf2d2c?q=80&w=200&auto=format&fit=crop',
    banner: 'https://images.unsplash.com/photo-1686193142599-2b0b77ac624d?q=80&w=800&auto=format&fit=crop',
    category: 'Image Generation',
    description: 'DALL-E is an AI system developed by OpenAI that can create realistic images and art from natural language descriptions. It combines concepts, attributes, and styles to generate completely new images.',
    rating: 4.7,
    popularity: 92,
    pricingModel: 'Paid',
    pricing: 'Credit-based system. Users receive a certain number of free credits each month, with the option to purchase additional credits.',
    releaseDate: '2021-01-05',
    lastUpdated: '2023-07-20',
    developer: 'OpenAI',
    website: 'https://openai.com/dall-e-3',
    easeOfUse: 8,
    features: [
      'Text-to-image generation',
      'High-resolution outputs',
      'Style customization',
      'Realistic rendering',
      'Creative concept mixing'
    ],
    useCases: [
      'Digital art creation',
      'Design mockups',
      'Marketing materials',
      'Content illustration',
      'Concept visualization'
    ],
    integrations: [
      'Web interface',
      'API access',
      'Adobe Creative Cloud (limited)'
    ],
    security: [
      'Content filtering',
      'User authentication',
      'Usage monitoring'
    ],
    pricingTiers: [
      {
        name: 'Basic',
        price: 'Free credits',
        features: [
          'Limited free credits monthly',
          'Standard resolution images',
          'Basic editing capabilities'
        ]
      },
      {
        name: 'Pro',
        price: '$15/115 credits',
        features: [
          'More credits',
          'Higher resolution images',
          'Priority processing'
        ]
      }
    ],
    reviewCount: 876,
    featured: true
  },
  {
    id: 3,
    name: 'Midjourney',
    logo: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?q=80&w=200&auto=format&fit=crop',
    banner: 'https://images.unsplash.com/photo-1686193142599-2b0b77ac624d?q=80&w=800&auto=format&fit=crop',
    category: 'Image Generation',
    description: 'Midjourney is an AI-powered tool that generates images from textual descriptions. It specializes in creating artistic, surreal, and highly detailed visuals based on user prompts.',
    rating: 4.9,
    popularity: 95,
    pricingModel: 'Subscription',
    pricing: 'Subscription-based with different tiers. Basic plan starts at $10/month, Standard at $30/month, and Pro at $60/month.',
    releaseDate: '2022-07-12',
    lastUpdated: '2023-08-05',
    developer: 'Midjourney, Inc.',
    website: 'https://www.midjourney.com',
    easeOfUse: 7,
    features: [
      'Text-to-image generation',
      'Style variation control',
      'High artistic quality',
      'Batch processing',
      'Image upscaling'
    ],
    useCases: [
      'Concept art',
      'Illustration',
      'Creative inspiration',
      'Game design',
      'Visual storytelling'
    ],
    integrations: [
      'Discord',
      'Web app (beta)',
      'API (limited access)'
    ],
    security: [
      'Content moderation',
      'User verification',
      'Usage tracking'
    ],
    pricingTiers: [
      {
        name: 'Basic',
        price: '$10/mo',
        features: [
          'Basic image generation',
          'Standard queue',
          'Limited monthly usage'
        ]
      },
      {
        name: 'Standard',
        price: '$30/mo',
        features: [
          'Faster image generation',
          'Priority queue',
          'More monthly usage',
          'Relaxed usage rules'
        ]
      },
      {
        name: 'Pro',
        price: '$60/mo',
        features: [
          'Maximum speed',
          'Highest priority',
          'Maximum monthly usage',
          'Team features'
        ]
      }
    ],
    reviewCount: 1032,
    featured: true
  },
  {
    id: 4,
    name: 'Jasper',
    logo: 'https://images.unsplash.com/photo-1664575198308-3959904fa430?q=80&w=200&auto=format&fit=crop',
    banner: 'https://images.unsplash.com/photo-1664575198263-269a022d6e14?q=80&w=800&auto=format&fit=crop',
    category: 'Writing',
    description: 'Jasper (formerly Jarvis) is an AI content generator designed to help create marketing copy, blog posts, social media content, and more. It uses advanced language models to generate human-like text based on prompts.',
    rating: 4.6,
    popularity: 88,
    pricingModel: 'Subscription',
    pricing: 'Subscription-based starting at $49/month for the Creator plan, $69/month for the Pro plan, and custom pricing for Business plans.',
    releaseDate: '2021-02-15',
    lastUpdated: '2023-06-10',
    developer: 'Jasper.ai',
    website: 'https://www.jasper.ai',
    easeOfUse: 9,
    features: [
      'AI content generation',
      'Templates for different content types',
      'Tone adjustment',
      'Plagiarism checker',
      'Team collaboration',
      'SEO optimization'
    ],
    useCases: [
      'Marketing copy',
      'Blog content',
      'Social media posts',
      'Email campaigns',
      'Product descriptions'
    ],
    integrations: [
      'Surfer SEO',
      'Grammarly',
      'WordPress',
      'Google Docs',
      'Chrome extension'
    ],
    security: [
      'Data encryption',
      'User authentication',
      'Role-based access control'
    ],
    pricingTiers: [
      {
        name: 'Creator',
        price: '$49/mo',
        features: [
          'AI content generation',
          'Basic templates',
          'Limited words per month'
        ]
      },
      {
        name: 'Pro',
        price: '$69/mo',
        features: [
          'More templates',
          'More words per month',
          'SEO mode',
          'Plagiarism checker'
        ]
      },
      {
        name: 'Business',
        price: 'Custom',
        features: [
          'Custom word limits',
          'Team collaboration',
          'API access',
          'Dedicated account manager'
        ]
      }
    ],
    reviewCount: 745,
    featured: false
  },
  {
    id: 5,
    name: 'Stable Diffusion',
    logo: 'https://images.unsplash.com/photo-1682687220208-22d7a2543e88?q=80&w=200&auto=format&fit=crop',
    banner: 'https://images.unsplash.com/photo-1682687220208-22d7a2543e88?q=80&w=800&auto=format&fit=crop',
    category: 'Image Generation',
    description: 'Stable Diffusion is an open-source AI model that generates detailed images from text descriptions. It can run on consumer hardware and offers flexibility for customization and fine-tuning.',
    rating: 4.5,
    popularity: 90,
    pricingModel: 'Free',
    pricing: 'Open-source and free to use. Commercial services built on top of Stable Diffusion may charge fees.',
    releaseDate: '2022-08-22',
    lastUpdated: '2023-09-01',
    developer: 'Stability AI',
    website: 'https://stability.ai',
    easeOfUse: 6,
    features: [
      'Text-to-image generation',
      'Image-to-image transformation',
      'Inpainting and outpainting',
      'Local installation option',
      'Model customization'
    ],
    useCases: [
      'Digital art',
      'Design prototyping',
      'Content creation',
      'Game asset development',
      'Research and experimentation'
    ],
    integrations: [
      'Hugging Face',
      'GitHub repositories',
      'Various GUI tools',
      'Custom applications'
    ],
    security: [
      'Local processing option',
      'Open-source code review',
      'Community oversight'
    ],
    pricingTiers: [
      {
        name: 'Open Source',
        price: 'Free',
        features: [
          'Full model access',
          'Local installation',
          'Community support',
          'Customization options'
        ]
      },
      {
        name: 'DreamStudio',
        price: 'Credit-based',
        features: [
          'Web interface',
          'Cloud processing',
          'Higher limits',
          'Technical support'
        ]
      }
    ],
    reviewCount: 689,
    featured: false
  },
  {
    id: 6,
    name: 'GitHub Copilot',
    logo: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=200&auto=format&fit=crop',
    banner: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=800&auto=format&fit=crop',
    category: 'Coding',
    description: 'GitHub Copilot is an AI pair programmer that helps developers write better code faster. It suggests whole lines or blocks of code as you type, drawing context from comments and the code you're working with.',
    rating: 4.7,
    popularity: 93,
    pricingModel: 'Subscription',
    pricing: 'Subscription-based at $10/month or $100/year. Free for students, teachers, and maintainers of popular open source projects.',
    releaseDate: '2021-06-29',
    lastUpdated: '2023-08-15',
    developer: 'GitHub & OpenAI',
    website: 'https://github.com/features/copilot',
    easeOfUse: 9,
    features: [
      'Code completion',
      'Function generation',
      'Comment-to-code conversion',
      'Multiple language support',
      'IDE integration'
    ],
    useCases: [
      'Software development',
      'Code refactoring',
      'Learning new languages',
      'Boilerplate code generation',
      'Documentation assistance'
    ],
    integrations: [
      'Visual Studio Code',
      'Visual Studio',
      'JetBrains IDEs',
      'Neovim',
      'GitHub.com'
    ],
    security: [
      'Telemetry controls',
      'Public code filtering',
      'Data handling policies'
    ],
    pricingTiers: [
      {
        name: 'Individual',
        price: '$10/mo',
        features: [
          'Full access to Copilot',
          'Multiple IDE support',
          'Regular updates'
        ]
      },
      {
        name: 'Business',
        price: '$19/user/mo',
        features: [
          'Team management',
          'Enterprise security',
          'License management',
          'Organization-wide policies'
        ]
      }
    ],
    reviewCount: 823,
    featured: true
  },
  {
    id: 7,
    name: 'Notion AI',
    logo: 'https://images.unsplash.com/photo-1646617747609-7cf15d3bc3d3?q=80&w=200&auto=format&fit=crop',
    banner: 'https://images.unsplash.com/photo-1646617747609-7cf15d3bc3d3?q=80&w=800&auto=format&fit=crop',
    category: 'Writing',
    description: 'Notion AI is an AI writing assistant integrated into the Notion workspace platform. It helps users draft, edit, summarize, and brainstorm content directly within their Notion documents.',
    rating: 4.5,
    popularity: 85,
    pricingModel: 'Freemium',
    pricing: 'Available as an add-on to Notion plans at $10/month per member. Some basic AI features included in regular Notion plans.',
    releaseDate: '2022-11-16',
    lastUpdated: '2023-07-12',
    developer: 'Notion Labs, Inc.',
    website: 'https://www.notion.so/product/ai',
    easeOfUse: 9,
    features: [
      'Content generation',
      'Text summarization',
      'Editing and proofreading',
      'Translation',
      'Brainstorming assistance',
      'Format conversion'
    ],
    useCases: [
      'Note-taking',
      'Content creation',
      'Meeting summaries',
      'Project documentation',
      'Knowledge management'
    ],
    integrations: [
      'Notion workspace',
      'Web clipper',
      'API connections'
    ],
    security: [
      'Data encryption',
      'User authentication',
      'Workspace permissions'
    ],
    pricingTiers: [
      {
        name: 'Basic AI',
        price: 'Included',
        features: [
          'Simple completions',
          'Basic editing help',
          'Limited usage'
        ]
      },
      {
        name: 'Notion AI',
        price: '$10/mo',
        features: [
          'Full AI capabilities',
          'Unlimited usage',
          'Advanced writing features',
          'Translation and summarization'
        ]
      }
    ],
    reviewCount: 562,
    featured: false
  },
  {
    id: 8,
    name: 'Runway',
    logo: 'https://images.unsplash.com/photo-1618172193763-c511deb635ca?q=80&w=200&auto=format&fit=crop',
    banner: 'https://images.unsplash.com/photo-1618172193763-c511deb635ca?q=80&w=800&auto=format&fit=crop',
    category: 'Video',
    description: 'Runway is an applied AI research company building a next-generation creation suite with AI tools for video editing, generation, and visual effects. It offers various AI-powered tools for creative professionals.',
    rating: 4.8,
    popularity: 87,
    pricingModel: 'Freemium',
    pricing: 'Free plan with limited features. Pro plan at $15/month. Unlimited plan at $35/month with more generations and priority access.',
    releaseDate: '2018-09-01',
    lastUpdated: '2023-09-10',
    developer: 'Runway AI, Inc.',
    website: 'https://runwayml.com',
    easeOfUse: 8,
    features: [
      'Text-to-video generation',
      'Image-to-video conversion',
      'Video editing tools',
      'Green screen removal',
      'Motion tracking',
      'Style transfer'
    ],
    useCases: [
      'Video production',
      'Visual effects',
      'Content creation',
      'Advertising',
      'Social media content'
    ],
    integrations: [
      'Adobe Creative Cloud',
      'Web application',
      'API access (enterprise)'
    ],
    security: [
      'Content encryption',
      'User authentication',
      'Project privacy controls'
    ],
    pricingTiers: [
      {
        name: 'Free',
        price: '$0',
        features: [
          'Limited generations',
          'Basic tools',
          'Standard quality'
        ]
      },
      {
        name: 'Pro',
        price: '$15/mo',
        features: [
          'More generations',
          'Advanced tools',
          'Higher quality output',
          'Priority support'
        ]
      },
      {
        name: 'Unlimited',
        price: '$35/mo',
        features: [
          'Unlimited generations',
          'All tools and features',
          'Highest quality',
          'Priority processing'
        ]
      }
    ],
    reviewCount: 478,
    featured: true
  },
  {
    id: 9,
    name: 'Grammarly',
    logo: 'https://images.unsplash.com/photo-1622675363311-3e1904dc1885?q=80&w=200&auto=format&fit=crop',
    banner: 'https://images.unsplash.com/photo-1622675363311-3e1904dc1885?q=80&w=800&auto=format&fit=crop',
    category: 'Writing',
    description: 'Grammarly is an AI-powered writing assistant that helps users improve their writing by checking grammar, spelling, punctuation, clarity, engagement, and delivery mistakes. It offers suggestions to enhance writing quality.',
    rating: 4.7,
    popularity: 94,
    pricingModel: 'Freemium',
    pricing: 'Free basic version. Premium plan at $12/month. Business plan at $15/user/month.',
    releaseDate: '2009-08-01',
    lastUpdated: '2023-08-20',
    developer: 'Grammarly, Inc.',
    website: 'https://www.grammarly.com',
    easeOfUse: 10,
    features: [
      'Grammar checking',
      'Spelling correction',
      'Punctuation review',
      'Clarity improvements',
      'Tone adjustments',
      'Plagiarism detection'
    ],
    useCases: [
      'Academic writing',
      'Business communication',
      'Content creation',
      'Email composition',
      'Social media posts'
    ],
    integrations: [
      'Web browsers (extension)',
      'Microsoft Office',
      'Google Docs',
      'Desktop app',
      'Mobile keyboard'
    ],
    security: [
      'Data encryption',
      'User authentication',
      'Enterprise-grade security',
      'GDPR compliance'
    ],
    pricingTiers: [
      {
        name: 'Free',
        price: '$0',
        features: [
          'Basic grammar checking',
          'Spelling corrections',
          'Basic punctuation'
        ]
      },
      {
        name: 'Premium',
        price: '$12/mo',
        features: [
          'Advanced grammar',
          'Clarity suggestions',
          'Tone adjustments',
          'Plagiarism detection',
          'Full-sentence rewrites'
        ]
      },
      {
        name: 'Business',
        price: '$15/user/mo',
        features: [
          'All Premium features',
          'Team management',
          'Style guide',
          'Analytics dashboard',
          'Priority support'
        ]
      }
    ],
    reviewCount: 1245,
    featured: false
  },
  {
    id: 10,
    name: 'Murf AI',
    logo: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?q=80&w=200&auto=format&fit=crop',
    banner: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?q=80&w=800&auto=format&fit=crop',
    category: 'Audio',
    description: 'Murf AI is a text-to-speech platform that creates studio-quality voiceovers with AI-generated voices. It offers natural-sounding voices in multiple languages and accents for various content creation needs.',
    rating: 4.6,
    popularity: 82,
    pricingModel: 'Freemium',
    pricing: 'Free plan with limited features. Basic plan at $29/month. Pro plan at $39/month. Enterprise plan with custom pricing.',
    releaseDate: '2020-05-15',
    lastUpdated: '2023-07-05',
    developer: 'Murf AI, Inc.',
    website: 'https://murf.ai',
    easeOfUse: 9,
    features: [
      'Text-to-speech conversion',
      'Multiple voice options',
      'Voice customization',
      'Multi-language support',
      'Voice cloning (premium)',
      'Audio editing tools'
    ],
    useCases: [
      'Video narration',
      'Podcast production',
      'E-learning content',
      'IVR systems',
      'Audiobook creation'
    ],
    integrations: [
      'Web application',
      'API access',
      'Zapier'
    ],
    security: [
      'Data encryption',
      'User authentication',
      'Voice IP protection'
    ],
    pricingTiers: [
      {
        name: 'Free',
        price: '$0',
        features: [
          'Limited minutes',
          'Basic voices',
          'Standard quality'
        ]
      },
      {
        name: 'Basic',
        price: '$29/mo',
        features: [
          'More minutes',
          'More voices',
          'Higher quality',
          'Commercial usage'
        ]
      },
      {
        name: 'Pro',
        price: '$39/mo',
        features: [
          'Even more minutes',
          'All voices',
          'Highest quality',
          'Voice customization',
          'Priority support'
        ]
      }
    ],
    reviewCount: 356,
    featured: false
  },
  {
    id: 11,
    name: 'Anthropic Claude',
    logo: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=200&auto=format&fit=crop',
    banner: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop',
    category: 'Chatbots',
    description: 'Claude is an AI assistant created by Anthropic to be helpful, harmless, and honest. It's designed to be a conversational AI that can assist with a wide range of tasks while being more transparent and safer than other AI systems.',
    rating: 4.7,
    popularity: 89,
    pricingModel: 'Freemium',
    pricing: 'Free tier with limitations. Claude Pro at $20/month for increased usage limits and priority access.',
    releaseDate: '2023-03-14',
    lastUpdated: '2023-09-25',
    developer: 'Anthropic',
    website: 'https://www.anthropic.com/claude',
    easeOfUse: 9,
    features: [
      'Natural conversation',
      'Long context understanding',
      'Nuanced reasoning',
      'Content generation',
      'Information analysis',
      'Code assistance'
    ],
    useCases: [
      'Research assistance',
      'Content creation',
      'Programming help',
      'Data analysis',
      'Learning and education'
    ],
    integrations: [
      'Web interface',
      'API access',
      'Amazon Bedrock',
      'Slack'
    ],
    security: [
      'Data privacy controls',
      'User authentication',
      'Responsible AI design'
    ],
    pricingTiers: [
      {
        name: 'Free',
        price: '$0',
        features: [
          'Access to Claude 3 Haiku',
          'Limited messages per day',
          'Standard response times'
        ]
      },
      {
        name: 'Pro',
        price: '$20/mo',
        features: [
          'Access to all Claude models',
          'More messages per day',
          'Priority access',
          'Longer conversations'
        ]
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        features: [
          'Custom solutions',
          'Advanced security',
          'Dedicated support',
          'Service level agreements'
        ]
      }
    ],
    reviewCount: 487,
    featured: true
  },
  {
    id: 12,
    name: 'Synthesia',
    logo: 'https://images.unsplash.com/photo-1626544827763-d516dce335e2?q=80&w=200&auto=format&fit=crop',
    banner: 'https://images.unsplash.com/photo-1626544827763-d516dce335e2?q=80&w=800&auto=format&fit=crop',
    category: 'Video',
    description: 'Synthesia is an AI video generation platform that creates professional videos with virtual presenters from text. It allows users to create videos in multiple languages without filming or hiring actors.',
    rating: 4.5,
    popularity: 84,
    pricingModel: 'Subscription',
    pricing: 'Personal plan at $30/month. Corporate plan at $90/month. Enterprise plan with custom pricing.',
    releaseDate: '2019-04-10',
    lastUpdated: '2023-08-30',
    developer: 'Synthesia Ltd.',
    website: 'https://www.synthesia.io',
    easeOfUse: 8,
    features: [
      'AI video generation',
      'Virtual presenters',
      'Multi-language support',
      'Custom backgrounds',
      'Script-to-video conversion',
      'Video templates'
    ],
    useCases: [
      'Training videos',
      'Product demonstrations',
      'Marketing content',
      'Personalized messages',
      'Localized content'
    ],
    integrations: [
      'Web application',
      'API access (enterprise)',
      'LMS systems'
    ],
    security: [
      'Data encryption',
      'User authentication',
      'Enterprise security controls'
    ],
    pricingTiers: [
      {
        name: 'Personal',
        price: '$30/mo',
        features: [
          'Limited video minutes',
          'Basic avatars',
          'Standard quality',
          'Basic templates'
        ]
      },
      {
        name: 'Corporate',
        price: '$90/mo',
        features: [
          'More video minutes',
          'More avatars',
          'Higher quality',
          'Custom backgrounds',
          'Priority support'
        ]
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        features: [
          'Custom usage limits',
          'All avatars',
          'Highest quality',
          'Custom avatars',
          'API access',
          'Dedicated support'
        ]
      }
    ],
    reviewCount: 412,
    featured: false
  },
  {
    id: 13,
    name: 'Perplexity AI',
    logo: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=200&auto=format&fit=crop',
    banner: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=800&auto=format&fit=crop',
    category: 'Research',
    description: 'Perplexity AI is an AI-powered search engine and research assistant that provides direct answers to questions with cited sources. It combines the capabilities of large language models with real-time web information.',
    rating: 4.8,
    popularity: 86,
    pricingModel: 'Freemium',
    pricing: 'Free tier with basic features. Pro plan at $20/month with advanced features and higher usage limits.',
    releaseDate: '2022-08-30',
    lastUpdated: '2023-09-15',
    developer: 'Perplexity Labs, Inc.',
    website: 'https://www.perplexity.ai',
    easeOfUse: 9,
    features: [
      'AI-powered search',
      'Direct answers with citations',
      'Real-time information',
      'Conversational interface',
      'Deep research capabilities',
      'Multi-modal search'
    ],
    useCases: [
      'Academic research',
      'Fact checking',
      'Information gathering',
      'Learning new topics',
      'Current events analysis'
    ],
    integrations: [
      'Web application',
      'Mobile app',
      'Browser extension'
    ],
    security: [
      'Data privacy',
      'User authentication',
      'Search history management'
    ],
    pricingTiers: [
      {
        name: 'Free',
        price: '$0',
        features: [
          'Basic search capabilities',
          'Limited queries per day',
          'Standard models'
        ]
      },
      {
        name: 'Pro',
        price: '$20/mo',
        features: [
          'Advanced search capabilities',
          'More queries per day',
          'Advanced models',
          'Copilot features',
          'Priority processing'
        ]
      }
    ],
    reviewCount: 325,
    featured: true
  },
  {
    id: 14,
    name: 'Otter.ai',
    logo: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?q=80&w=200&auto=format&fit=crop',
    banner: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?q=80&w=800&auto=format&fit=crop',
    category: 'Productivity',
    description: 'Otter.ai is an AI-powered meeting assistant that provides real-time transcription, automated notes, and meeting insights. It helps teams capture, find, and share important information from voice conversations.',
    rating: 4.6,
    popularity: 83,
    pricingModel: 'Freemium',
    pricing: 'Free basic plan. Pro plan at $16.99/month. Business plan at $30/user/month. Enterprise plan with custom pricing.',
    releaseDate: '2018-02-01',
    lastUpdated: '2023-07-20',
    developer: 'Otter.ai',
    website: 'https://otter.ai',
    easeOfUse: 9,
    features: [
      'Real-time transcription',
      'Automated meeting notes',
      'Speaker identification',
      'Keyword highlighting',
      'Search functionality',
      'Meeting summaries'
    ],
    useCases: [
      'Meeting documentation',
      'Interview transcription',
      'Lecture notes',
      'Content creation',
      'Team collaboration'
    ],
    integrations: [
      'Zoom',
      'Microsoft Teams',
      'Google Meet',
      'Slack',
      'Calendar apps'
    ],
    security: [
      'Data encryption',
      'User authentication',
      'Enterprise security controls',
      'GDPR compliance'
    ],
    pricingTiers: [
      {
        name: 'Free',
        price: '$0',
        features: [
          'Limited minutes per month',
          'Basic transcription',
          'Standard features'
        ]
      },
      {
        name: 'Pro',
        price: '$16.99/mo',
        features: [
          'More minutes per month',
          'Advanced transcription',
          'Custom vocabulary',
          'Priority email support'
        ]
      },
      {
        name: 'Business',
        price: '$30/user/mo',
        features: [
          'Even more minutes',
          'Team management',
          'Advanced security',
          'Analytics',
          'Dedicated support'
        ]
      }
    ],
    reviewCount: 578,
    featured: false
  },
  {
    id: 15,
    name: 'Replicate',
    logo: 'https://images.unsplash.com/photo-1642427749670-f20e2e76ed8c?q=80&w=200&auto=format&fit=crop',
    banner: 'https://images.unsplash.com/photo-1642427749670-f20e2e76ed8c?q=80&w=800&auto=format&fit=crop',
    category: 'Developer Tools',
    description: 'Replicate is a platform that lets you run machine learning models with a cloud API, without having to set up infrastructure or manage deployments. It provides access to thousands of open-source models.',
    rating: 4.7,
    popularity: 81,
    pricingModel: 'Pay-as-you-go',
    pricing: 'Usage-based pricing. Pay only for the compute time you use. No minimum fees or subscriptions required.',
    releaseDate: '2021-07-01',
    lastUpdated: '2023-09-05',
    developer: 'Replicate, Inc.',
    website: 'https://replicate.com',
    easeOfUse: 7,
    features: [
      'Cloud API for ML models',
      'Access to open-source models',
      'Custom model hosting',
      'Version control',
      'Collaborative development',
      'Usage monitoring'
    ],
    useCases: [
      'AI application development',
      'Research prototyping',
      'Content generation',
      'Image processing',
      'Natural language processing'
    ],
    integrations: [
      'API',
      'Python SDK',
      'JavaScript SDK',
      'GitHub'
    ],
    security: [
      'API authentication',
      'Data encryption',
      'Usage controls'
    ],
    pricingTiers: [
      {
        name: 'Pay-as-you-go',
        price: 'Variable',
        features: [
          'Access to all models',
          'Pay only for what you use',
          'No minimum fees',
          'Standard support'
        ]
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        features: [
          'Custom pricing',
          'SLAs',
          'Dedicated support',
          'Custom models',
          'Advanced security'
        ]
      }
    ],
    reviewCount: 289,
    featured: false
  }
];