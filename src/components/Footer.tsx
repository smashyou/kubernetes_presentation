import React from "react";

const Footer = () => {
  return (
    <footer className="text-center py-8 mt-12 text-sm text-gray-400">
      <div className="max-w-7xl mx-auto px-4">
        <a href="https://johnminryu.netlify.app">
          <p className="cyber-title text-sm font-orbitron font-bold mb-3">
            John Ryu
          </p>
        </a>
        <p className="mb-2">Cosmic Kitchen: Kubernetes Presentation App</p>
        <p>
          <span className="text-cyber-blue">
            &copy; {new Date().getFullYear()}
          </span>{" "}
          - Built with React & Tailwind CSS
        </p>
      </div>
    </footer>
  );
};

export default Footer;
