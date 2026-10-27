// `inquiryType` must match one of PROJECT_TYPES in sections/Contact.jsx; it preselects the form.
// `related` lists project slugs from projects.js that demonstrate the service.
export const services = [
  {
    key: 'websites',
    title: 'Business websites',
    problem:
      'Your business needs a site that looks credible, explains what you offer and makes it easy for customers to get in touch.',
    deliver:
      'A fast, custom-designed website built around your content and the one action you want visitors to take.',
    deliverables: ['Custom design and build', 'Enquiry, booking or contact forms', 'Deployment to your domain', 'Source code handover'],
    tech: ['React', 'Vite', 'JavaScript', 'HTML', 'CSS'],
    related: ['mano-residences', 'hong-zao', 'drishti-opticians'],
    inquiryType: 'Website',
    cta: 'Discuss a website',
  },
  {
    key: 'landing',
    title: 'Landing pages & showcases',
    problem:
      'A launch or a premium product gets one chance to hold attention. The page has to earn it and lead to one clear action.',
    deliver:
      'A focused landing page with purposeful scroll-driven motion or 3D, built to stay smooth and readable.',
    deliverables: ['Page structure and copy flow', 'Scroll animation with GSAP', '3D scenes with Three.js', 'Reduced-motion support'],
    tech: ['React', 'GSAP', 'ScrollTrigger', 'Three.js'],
    related: ['studds', 'bmw-e30-m3'],
    inquiryType: 'Landing page',
    cta: 'Discuss a landing page',
  },
  {
    key: 'apps',
    title: 'Web apps, APIs & MVPs',
    problem:
      'You have an idea or an internal process that needs a working product, with a frontend people can use and a backend that holds up.',
    deliver:
      'A React frontend and a Python API with authentication and a database, scoped to what you need first.',
    deliverables: ['React frontend', 'FastAPI or Flask REST API', 'Auth with JWT and a SQL database', 'Deployment and setup notes'],
    tech: ['FastAPI', 'Flask', 'SQLAlchemy', 'Pydantic', 'PostgreSQL'],
    related: [],
    inquiryType: 'Full-stack application',
    cta: 'Discuss an app',
  },
  {
    key: 'ai',
    title: 'AI features & automation',
    problem:
      'Your team loses hours to repetitive work, or your customers keep asking questions your documents already answer.',
    deliver:
      'AI chatbots, retrieval over your own documents, and workflow or data automations that take routine work off your plate.',
    deliverables: ['AI chatbot or assistant', 'RAG over your documents', 'n8n or Python workflows', 'CSV and data pipelines'],
    tech: ['Python', 'RAG', 'LangGraph', 'AI APIs', 'n8n', 'Pandas'],
    related: [],
    inquiryType: 'AI / automation',
    cta: 'Discuss an AI project',
  },
];
