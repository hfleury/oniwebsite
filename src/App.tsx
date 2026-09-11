
import "tailwindcss/tailwind.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/headers/Light";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Footer from "./components/Footer";

function HomePage() {
  return (
    <>
      <Hero />
      <Features />
    </>
  );
}

// Temporary placeholder for FOWO-38, which replaces this with the real ServiceDetail.tsx
function ServiceDetailPlaceholder() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <p>Service detail coming soon</p>
    </div>
  );
}

function App() {
  return (
    <div className="font-sans antialiased text-gray-900 bg-white min-h-screen flex flex-col">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services/:id" element={<ServiceDetailPlaceholder />} />
      </Routes>
      <div className="mt-auto w-full">
        <Footer />
      </div>
    </div>
  );
}

export default App;
