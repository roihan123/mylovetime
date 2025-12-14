"use client";

import React, { useState, useEffect } from "react";
import { TimeBreakdown, ModalType } from "./types";
import TotalDaysBox from "./TotalDaysBox";
import SinceBox from "./SinceBox";
import InfoModal from "./InfoModal";
import Footer from "./Footer";

// --- Configuration ---
const START_DATE = "2025-10-01T13:45:23"; 

export default function LoveCounter() {
  const [time, setTime] = useState<TimeBreakdown | null>(null);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [isLightTheme, setIsLightTheme] = useState(false);

  // 1. Time Calculation Logic
  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(START_DATE);
      const now = new Date();
      const difference = now.getTime() - start.getTime();

      const totalDays = Math.floor(difference / (1000 * 60 * 60 * 24));

      let years = now.getFullYear() - start.getFullYear();
      let months = now.getMonth() - start.getMonth();
      let days = now.getDate() - start.getDate();
      let hours = now.getHours() - start.getHours();
      let minutes = now.getMinutes() - start.getMinutes();
      let seconds = now.getSeconds() - start.getSeconds();

      if (seconds < 0) { seconds += 60; minutes--; }
      if (minutes < 0) { minutes += 60; hours--; }
      if (hours < 0) { hours += 24; days--; }
      if (days < 0) {
        const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += previousMonth.getDate();
        months--;
      }
      if (months < 0) { months += 12; years--; }

      setTime({ years, months, days, hours, minutes, seconds, totalDays });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // 2. Theme Logic
  useEffect(() => {
    if (isLightTheme) {
      document.body.classList.add("light-theme");
    } else {
      document.body.classList.remove("light-theme");
    }
  }, [isLightTheme]);

  if (!time) return null;

  // Format date string for the SinceBox
  const simpleDateString = new Date(START_DATE).toLocaleDateString("en-US", {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 transition-colors duration-300">
      
      <div className="w-full max-w-md flex flex-col items-center gap-6">
        
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold tracking-widest text-center">
          together
          <span className="block text-2xl mt-2">For</span>
        </h1>

        {/* COMPONENT: Big Box */}
        <TotalDaysBox 
          totalDays={time.totalDays} 
          onClick={() => setActiveModal("duration")} 
        />

        {/* COMPONENT: Small Box */}
        <SinceBox 
          dateString={simpleDateString} 
          onClick={() => setActiveModal("since")} 
        />

      </div>

      {/* COMPONENT: Modal */}
      {activeModal && (
        <InfoModal 
          type={activeModal} 
          onClose={() => setActiveModal(null)} 
          timeData={time}
          startDate={START_DATE}
        />
      )}

      {/* Theme Toggle */}
      <button 
        onClick={() => setIsLightTheme(!isLightTheme)}
        className="fixed top-4 right-4 text-xs border border-[var(--box-border)] px-2 py-1 opacity-30 hover:opacity-100 transition-opacity"
      >
        Theme
      </button>
      <Footer />

    </div>
  );
}