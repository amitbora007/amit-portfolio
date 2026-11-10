export const portfolioData = {
  personalInfo: {
    name: 'Amit Bora',
    title: 'Fullstack Engineer',
    location: 'New Delhi, India',
    email: 'amitbora007@gmail.com',
    linkedin: 'https://www.linkedin.com/in/amitbora2',
    github: 'https://github.com/amitbora007',
    summary: 'Fullstack Engineer with 7+ years of experience architecting end-to-end web applications, resilient cloud-native microservices, high-throughput payment gateways, and practical GenAI integrations. Experienced in delivering responsive, accessible frontends using React and modern JavaScript/TypeScript while anchoring high-availability backends across AWS and Azure. Passionate about clean architecture, performance tuning, and solving complex product challenges.'
  },

  trustIndicators: [
    { label: 'Experience', value: '7+ Years' },
    { label: 'Fullstack Stack', value: 'React & Microservices' },
    { label: 'Cloud & APIs', value: 'AWS, Azure & Payment APIs' },
    { label: 'AI Integration', value: 'Practical GenAI' }
  ],

  about: {
    narrative: 'I am a senior fullstack engineer specializing in building responsive, product-focused web interfaces backed by resilient payment gateways, distributed microservices, and AI-enabled software systems. My career is defined by transforming complex business requirements into high-throughput, low-latency architectures with intuitive, accessible user experiences. I focus heavily on systems thinking: modular interface design, type-safe API contracts, auditing security protocols, and ensuring rapid Mean Time to Resolution (MTTR).',
    focusPoints: [
      {
        title: 'Fullstack Web Applications',
        description: 'Crafting responsive, accessible user interfaces using React.js, Tailwind CSS, Bootstrap, MUI, and JavaScript/TypeScript with clean state management and type-safe API bindings.'
      },
      {
        title: 'Scalable Backend & APIs',
        description: 'Designing modular, high-throughput REST and GraphQL APIs using Python (FastAPI, Django) and PHP (Laravel). Heavy emphasis on query optimization, caching strategies, and clean code.'
      },
      {
        title: 'Payment Infrastructure',
        description: 'Building secure EFT and ACH payment platforms. Integrating compliance standards, tokenized authentication, and handling multi-tenant transactional workflows with transaction integrity.'
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
    { value: '100+', label: 'TPS Throughput', desc: 'Architected high-throughput payment architectures using Redis caching and SQL Server.' },
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
          period: 'Aug 2023 - Present',
          highlights: [
            'Architected microservices-based payment systems using PHP/Python with Azure Functions, Service Bus, and Key Vault.',
            'Integrated Generative AI into customer service workflows, increasing partner onboarding throughput by 40% and overall client satisfaction by 80%.',
            'Collaborated in AI-driven predictive analytics solutions with interactive diagnostic dashboards to identify pipeline failures, enabling proactive system monitoring.',
            'Led architecture reviews, mentoring, code reviews, and structured documentation across cross-functional engineering pods.'
          ]
        },
        {
          title: 'Senior Associate Engineer',
          period: 'Jun 2021 - Aug 2023',
          highlights: [
            'Delivered core fullstack modules, reusable RESTful endpoints, and database schemas with Redis caching for scalable web platforms.',
            'Improved application performance by optimizing SQL queries, indexes, and front-to-back latency on high-traffic endpoints.',
            'Built reusable APIs and merchant integration interfaces, reducing onboarding cycles and ensuring transactional integrity.'
          ]
        },
        {
          title: 'Associate Engineer',
          period: 'Jan 2021 - Jun 2021',
          highlights: [
            'Built end-to-end features using PHP, JavaScript, and MySQL, implementing UI components and backend business logic for enterprise applications.',
            'Assisted in debugging, resolving production incidents, writing automated tests, and improving system stability under high load.'
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
          period: 'Feb 2019 - Dec 2020',
          highlights: [
            'Developed fullstack role-based dashboards (Django, DRF, Bootstrap) and secure internal data analysis tools, reducing manual intervention by 50%.',
            'Implemented custom Learning Management System (LMS) utilizing Moodle and Azure AD, scaling to support 50K+ concurrent learners with optimized asset delivery.',
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
          period: 'Dec 2018 - Jan 2019',
          highlights: [
            'Developed Python code snippets and backend logical structures for educational content on the platform.'
          ]
        }
      ]
    }
  ],

  projects: [
    {
      title: 'Enterprise AI Analytics — Operational Intelligence',
      context: 'Fullstack machine learning system predicting and preventing data pipeline failures before execution.',
      stack: ['FastAPI', 'Python', 'React.js', 'Scikit-learn', 'SHAP (Explainable AI)', 'PostgreSQL', 'Docker'],
      whatIBuilt: 'Built an end-to-end predictive diagnostic application featuring a reactive operator dashboard and ML inference service. Co-trained a model on historical pipeline runs and integrated SHAP explainability to display real-time configuration tips and risk warnings.',
      metrics: 'Flags 92% of preventable configuration and scheduling failures before first run.',
      architectureNotes: 'Structured FastAPI routes to serve predictions. Built a feature-store pipeline in PostgreSQL to aggregate execution signals. Used SHAP to compile diagnostic logs, converting model coefficients into actionable configuration tips.'
    },
    {
      title: 'Payment Processing System',
      context: 'Secure EFT and ACH payment platform processing high-volume transactions with merchant admin interfaces.',
      stack: ['PHP', 'Laravel', 'React.js', 'Redis', 'SQL Server', 'Azure AD'],
      whatIBuilt: 'Designed secure transactional REST APIs paired with merchant management interfaces. Engineered secure EFT/ACH transaction pipelines with Redis caching layers, idempotency verification, and tokenized Azure AD authentication.',
      metrics: 'Reduced latency by 40% and achieved a processing throughput of 200+ TPS.',
      architectureNotes: 'Leveraged Redis for transactional idempotency checks and caching of active merchant sessions, reducing load on SQL Server. Utilized connection pooling and query splitting to maintain ACID compliance under high load.'
    },
    {
      title: 'Microservices Based Payment Processing Integration',
      context: 'Re-architecturing and implementing microservices connecting main platform, web portals, and third-party systems.',
      stack: ['Azure Functions', 'Azure Service Bus', 'Azure Key Vault', 'Application Insights', 'REST APIs'],
      whatIBuilt: 'Architected a queue-based asynchronous integration using Azure Functions and Service Bus. Safeguarded credentials with Azure Key Vault, implemented dead-letter re-routing, and added trace telemetry.',
      metrics: 'Reduced operational overhead by 14 hours/week and improved Mean Time to Resolution (MTTR) by 40%.',
      architectureNotes: 'Implemented dead-letter queues on Azure Service Bus to gracefully handle integration failures, trigger alert notifications, and support message replay mechanism once systems recover.'
    },
    {
      title: 'GenAI Based Customer Support System',
      context: 'Intelligent fullstack support platform automating ticket resolution with interactive agent interface.',
      stack: ['Python', 'OpenAI APIs', 'LangGraph', 'React.js', 'MongoDB Vector DB'],
      whatIBuilt: 'Developed multi-agent retrieval-augmented generation (RAG) graphs with a real-time conversational chat frontend. Built a vector-search database using MongoDB for caching semantic query matches to preserve API tokens.',
      metrics: 'Automated 70%+ of customer support queries and reduced average response time by 10 minutes.',
      architectureNotes: 'Designed agent pathways with state persistence so multi-turn conversations maintain context. Built semantic search checks on input prompts to immediately serve cached historical responses, preserving API tokens.'
    },
    {
      title: 'Inventory Management System',
      context: 'Role-based fullstack control panel and reporting dashboard.',
      stack: ['Python', 'Django', 'Django REST Framework', 'Bootstrap / UI', 'MySQL'],
      whatIBuilt: 'Developed a secure role-based dashboard for hardware inventory audits, license tracking, and automated procurement flags with dynamic data tables and export workflows.',
      metrics: 'Reduced manual logging effort by 40% and improved inventory reporting accuracy by 80%.',
      architectureNotes: 'Constructed custom middleware to intercept queries and enforce field-level data permissions based on active security clearance levels.'
    },
    {
      title: 'Learning Management System',
      context: 'Enterprise training platform for scaling student education with responsive web interface.',
      stack: ['Moodle', 'PHP', 'JavaScript', 'Azure AD', 'MySQL'],
      whatIBuilt: 'Integrated Moodle core system with enterprise Azure AD authentication, optimizing frontend asset delivery, session caching, and asset loading for massive concurrent scale.',
      metrics: 'Supported 200K concurrent learners, reduced login/access tickets by 50%, and boosted completion rates by 40%.',
      architectureNotes: 'Optimized high-traffic login routes by offloading session validation to Azure AD token verification on the client, minimizing backend database reads during concurrent usage spikes.'
    }
  ],

  skills: [
    {
      category: 'Frontend Engineering',
      items: ['React.js', 'JavaScript (ES6+)', 'TypeScript', 'Tailwind CSS', 'Bootstrap', 'MUI (Material-UI)', 'State Management', 'Responsive UI/UX', 'REST & GraphQL Integration']
    },
    {
      category: 'Backend & APIs',
      items: ['FastAPI', 'Python (Django, DRF)', 'PHP (Laravel, Restler)', 'Node.js (Express)', 'RESTful API Design', 'GraphQL APIs', 'Microservices', 'Event-Driven Systems']
    },
    {
      category: 'Cloud & Infrastructure',
      items: ['AWS (EC2, S3, RDS, Lambda)', 'Azure Functions', 'Azure Service Bus', 'Azure Key Vault', 'Azure Active Directory', 'Docker', 'CI/CD Pipelines', 'GCP', 'Vercel']
    },
    {
      category: 'Databases & Caching',
      items: ['PostgreSQL', 'SQL Server', 'MySQL', 'MongoDB', 'Redis Caching & Idempotency', 'Vector Databases', 'Query Optimization', 'Data Modeling']
    },
    {
      category: 'AI & Intelligent Systems',
      items: ['OpenAI APIs', 'LangGraph (Multi-Agent)', 'RAG Pipelines', 'Scikit-learn', 'OpenCV (Computer Vision)', 'SHAP (Explainable AI)', 'Copilot', 'Antigravity']
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
      period: '2017 - 2019',
      notes: 'Focused on video summarization, computer vision, and machine learning. Corporate Resource Centre member.'
    },
    {
      degree: 'Bachelor of Technology (B.Tech), Computer Science & Engineering',
      institution: 'Echelon Institute of Technology (MDU)',
      period: '2012 - 2016'
    }
  ],

  achievements: [
    {
      title: 'Quarterly Star Performer Award',
      organization: 'Successive Digital',
      date: 'Q3 2024',
      image: '/achievements/quarterly_starperformer.jpeg',
      description: 'Awarded for outstanding technical excellence, high ownership, and critical backend system delivery under challenging deadlines.'
    },
    {
      title: 'Outstanding Performance Award',
      organization: 'Successive Digital',
      date: 'Q2 2024',
      image: '/achievements/award.jpeg',
      description: 'Recognized for excellent engineering contributions, optimization of core database schemas, and mentoring peers.'
    },
    {
      title: 'Special Recognition Award',
      organization: 'Successive Digital',
      date: 'Q4 2023',
      image: '/achievements/award2.jpeg',
      description: 'Honored for building innovative AI automated support workflows and robust microservice telemetry monitoring pipelines.'
    }
  ],

  recommendations: [
    {
      name: 'Prawal Sharma',
      title: 'Technology Manager',
      company: 'Successive Digital',
      relationship: 'Manager & Mentor at Successive Digital',
      image: '/recommendation/ps.png',
      description: 'I have had the pleasure of working with Amit Bora for the past five years, during which he has consistently demonstrated exceptional technical expertise, ownership, and professionalism.\n\nAmit is a highly dependable Senior Engineer who can always be trusted to take responsibility for critical deliverables and see them through to completion. He possesses strong problem-solving skills, a deep understanding of complex systems, and the ability to quickly navigate challenging technical situations with a calm and methodical approach.\n\nWhat sets Amit apart is his commitment to quality and accountability. He takes ownership of his work, proactively identifies risks, and consistently delivers reliable solutions even under tight timelines. Beyond his technical capabilities, he is a collaborative team player who willingly supports colleagues, shares knowledge, and contributes positively to the team\'s success.\n\nOver the years, Amit has been an invaluable member of our engineering team, and I would highly recommend him to any organization looking for a skilled, responsible, and trustworthy engineering professional.'
    },
    {
      name: 'Himanshu Gupta',
      title: 'Security & Compliance Specialist',
      company: 'Deutsche Telekom Digital Labs',
      relationship: 'Colleague at Cyborg Cyber Forensic',
      image: '/recommendation/hgupta.png',
      description: 'I worked alongside Amit during our time at Cyborg Cyber Forensic. We sat on different teams, but our work intersected often enough for me to see how he operates — methodical, detail-oriented, and genuinely curious about the problem rather than just closing the ticket.\n\nWhat stood out most was how easy he made collaboration across team boundaries. He explained his side of the problem clearly to people who didn’t live in it every day, and he was quick to flag risks rather than let them surface later. That kind of transparency saves everyone a lot of time.'
    },
    {
      name: 'Himanshu Gola',
      title: 'Associate Engineer',
      company: 'Successive Digital',
      relationship: 'Reported to Amit directly at Successive Digital',
      image: '/recommendation/hg.png',
      description: "I had the opportunity to work under Amit's guidance, and I truly appreciate his leadership and support throughout my time on the project. Amit is a great manager who provides clear direction, encourages ownership, and creates a positive and collaborative work environment. His ability to manage technical and project-related challenges while supporting the team is commendable. I have learned a lot from his guidance and appreciate the trust and opportunities he provided me. It has been a great experience working with Amit, and I would highly recommend him as an exceptional leader and manager."
    }
  ]
};
