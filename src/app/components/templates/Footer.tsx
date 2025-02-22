import React from "react";

const Footer = () => {
  return (
    <footer
      aria-label="Powered by Socket Footer"
      className="bg-app-dark-surface3 py-4 border-t border-neutral-800 text-sm text-gray-400 flex justify-between items-center px-8 shadow-inner mt-auto"
    >
      {/* Left Section: Powered by Socket */}
      <div>
        Powered by{" "}
        <a
          href="#socket-link" // Replace with actual URL if available
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-primaryPurple transition-colors font-medium"
        >
          Socket
        </a>
      </div>

      {/* Right Section: Social Links */}
      <div className="flex space-x-6">
        <a
          href="https://discord.gg/DrvfYq6fvc" // Replace with actual URL if available
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors font-medium"
        >
          Discord
        </a>
        <a
          href="https://twitter.com/BungeeExchange" // Replace with actual URL if available
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors font-medium"
        >
          Twitter
        </a>
        <a
          href="https://blog.bungee.exchange/" // Replace with actual URL if available
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors font-medium"
        >
          Medium
        </a>
      </div>
    </footer>
  );
};

export default Footer;
