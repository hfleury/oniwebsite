
import "tailwindcss/tailwind.css";
import Header from "./components/headers/Light";
import Hero from "./components/Hero";
import Features from "./components/Features";
import MainFeature from "./components/MainFeature";
import Steps from "./components/Steps";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="font-sans antialiased text-gray-900 bg-white min-h-screen flex flex-col">
      <Header />
      <Hero />
      <Features />
      <MainFeature />
      <Steps />
      <Pricing />
      <Testimonials />
      <FAQ />
      <div className="mt-auto w-full">
        <Footer />
      </div>
    </div>
  );
}

export default App;
