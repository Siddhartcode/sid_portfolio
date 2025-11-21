"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { CURRENT_PROJECTS } from "@/constants";

export default function ExperienceSection() {
  return (
    <div className="max-w-[700px] my-[2rem] w-full">
      <div className="flex flex-col items-start justify-center w-full mb-4 gap-2">
        <h1 className="text-md sm:text-lg font-bold">experience 👨‍🍳</h1>
      </div>
      <div className="space-y-4">
        {CURRENT_PROJECTS.map((project) => (
          <ExperienceCard
            key={project.name}
            role={project.role}
            name={project.name}
            url={project.url}
            location={project.location}
            date={project.date}
            description={project.description}
          />
        ))}
      </div>
    </div>
  );
}

function ExperienceCard({
  role,
  name,
  url,
  location,
  date,
  description,
}: {
  role: string;
  name: string;
  location: string;
  url: string;
  date: string;
  description: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      setMousePosition({ x, y });
    }
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full p-4 rounded-lg border border-zinc-900 hover:cursor-pointer overflow-hidden transition-all duration-300 hover:border-gray-600"
    >
      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 z-0 transition-opacity duration-300 ease-in-out"
        style={{
          background: `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.1), transparent 80%)`,
          opacity: isHovered ? 1 : 0, // Gradient visible only on hover
          pointerEvents: "none",
        }}
      />
      {/* Card content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-2">
          <div>
            <h1 className="text-sm font-medium lowercase">{role}</h1>
            <p className="text-xs text-muted-foreground lowercase">
              <a
                href={url}
                target="_blank"
                className="text-blue-500 underline-offset-4 hover:underline hover:text-blue-600 transition-all cursor-pointer"
              >
                {name}
              </a>{" "}
              • {location}
            </p>
          </div>
          <span className="text-[0.70em] rounded-md px-2 py-1 text-gray-400">
            {date}
          </span>
        </div>
        {/* Description */}
        <p className="text-xs text-gray-400 lowercase">{description}</p>
      </div>
    </motion.div>
  );
}
