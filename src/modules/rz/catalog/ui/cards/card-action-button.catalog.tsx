import React from "react";

export function CardActionButton({ icon }: { icon: React.ReactNode }) {
  return (
    <button className="absolute rounded-xs w-10 h-10 bottom-0 left-0 bg-black cursor-pointer transition-opacity duration-300 z-20 p-1 flex justify-center items-center">
      {icon}
    </button>
  );
}
