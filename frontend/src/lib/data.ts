export const PROJECTS = [
  {
    id: 'kemirix',
    title: 'Kemirix Health Technologies',
    category: 'Clinical AI Platform',
    problem:
      'Healthcare professionals lack real-time, AI-powered support for identifying drug interactions, pharmacogenomic risks, and contraindications before patient harm occurs.',
    solution:
      'Clinical medication safety platform supporting drug interaction analysis, pharmacogenomics, contraindication screening, and medication risk assessment — designed to support safer prescribing decisions at the point of care.',
    impact:
      'Building production infrastructure for clinical AI decision support that addresses a critical gap in medication safety tooling for healthcare professionals.',
    technologies: [
      'Python', 'FastAPI', 'LangGraph', 'LangChain',
      'PostgreSQL', 'Redis', 'Vertex AI', 'Google Cloud',
    ],
    status: 'In Development',
    statusColor: 'blue' as const,
    featured: true,
    link: null,
    github: null,
  },
  {
    id: 'drugd',
    title: 'DrugD Clinical AI',
    category: 'Clinical AI Assistant',
    problem:
      'Healthcare professionals and students need a reliable, evidence-grounded AI assistant for medication guidance that goes beyond generic LLM responses.',
    solution:
      'Clinical AI assistant focused on medication guidance, drug interaction analysis, herb-drug interactions, and medication safety — powered by retrieval-augmented generation over curated clinical sources.',
    impact:
      'Provides evidence-linked medication safety guidance with transparent sourcing, supporting safer clinical decision-making.',
    technologies: [
      'Python', 'LangChain', 'LangGraph', 'RAG',
      'Docker', 'FastAPI',
    ],
    status: 'In Development',
    statusColor: 'blue' as const,
    featured: true,
    link: null,
    github: null,
  },
  {
    id: 'llm-finetuning',
    title: 'Clinical LLM Fine-Tuning Infrastructure',
    category: 'MLOps / AI Infrastructure',
    problem:
      'Fine-tuning large language models on clinical data requires specialized infrastructure and expertise that most healthcare AI teams lack.',
    solution:
      'Production-ready pipeline for healthcare language model training using Google Cloud TPU systems, enabling efficient fine-tuning of clinical LLMs with PEFT techniques including LoRA and FSDPv2.',
    impact:
      'Reduces the infrastructure barrier for healthcare AI research teams attempting to fine-tune domain-specific clinical language models at scale.',
    technologies: [
      'PyTorch', 'PyTorch/XLA', 'JAX', 'XPK',
      'PEFT', 'LoRA', 'FSDPv2', 'SPMD', 'Google Cloud TPU',
    ],
    status: 'Active',
    statusColor: 'green' as const,
    featured: true,
    link: null,
    github: null,
  },
  {
    id: 'afripharma-adr',
    title: 'AfriPharma ADR Watch',
    category: 'Pharmacovigilance Dataset',
    problem:
      'Drug safety surveillance datasets for African populations are severely underrepresented in global pharmacovigilance databases, limiting the ability to identify adverse drug reactions in these populations.',
    solution:
      'Open pharmacovigilance dataset focused on adverse drug reactions across Africa, designed for use in drug safety research, healthcare AI training, and clinical pharmacology studies.',
    impact:
      'Published dataset supporting pharmacovigilance research and healthcare AI development for underrepresented African patient populations.',
    technologies: ['Python', 'Pandas', 'Data Curation', 'MedDRA', 'ICH E2B'],
    status: 'Published',
    statusColor: 'green' as const,
    featured: true,
    link: 'https://huggingface.co/datasets/PLACEHOLDER',
    github: null,
  },
  {
    id: 'kemirix-ddi',
    title: 'Kemirix DDI Database',
    category: 'Drug Interaction Dataset',
    problem:
      'Training clinical AI systems on drug-drug interactions requires structured, high-quality datasets that are difficult to compile from fragmented sources.',
    solution:
      'Curated clinical drug interaction database designed for use in medication safety AI development, clinical decision support training, and healthcare machine learning research.',
    impact:
      'Provides a structured foundation for drug-drug interaction AI systems and medication safety research.',
    technologies: ['Python', 'PostgreSQL', 'Data Engineering', 'Clinical Pharmacology'],
    status: 'Published',
    statusColor: 'green' as const,
    featured: false,
    link: 'https://huggingface.co/datasets/PLACEHOLDER',
    github: null,
  },
  {
    id: 'ai-healthcare-learning',
    title: 'AI-Powered Healthcare Learning Platform',
    category: 'Education Technology',
    problem:
      'Healthcare and science students lack access to adaptive, AI-assisted learning tools that can personalize instruction to their individual knowledge gaps.',
    solution:
      'Educational platform built to improve healthcare and science learning through AI-assisted instruction, adaptive feedback, and clinical case-based learning.',
    impact:
      'Deployed to support science and healthcare education for students across multiple learning contexts.',
    technologies: ['Next.js', 'FastAPI', 'Python', 'PostgreSQL', 'AI/ML'],
    status: 'In Development',
    statusColor: 'blue' as const,
    featured: false,
    link: null,
    github: null,
  },
  {
    id: 'lysi4',
    title: 'LYSI 4 Solutions',
    category: 'Education Management Platform',
    problem:
      'Schools and educational institutions lack integrated platforms that combine AI-powered learning support with administrative management.',
    solution:
      'AI-powered education and school management platform combining learning management, administration, and AI-assisted instruction in a unified system.',
    impact:
      'Serving educational institutions with integrated school management and AI-powered learning tools.',
    technologies: ['Next.js', 'FastAPI', 'PostgreSQL', 'Python', 'AI/ML'],
    status: 'In Development',
    statusColor: 'blue' as const,
    featured: false,
    link: null,
    github: null,
  },
]

