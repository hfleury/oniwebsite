
import "tailwindcss/tailwind.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/headers/Light";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Footer from "./components/Footer";
import ServiceDetail from "./components/ServiceDetail";
import PrivacyPolicy from "./components/PrivacyPolicy";
import CookieConsentBanner from "./components/CookieConsentBanner";

function HomePage() {
  return (
    <>
      <Hero />
      <Services />
    </>
  );
}

function App() {
  return (
    <div className="font-sans antialiased text-gray-900 bg-white min-h-screen flex flex-col">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services/:id" element={<ServiceDetail />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
      </Routes>
      <div className="mt-auto w-full">
        <Footer />
      </div>
      <CookieConsentBanner />
    </div>
  );
}

export default App;
