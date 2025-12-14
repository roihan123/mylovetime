import React from "react";

interface SinceBoxProps {
  dateString: string;
  onClick: () => void;
}

export default function SinceBox({ dateString, onClick }: SinceBoxProps) {
  return (
    <div className="flex items-center gap-4 mt-4">
      <span className="text-xl font-bold">Since</span>
      <button 
        onClick={onClick}
        className="border-2 border-[var(--box-border)] px-4 py-2 text-sm md:text-base hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors cursor-pointer"
      >
        {dateString}
      </button>
    </div>
  );
}