export const EXPERIENCE = [
  {
    role: 'Co-Founder',
    company: 'Kemirix Health Technologies',
    period: '2025 – Present',
    type: 'Startup',
    contributions: [
      'Designed clinical AI architecture for medication safety platform',
      'Developed medication safety workflows for drug interaction and contraindication screening',
      'Built healthcare AI pipelines using LangGraph, LangChain, and Vertex AI',
      'Led model training infrastructure on Google Cloud TPU systems',
      'Created clinical reasoning datasets for LLM fine-tuning',
      'Managed healthcare software planning and technical roadmap',
    ],
  },
  {
    role: 'Founder',
    company: 'LYSI 4 Solutions',
    period: '2025 – Present',
    type: 'Startup',
    contributions: [
      'Building AI-powered educational technology systems',
      'Developing integrated learning and school administration platforms',
      'Designing adaptive learning experiences for science and healthcare students',
    ],
  },
  {
    role: 'Founder & Instructor',
    company: 'TechFryz',
    period: '2023 – 2025',
    type: 'Education',
    contributions: [
      'Delivered AI, ML, Data Science, and Python education programs',
      'Trained 30+ students and early-career learners in technical skills',
      'Designed curriculum for beginners entering the data science and AI field',
    ],
  },
  {
    role: 'Independent Researcher',
    company: 'Self-Directed Research',
    period: '2024 – Present',
    type: 'Research',
    contributions: [
      'Healthcare AI and clinical AI systems research',
      'Pharmacovigilance dataset creation and curation',
      'Clinical datasets for LLM training and evaluation',
      'Medication safety research and drug interaction intelligence',
    ],
  },
]

