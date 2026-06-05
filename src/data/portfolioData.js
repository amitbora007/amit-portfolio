export const portfolioData = {
  personalInfo: {
    name: 'Amit Bora',
    title: 'Senior Backend Engineer',
    location: 'New Delhi, India',
    email: 'amitbora007@gmail.com',
    linkedin: 'https://www.linkedin.com/in/amitbora2',
    github: 'https://github.com/amitbora007',
    summary: 'Senior Backend Engineer with 7+ years of experience specializing in cloud-native microservices, secure REST APIs, scalable systems, payment processing, and AI-driven applications. I build enterprise-grade systems on AWS and Azure with a strong focus on reliability, security, performance, and maintainability. Passionate about clean architecture, performance tuning, and solving complex engineering challenges.'
  },

  trustIndicators: [
    { label: 'Experience', value: '7+ Years' },
    { label: 'Focus', value: 'Payment Systems' },
    { label: 'Cloud', value: 'Azure Microservices' },
    { label: 'AI Integration', value: 'Practical GenAI' }
  ],

  about: {
    narrative: 'I am a backend-focused senior engineer specializing in designing and scaling secure payment gateways, distributed microservices, and AI-enabled software systems. My career is defined by transforming business requirements into high-throughput, low-latency API architectures that deliver measurable business impact. I focus heavily on systems thinking: designing for modularity, maintaining clear documentation, auditing security protocols, and ensuring robust monitoring and quick Mean Time to Resolution (MTTR).',
    focusPoints: [
      {
        title: 'Scalable Backend Systems',
        description: 'Designing modular, high-throughput REST and event-driven APIs using PHP (Laravel) and Python (Django, FastAPI). Heavy emphasis on query optimization, caching strategies, and clean code.'
      },
      {
        title: 'Payment Infrastructure',
        description: 'Building secure EFT and ACH payment platforms. Integrating compliance standards, tokenized authentication, and handling multi-tenant transactional workflows with transaction integrity.'
      },
      {
        title: 'Cloud & Microservices',
        description: 'Architecting serverless and queue-based microservices on AWS and Azure. Utilizing Azure Functions, Service Bus Queues, Key Vault, and Application Insights for reliable distributed processing.'
      },
      {
        title: 'AI-Enabled Applications',
        description: 'Developing practical AI agents and automation systems using LangGraph, OpenAI APIs, and MongoDB Vector Databases to solve customer workflows with strict latency limits.'
      }
    ]
  },

  metrics: [
    { value: '40%', label: 'Partner Integration Efficiency', desc: 'Accelerated third-party onboarding pipelines through structured API designs.' },
    { value: '33%', label: 'API Latency Reduction', desc: 'Optimized database queries, indexes, and caching strategies for critical endpoints.' },
    { value: '200+', label: 'TPS Throughput', desc: 'Architected high-throughput payment architectures using Redis caching and SQL Server.' },
    { value: '70%+', label: 'Support Queries Automated', desc: 'Implemented retrieval-augmented generation and AI agents for agentless resolution.' },
    { value: '50K+', label: 'Concurrent Students', desc: 'Scaled Learning Management System integrated with Azure AD authentication.' }
  ],

  experience: [
    {
      company: 'Successive Digital',
      location: 'Noida, India',
      roles: [
        {
          title: 'Specialist Engineer',
          period: 'Aug 2023 – Present',
          highlights: [
            'Architected microservices-based payment systems using PHP/Python with Azure Functions, Service Bus, and Key Vault.',
            'Integrated Generative AI into customer service workflows, increasing partner onboarding throughput by 40% and overall client satisfaction by 80%.',
            'Collaborated in AI-driven predictive analytics solutions to identify pipeline failures using historical signals, enabling proactive system monitoring.',
            'Led architecture reviews, mentoring, code reviews, and structured documentation across cross-functional teams.'
          ]
        },
        {
          title: 'Senior Associate Engineer',
          period: 'Jun 2021 – Aug 2023',
          highlights: [
            'Developed and maintained backend modules using PHP and SQL Server for scalable web applications.',
            'Improved application performance by optimizing database queries and refining caching logic.',
            'Built reusable APIs and services, reducing development cycles and improving system consistency across services.'
          ]
        },
        {
          title: 'Associate Engineer',
          period: 'Jan 2021 – Jun 2021',
          highlights: [
            'Developed backend features using PHP and JavaScript, contributing to core features of enterprise applications.',
            'Assisted in debugging, resolving production incidents, and improving system stability under high load.'
          ]
        }
      ]
    },
    {
      company: 'Cyborg Cyber Forensics and Information Security (CCFIS)',
      location: 'Noida, India',
      roles: [
        {
          title: 'Analyst',
          period: 'Feb 2019 – Dec 2020',
          highlights: [
            'Developed Django + DRF-based role-based dashboard applications and secure internal data analysis tools.',
            'Reduced manual intervention in ticket queues and inventory audits by 50%.',
            'Implemented custom Learning Management System (LMS) utilizing Moodle and Azure AD, scaling to support 50K+ students.',
            'Built a Face Recognition-based Attendance Proof of Concept (POC) using Python, OpenCV, and dlib.'
          ]
        }
      ]
    },
    {
      company: 'cppsecrets.com',
      location: 'Noida, India',
      roles: [
        {
          title: 'Python Intern',
          period: 'Dec 2018 – Jan 2019',
          highlights: [
            'Developed Python code snippets and backend logical structures for educational content on the platform.'
          ]
        }
      ]
    }
  ],

  projects: [
    {
      title: 'Payment Processing System',
      context: 'Secure EFT and ACH payment platform processing high-volume transactions.',
      stack: ['PHP', 'Laravel', 'Redis', 'SQL Server', 'Azure AD'],
      whatIBuilt: 'Designed secure transactional REST APIs with Redis caching layers and SQL Server backend. Integrated tokenized Azure AD authentication for enterprise clients.',
      metrics: 'Reduced latency by 40% and achieved a processing throughput of 200+ TPS.',
      architectureNotes: 'Leveraged Redis for transactional idempotency checks and caching of active merchant sessions, reducing load on SQL Server. Utilized connection pooling and query splitting to maintain ACID compliance under high load.'
    },
    {
      title: 'Microservices Based Payment Processing Integration',
      context: 'Re-architecturing and implementing microservices connecting Main platform and third party systems.',
      stack: ['Azure Functions', 'Azure Service Bus', 'Azure Key Vault', 'Application Insights'],
      whatIBuilt: 'Architected a queue-based asynchronous integration using Azure Functions and Service Bus. Safeguarded credentials with Azure Key Vault and added trace telemetry.',
      metrics: 'Reduced operational overhead by 14 hours/week and improved Mean Time to Resolution (MTTR) by 40%.',
      architectureNotes: 'Implemented dead-letter queues on Azure Service Bus to gracefully handle integration failures, trigger alert notifications, and support message replay mechanism once systems recover.'
    },
    {
      title: 'GenAI Based Customer Support System',
      context: 'Intelligent support platform automating ticket resolution and workflows.',
      stack: ['Python', 'OpenAI APIs', 'LangGraph', 'MongoDB Vector DB'],
      whatIBuilt: 'Developed multi-agent retrieval-augmented generation (RAG) graphs using LangGraph. Built a vector-search database using MongoDB for caching semantic query matches.',
      metrics: 'Automated 70%+ of customer support queries and reduced average response time by 10 minutes.',
      architectureNotes: 'Designed agent pathways with state persistence so multi-turn conversations maintain context. Built semantic search checks on input prompts to immediately serve cached historical responses, preserving API tokens.'
    },
    {
      title: 'Inventory Management System',
      context: 'Role-based control panel and reporting dashboard.',
      stack: ['Python', 'Django', 'Django REST Framework', 'MySQL'],
      whatIBuilt: 'Developed a secure role-based dashboard for hardware inventory audits, license tracking, and automated procurement flags.',
      metrics: 'Reduced manual logging effort by 40% and improved inventory reporting accuracy by 80%.',
      architectureNotes: 'Constructed custom middleware to intercept queries and enforce field-level data permissions based on active security clearance levels.'
    },
    {
      title: 'Learning Management System',
      context: 'Enterprise training platform for scaling student education.',
      stack: ['Moodle', 'PHP', 'Azure AD', 'MySQL'],
      whatIBuilt: 'Integrated Moodle core system with enterprise Azure AD authentication, optimizing session caching and asset loading for huge scale.',
      metrics: 'Supported 200K concurrent learners, reduced login/access tickets by 50%, and boosted completion rates by 40%.',
      architectureNotes: 'Optimized high-traffic login routes by offloading session validation to Azure AD token verification on the client, minimizing backend database reads during concurrent usage spikes.'
    },
    {
      title: 'Enterprise AI Analytics — Operational Intelligence',
      context: 'Collaborative machine learning model preventing data pipeline failures before execution.',
      stack: ['Python', 'Scikit-learn', 'SHAP (Explainable AI)', 'PostgreSQL', 'FastAPI'],
      whatIBuilt: 'Co-trained a Predictive model on historical execution patterns (schedules, metadata) for the Project. Integrated a SHAP explainability layer to output diagnostic logs and risk warnings during pipeline creation.',
      metrics: 'Flags 92% of preventable configuration and scheduling failures before first run.',
      architectureNotes: 'Structured FastAPI routes to serve predictions. Built a feature-store pipeline in PostgreSQL to aggregate execution signals. Used SHAP to compile diagnostic logs, converting model coefficients into actionable configuration tips.'
    }
  ],

  skills: [
    {
      category: 'Backend Engineering',
      items: ['PHP (Laravel, Restler)', 'Python (Django, FastAPI, DRF)', 'Node.js (Express)', 'RESTful APIs', 'System Architecture', 'Microservices', 'Event-Driven Systems']
    },
    {
      category: 'Cloud & Infrastructure',
      items: ['AWS (EC2, S3, RDS)', 'Azure Functions', 'Azure Service Bus', 'Azure Key Vault', 'Azure Active Directory', 'Docker', 'Vercel', 'Render', 'Netlify']
    },
    {
      category: 'Databases & Caching',
      items: ['SQL Server', 'MySQL', 'MongoDB', 'Redis Caching', 'Vector Databases', 'Query Optimization', 'Data Modeling']
    },
    {
      category: 'AI & Intelligent Systems',
      items: ['OpenAI APIs', 'LangGraph (Multi-Agent)', 'RAG Pipelines', 'Scikit-learn', 'OpenCV (Computer Vision)', 'Copilot', 'Antigravity', 'Opencode-cli', 'Gemini-cli']
    },
    {
      category: 'Frontend & Integrations',
      items: ['React.js', 'Tailwind CSS', 'JavaScript (ES6+)', 'Power BI Reporting', 'Git / GitHub']
    }
  ],

  credentials: {
    credlyUrl: 'https://www.credly.com/users/amit.bora',
    certifications: [
      { name: 'CTS: AI in Action', issuer: 'Google Cloud (GC)', year: '2026', credentialId: '8cd4cbaa-1e9f-40c1-a8a8-25ebe051e0fb' },
      { name: 'Building AI Apps with MongoDB on AWS', issuer: 'MongoDB + AWS', year: '2025', credentialId: '7f8ed941-f6f8-417e-a618-3b4d0a52f00a' },
      { name: 'AWS Certified Associate Dev', issuer: 'Amazon Web Services (AWS)', year: '2023', credentialId: '977ddeaa-c281-47b5-bc17-ec2866f44132' },
      { name: 'MongoDB Certified Associate Dev', issuer: 'MongoDB', year: '2023', credentialId: '6d471adb-601a-43f3-93c8-83fabb498d9c' },
      { name: 'CAL-E', issuer: 'Scrum Alliance', year: '2023' },
      { name: 'ML with Python', issuer: 'IBM', year: '2023', credentialId: '99301c5c-99e8-4de6-baa3-1ca924e23eaa' }
    ],
    publications: [
      {
        title: 'Meta-BRISQUE: Cost Efficient Image Spoofing Detection for Realtime Face Applications',
        publisher: 'IEEE Conference',
        year: '2020',
        url: 'https://ieeexplore.ieee.org/document/9197918',
        desc: 'Development of cost-efficient Image Spoof Detection algorithm based on BRISQUE feature analysis for secure authentication.'
      },
      {
        title: 'An EMD-Based Approach for Saliency Detection in Multimedia Data',
        publisher: 'IEEE Conference',
        year: '2020',
        url: 'https://ieeexplore.ieee.org/document/9058073',
        desc: 'Research on Earth Mover\'s Distance (EMD) application for visual saliency detection in complex multimedia datasets.'
      },
      {
        title: 'A Review on Video Summarization Approaches: Recent Advances and Directions',
        publisher: 'IEEE Conference',
        year: '2019',
        url: 'https://ieeexplore.ieee.org/document/8748574',
        desc: 'A comparative review paper analyzing video summarization techniques and neural network applications in video processing.'
      }
    ]
  },

  education: [
    {
      degree: 'Master of Technology (M.Tech), Computer Science & Engineering',
      institution: 'Amity University',
      period: '2017 – 2019',
      notes: 'Focused on video summarization, computer vision, and machine learning. Corporate Resource Centre member.'
    },
    {
      degree: 'Bachelor of Technology (B.Tech), Computer Science & Engineering',
      institution: 'Echelon Institute of Technology (MDU)',
      period: '2012 – 2016'
    }
  ]
};
