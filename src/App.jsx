import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import Hero from "./components/Hero.jsx";
import Positioning from "./components/Positioning.jsx";
import Projects from "./components/Projects.jsx";
import Services from "./components/Services.jsx";
import Recommendations from "./components/Recommendations.jsx";
import Contact from "./components/Contact.jsx";
import RecommendationPage from "./pages/RecommendationPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <Hero />
            <Positioning />
            <Projects />
            <Services />
            <Recommendations />
            <Contact />
          </MainLayout>
        }
      />
      <Route path="/recommendation" element={<RecommendationPage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
}
