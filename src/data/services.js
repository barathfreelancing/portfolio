// What a client can hire for. `examples` describe typical scope, not past results.
export const services = [
  {
    key: 'BUILD',
    title: 'Build',
    value:
      'Websites and full-stack applications that give your business a working product on the internet, not just a design file.',
    examples: ['Marketing and product websites', 'Booking and enquiry flows', 'Web apps with accounts and dashboards'],
    tech: ['React', 'Vite', 'JavaScript', 'HTML', 'CSS'],
  },
  {
    key: 'CONNECT',
    title: 'Connect',
    value:
      'APIs, authentication, and databases that let your application talk to the tools you already use, and the ones you need next.',
    examples: ['REST APIs for web and mobile apps', 'Login and access control', 'Integrations with third-party services'],
    tech: ['FastAPI', 'Flask', 'REST APIs', 'JWT', 'SQLAlchemy', 'Pydantic'],
  },
  {
    key: 'AUTOMATE',
    title: 'Automate',
    value:
      'AI chatbots, retrieval-augmented systems, and workflow automation that take repetitive work off your team’s plate.',
    examples: ['Chatbots that answer from your own documents', 'Automated hand-offs between your tools', 'AI features inside an existing app'],
    tech: ['AI Chatbots', 'RAG', 'LangGraph', 'AI APIs', 'n8n', 'Python'],
  },
  {
    key: 'DATA',
    title: 'Data',
    value:
      'Data pipelines and backend workflows that turn spreadsheets and CSVs into structured, reliable systems.',
    examples: ['Spreadsheet and CSV imports into a database', 'Cleaning and reshaping messy data', 'Scheduled reports with Pandas'],
    tech: ['Pandas', 'CSV Automation', 'PostgreSQL', 'MySQL', 'MongoDB', 'SQL'],
  },
];
