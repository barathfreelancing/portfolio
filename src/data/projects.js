// Order is intentional. Case-study copy describes what was built; it makes no claims about clients or results.
export const featuredProjects = [
  {
    slug: 'studds',
    title: 'STUDDS',
    subtitle: 'Cinematic Helmet Product Experience',
    category: 'Product showcase',
    description:
      'A premium helmet showcase that puts the product first, pairing cinematic presentation with immersive, motion-driven interactions.',
    problem:
      'A technical product like a performance helmet is hard to sell through a catalogue grid. The page has to explain construction and safety detail while still feeling premium.',
    role: 'Design and front-end development',
    approach:
      'Let the product lead. A dark, restrained interface keeps attention on the helmet, and the page is split into numbered chapters so each technical detail gets its own moment.',
    implementation:
      'Built with React and Vite. GSAP ScrollTrigger times each reveal to the reader’s scroll position, Lenis handles smooth scrolling, and a numbered rail shows progress through the chapters.',
    outcome:
      'A deployed product page with chaptered storytelling, scroll-linked animation and a public repository.',
    tech: ['React', 'Vite', 'JavaScript', 'GSAP', 'ScrollTrigger', 'Lenis'],
    image: '/studds-website.webp',
    imageSmall: '/studds-website-800.webp',
    imageAlt: 'STUDDS motorcycle helmet website',
    sourceUrl: 'https://github.com/barathfreelancing/studds-website-',
    liveUrl: 'https://studds-website.vercel.app/',
  },
  {
    slug: 'mano-residences',
    title: 'MANO Residences',
    subtitle: 'Real Estate Showcase Website',
    category: 'Real estate landing page',
    description:
      'A premium landing page for a luxury residential project in Chennai, where refined design and architectural imagery guide visitors from first impression to an enquiry.',
    problem:
      'Luxury property is bought on trust and atmosphere. The site needs to convey quality at first glance and move interested visitors toward an enquiry.',
    role: 'Design and front-end development',
    approach:
      'Large architectural imagery and calm, spacious typography set the tone. The page moves from the project to residences, amenities and location, with an enquiry action kept in view.',
    implementation:
      'A single-page React and Vite build with GSAP-driven entrances, an Enquire button in the navigation, and sections structured around the buyer’s questions.',
    outcome:
      'A deployed landing page with a clear path from first impression to enquiry, and a public repository.',
    tech: ['React', 'Vite', 'JavaScript', 'GSAP'],
    image: '/mano-residences.webp',
    imageSmall: '/mano-residences-800.webp',
    imageAlt: 'MANO Residences real estate website hero',
    sourceUrl: 'https://github.com/barathfreelancing/real-estate-web-sample',
    liveUrl: 'https://real-estate-web-sample.vercel.app/',
  },
  {
    slug: 'bmw-e30-m3',
    title: 'BMW E30 M3',
    subtitle: 'Scroll-driven 3D Car Story',
    category: 'Interactive 3D experience',
    description:
      'An interactive 3D experience of the BMW E30 M3, where scroll-driven storytelling moves the car through six chapters of its racing heritage.',
    problem:
      'Heritage stories are usually told with static photos and long text. The goal was to make the car itself the narrator and keep visitors scrolling through its history.',
    role: 'Design and front-end development',
    approach:
      'Split the story into six chapters and tie the 3D car’s position and camera to scroll, so moving down the page moves the car through its racing history.',
    implementation:
      'React and Vite with a Three.js scene. GSAP ScrollTrigger maps scroll progress to the car and camera, and Lenis smooths the scroll input.',
    outcome:
      'A deployed, scroll-driven 3D experience with six chapters and a public repository.',
    tech: ['React', 'Vite', 'Three.js', 'GSAP', 'ScrollTrigger', 'Lenis'],
    image: '/bmw-e30-m3.webp',
    imageSmall: '/bmw-e30-m3-800.webp',
    imageAlt: 'BMW E30 M3 website hero with 3D red car',
    sourceUrl: 'https://github.com/barathfreelancing/3D-BMW-E30',
    liveUrl: 'https://bmwm30.vercel.app/',
  },
  {
    slug: 'hong-zao',
    title: 'Hong Zao',
    subtitle: 'Modern Chinese Restaurant Website',
    category: 'Restaurant website',
    description:
      'A restaurant website for a modern Chinese kitchen in Soho, London, pairing warm editorial design and food photography with a signature-dishes menu, dining spaces, guest reviews and a table reservation form with built-in validation.',
    problem:
      'A restaurant site has two jobs: make the food tempting and make booking a table quick. Many do the first and bury the second.',
    role: 'Design and front-end development',
    approach:
      'Warm, editorial pages built around food photography and the kitchen’s story, with “Reserve a table” always one click away in the header.',
    implementation:
      'React and Vite with hand-written CSS. Sections for the story, signature dishes, menu, dining spaces and reviews, plus a reservation form with client-side validation.',
    outcome:
      'A deployed restaurant site with a working, validated reservation form and a public repository.',
    tech: ['React', 'Vite', 'JavaScript', 'CSS'],
    image: '/hong-zao.webp',
    imageSmall: '/hong-zao-800.webp',
    imageAlt: 'Hong Zao restaurant website showing a Grandmother’s stove story section with steamed dumplings',
    sourceUrl: 'https://github.com/barathfreelancing/chinese-restaurant-website',
    liveUrl: 'https://hong-zao.vercel.app/',
  },
  {
    slug: 'drishti-opticians',
    title: 'Drishti Opticians',
    subtitle: 'Eyewear Store Website',
    category: 'Retail storefront',
    description:
      'An eyewear storefront for a Kannur optician serving customers since 1977, combining editorial heritage storytelling with a filterable frame collection, quick view, a saved-frames bag and an in-store appointment form.',
    problem:
      'An established local shop wants customers to browse frames online without losing the personal, in-store service it is known for.',
    role: 'Design and front-end development',
    approach:
      'Pair the shop’s heritage story with practical shopping tools: browse and shortlist frames online, then book an appointment to try them in the store.',
    implementation:
      'React, Vite and TypeScript with Motion for transitions. A filterable collection, quick-view panels, a saved-frames bag and an appointment form.',
    outcome:
      'A deployed storefront with filtering, quick view, saved frames and appointment booking, and a public repository.',
    tech: ['React', 'Vite', 'TypeScript', 'Motion'],
    image: '/drishti-optics.webp',
    imageSmall: '/drishti-optics-800.webp',
    imageAlt: 'Drishti Opticians website showing the Our story section beside an engraving of a spectacle seller’s stall',
    sourceUrl: 'https://github.com/barathfreelancing/drishti-optics',
    liveUrl: 'https://drishti-optics.vercel.app/',
  },
];

