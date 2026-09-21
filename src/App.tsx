
import "tailwindcss/tailwind.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/headers/Light";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Features from "./components/Features";
import Footer from "./components/Footer";
import ServiceDetail from "./components/ServiceDetail";

function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Features />
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
      </Routes>
      <div className="mt-auto w-full">
        <Footer />
      </div>
    </div>
  );
}

export default App;
