import React from "react";
import bgImg from "@/assets/1.png"

export const Media: React.FC = () => {
  return (
    <div className="flex flex-col w-4/5 mt-6 ml-6">
      <div className="w-full rounded-xl overflow-hidden mb-4">
        <img className="w-full" src={bgImg} />
      </div>
      <progress className="progress progress-primary w-full" value="40" max="100"></progress>
    </div>
  );
};
