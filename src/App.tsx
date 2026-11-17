import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { SolutionPage } from "./pages/SolutionPage";
import { ProductPage } from "./pages/ProductPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { NewsPage } from "./pages/NewsPage";
import { NewsDetailPage } from "./pages/NewsDetailPage";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/solutions/:slug" element={<SolutionPage />} />
        <Route path="/products/:slug" element={<ProductPage />} />
        <Route path="/company/about-us" element={<AboutPage />} />
        <Route path="/company/contact-us" element={<ContactPage />} />
        <Route path="/company/news" element={<NewsPage />} />
        <Route path="/company/news/:slug" element={<NewsDetailPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}