// Earlier Python and machine-learning work, linked to its repositories. Descriptions are kept to what each repo does.
export const pythonProjects = [
  {
    title: 'Sentiment analysis',
    summary: 'Classifies product reviews as positive, negative or neutral, with a Streamlit app for live predictions.',
    tech: ['Python', 'SVM', 'TF-IDF', 'Streamlit'],
    sourceUrl: 'https://github.com/barath220904/Sentiment-analysis',
  },
  {
    title: 'House price prediction',
    summary: 'Predicts house prices in rupees from area, bedrooms and bathrooms, served through a Streamlit app.',
    tech: ['Python', 'XGBoost', 'Streamlit'],
    sourceUrl: 'https://github.com/barath220904/House-Price-Prediction',
  },
  {
    title: 'Virtual mouse',
    summary: 'Hands-free cursor control from a webcam feed.',
    tech: ['Python', 'OpenCV'],
    sourceUrl: 'https://github.com/barath220904/Virtual-Mouse',
  },
  {
    title: 'Chatbot',
    summary: 'An NLP chatbot that answers user queries, built with machine learning in Python.',
    tech: ['Python', 'NLP', 'Jupyter'],
    sourceUrl: 'https://github.com/barath220904/chatbot',
  },
  {
    title: 'Image format converter',
    summary: 'A desktop app that converts, resizes and batch-processes JPG, PNG, BMP and GIF images.',
    tech: ['Python', 'Tkinter', 'Pillow'],
    sourceUrl: 'https://github.com/barath220904/Image-format-Converter',
  },
];
