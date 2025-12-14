import React from "react";

interface TotalDaysBoxProps {
  totalDays: number;
  onClick: () => void;
}

export default function TotalDaysBox({ totalDays, onClick }: TotalDaysBoxProps) {
  return (
    <button 
      onClick={onClick}
      className="group relative cursor-pointer"
    >
      <div className="border-4 border-[var(--box-border)] px-12 py-6 transition-transform transform group-hover:scale-105 group-active:scale-95">
         <span className="text-5xl md:text-7xl font-bold">
           {totalDays}
         </span>
         <span className="text-sm md:text-base ml-2">Days</span>
      </div>
      <div className="absolute -bottom-8 w-full text-center text-xs opacity-50 hidden group-hover:block">
        (Click for details)
      </div>
    </button>
  );
}