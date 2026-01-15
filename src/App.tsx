
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
    <div className="font-sans antialiased text-gray-900 bg-white">
      <Header />
      <Hero />
      <Features />
      <MainFeature />
      <Steps />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
}

export default App;