export const SKILLS = {
  'AI & Machine Learning': [
    'Python', 'PyTorch', 'PyTorch/XLA', 'JAX',
    'Hugging Face', 'Transformers', 'PEFT', 'LoRA',
    'LangChain', 'LangGraph', 'RAG', 'Agentic AI',
    'Prompt Engineering', 'Model Evaluation', 'LLM Fine-Tuning',
  ],
  'Accelerated Computing': [
    'NVIDIA GPUs', 'CUDA', 'TPU v5e', 'TPU Infrastructure',
    'SPMD', 'FSDPv2', 'XPK', 'Distributed Training',
  ],
  'Data Science': [
    'Pandas', 'NumPy', 'Scikit-Learn', 'Data Visualization',
    'Statistical Analysis', 'Feature Engineering', 'Experiment Design',
  ],
  'MLOps & Infrastructure': [
    'Docker', 'Kubernetes', 'FastAPI', 'PostgreSQL',
    'Redis', 'CI/CD', 'Monitoring', 'Production AI Systems',
  ],
  Cloud: [
    'Google Cloud Platform', 'Vertex AI', 'Cloud Storage',
    'Cloud Run', 'AWS', 'Azure', 'Railway', 'RunPod', 'Vercel',
  ],
  'Clinical & Pharmaceutical Sciences': [
    'Clinical Pharmacology', 'Pharmacogenomics', 'Clinical Pharmacy',
    'Medication Safety', 'Drug Interactions', 'Pharmacovigilance',
    'MedDRA', 'ICH E2B', 'Medicinal Chemistry', 'Organic Chemistry',
    'Pathophysiology', 'Rational Use of Medicines',
  ],
}

export const PUBLIC_PROFILES = [
  {
    name: 'LinkedIn',
    description: 'Professional profile, research updates, and healthcare AI insights.',
    url: 'https://linkedin.com/in/PLACEHOLDER',
    icon: 'linkedin',
    color: '#0A66C2',
  },
  {
    name: 'GitHub',
    description: 'Source code, engineering projects, and open-source contributions.',
    url: 'https://github.com/PLACEHOLDER',
    icon: 'github',
    color: '#333333',
  },
  {
    name: 'Hugging Face',
    description: 'Healthcare AI models, pharmacovigilance datasets, and clinical AI projects.',
    url: 'https://huggingface.co/PLACEHOLDER',
    icon: 'huggingface',
    color: '#FFD21E',
  },
  {
    name: 'Kaggle',
    description: 'Data science competitions, notebooks, and healthcare datasets.',
    url: 'https://kaggle.com/PLACEHOLDER',
    icon: 'kaggle',
    color: '#20BEFF',
  },
  {
    name: 'ORCID',
    description: 'Research identity and verified scholarly contributions.',
    url: 'https://orcid.org/PLACEHOLDER',
    icon: 'orcid',
    color: '#A6CE39',
  },
  {
    name: 'ResearchGate',
    description: 'Research publications, datasets, and academic collaborations.',
    url: 'https://researchgate.net/profile/PLACEHOLDER',
    icon: 'researchgate',
    color: '#00CCBB',
  },
  {
    name: 'Academia.edu',
    description: 'Academic papers and clinical AI research outputs.',
    url: 'https://independent.academia.edu/PLACEHOLDER',
    icon: 'academia',
    color: '#41454A',
  },
  {
    name: 'Devpost',
    description: 'Hackathon projects and healthcare innovation builds.',
    url: 'https://devpost.com/PLACEHOLDER',
    icon: 'devpost',
    color: '#003E54',
  },
  {
    name: 'GitLab',
    description: 'Additional repositories and CI/CD pipeline configurations.',
    url: 'https://gitlab.com/PLACEHOLDER',
    icon: 'gitlab',
    color: '#FC6D26',
  },
  {
    name: 'YouTube',
    description: 'Educational content, tutorials, and healthcare AI explanations.',
    url: 'https://youtube.com/@PLACEHOLDER',
    icon: 'youtube',
    color: '#FF0000',
  },
]

export const HIGHLIGHTS = [
  { text: 'Co-Founder, Kemirix Health Technologies', icon: 'building' },
  { text: 'Published AfriPharma ADR Watch — open pharmacovigilance dataset', icon: 'database' },
  { text: 'Published Kemirix DDI Database — drug interaction intelligence dataset', icon: 'database' },
  { text: 'Healthcare LLM fine-tuning on Google Cloud TPU infrastructure', icon: 'cpu' },
  { text: 'Credentialed PhysioNet Researcher', icon: 'shield' },
  { text: 'DrugBank Academic License Holder', icon: 'shield' },
  { text: 'CITI Human Research Ethics Certified', icon: 'award' },
  { text: 'Built and deployed public AI applications', icon: 'rocket' },
  { text: 'Trained 80+ students in science, AI, and programming', icon: 'users' },
  { text: 'Founder of LYSI 4 Solutions educational technology platform', icon: 'graduation' },
]