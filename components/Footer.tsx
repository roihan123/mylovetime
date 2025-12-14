import React from "react";

export default function Footer() {
  return (
    <div className="fixed bottom-4 right-4 text-xs md:text-sm font-bold opacity-50 hover:opacity-100 transition-opacity z-10">
      <span>created by </span>
      <a 
        href="https://roihan123.netlify.app" 
        target="_blank" 
        rel="noopener noreferrer"
        className="underline decoration-dotted hover:decoration-solid hover:text-[var(--box-border)]"
      >
        roihan123
      </a>
    </div>
  );
}