import React from "react";
import { ModalType, TimeBreakdown } from "./types";

interface InfoModalProps {
  type: ModalType;
  onClose: () => void;
  timeData: TimeBreakdown;
  startDate: string; // The raw date string
}

export default function InfoModal({ type, onClose, timeData, startDate }: InfoModalProps) {
  if (!type) return null;

  // Format dates for the "Since" view
  const startDateObj = new Date(startDate);
  const detailDay = startDateObj.toLocaleDateString("en-US", { weekday: 'long' });
  const detailDate = startDateObj.toLocaleDateString("en-US", { day: 'numeric', month: 'long', year: 'numeric' });
  const detailTime = startDateObj.toLocaleTimeString("en-US");

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div 
        className="bg-[var(--background)] border-2 border-[var(--box-border)] p-8 shadow-2xl max-w-sm w-full relative"
        onClick={(e) => e.stopPropagation()} 
      >
        
        {/* VIEW 1: DURATION BREAKDOWN */}
        {type === "duration" && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center border-b border-[var(--box-border)] pb-4">
              Detailed Time
            </h2>
            <div className="space-y-4 text-lg">
              <DetailRow label="Years" value={timeData.years} />
              <DetailRow label="Months" value={timeData.months} />
              <DetailRow label="Days" value={timeData.days} />
              <DetailRow label="Hours" value={timeData.hours} />
              <DetailRow label="Minutes" value={timeData.minutes} />
              <DetailRow label="Seconds" value={timeData.seconds} />
            </div>
          </>
        )}

        {/* VIEW 2: SINCE DATE DETAILS */}
        {type === "since" && (
          <div className="text-center">
             <h2 className="text-xl font-bold mb-6 lowercase">
               i love you since :
             </h2>
             <div className="flex flex-col gap-4 text-xl md:text-2xl font-bold">
                <p className="border-b border-dashed border-[var(--box-border)] pb-2">{detailDay}</p>
                <p className="border-b border-dashed border-[var(--box-border)] pb-2">{detailDate}</p>
                <p>{detailTime}</p>
             </div>
          </div>
        )}

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="mt-8 w-full border border-[var(--box-border)] py-2 hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors uppercase text-sm font-bold cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
}

// Helper for this file only
function DetailRow({ label, value }: { label: string, value: number }) {
  return (
    <div className="flex justify-between items-center">
      <span>{label} :</span>
      <span className="font-bold">{value}</span>
    </div>
  );
}