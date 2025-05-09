
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleDemosClick = () => {
    if (location.pathname === "/demos") {
      const element = document.getElementById("demos-section");
      if (element) element.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/demos");
    }
  };

  const handlePresentationClick = () => {
    navigate("/presentation");
  };

  return (
    <header className="py-6 px-4 text-center">
      <h1 className="cyber-title text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold mb-3">
        Cosmic Kitchen
      </h1>
      <p className="text-xl md:text-2xl text-cyber-blue mb-6 max-w-2xl mx-auto">
        Kubernetes Presentation Demo
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Button 
          className="bg-cyber-purple hover:bg-cyber-purple/80"
          onClick={handleDemosClick}
        >
          Demos
        </Button>
        {location.pathname !== "/presentation" && (
          <Button 
            className="bg-cyber-pink hover:bg-cyber-pink/80"
            onClick={handlePresentationClick}
          >
            View Presentation
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
