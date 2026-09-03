const projects = [
  {
    id: "rag-assistant",
    number: "01",
    title: "RAG AI Research Assistant",
    description:
      "An AI-powered document research assistant built around retrieval-augmented generation. It embeds documents, runs vector search, and uses an LLM to generate grounded answers instead of relying on memorized knowledge alone.",
    technologies: ["Python", "Gemini API", "Sentence Transformers", "ChromaDB", "Streamlit"],
    image: "/images/projects/rag-assistant.png",
    githubUrl: "https://github.com/barath220904",
    liveUrl: null,
  },
  {
    id: "virtual-mouse",
    number: "02",
    title: "Hands-Free Virtual Mouse",
    description:
      "A real-time computer vision application that maps hand gestures to mouse control. Handles varying lighting conditions, camera angles, and hand positions to keep tracking reliable outside a lab setting.",
    technologies: ["Python", "OpenCV", "PyAutoGUI"],
    image: "/images/projects/virtual-mouse.png",
    githubUrl: "https://github.com/barath220904/Virtual-Mouse",
    liveUrl: null,
  },
  {
    id: "sentiment-classifier",
    number: "03",
    title: "Product Review Sentiment Classifier",
    description:
      "An NLP pipeline that classifies product reviews by sentiment. Covers text preprocessing, feature extraction, and a trained SVM model for prediction.",
    technologies: ["Python", "Scikit-learn", "NLTK", "SVM"],
    image: "/images/projects/sentiment-classifier.png",
    githubUrl: "http://github.com/barath220904/Sentiment-analysis",
    liveUrl: null,
  },
  {
    id: "weather-dashboard",
    number: "04",
    title: "Weather Dashboard",
    description:
      "A responsive weather application that pulls live data from a REST API and presents current conditions and forecasts in a clean, readable layout.",
    technologies: ["HTML", "CSS", "JavaScript", "REST API"],
    image: "/images/projects/weather-dashboard.png",
    githubUrl: "https://github.com/barath220904/weather-analyzer",
    liveUrl: null,
  },
];

export default projects;
