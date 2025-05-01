"use client";

import React from "react";

interface VideoSectionProps {
  videoUrl: string;
}

const VideoSection: React.FC<VideoSectionProps> = ({ videoUrl }) => {
  return (
    <section className="w-full mt-12 mb-12 relative">
      <div className="relative w-full">
        <iframe
          src={videoUrl}
          className="w-full md:aspect-[1920/600] aspect-[1080/1450] block"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title="Product video"
          loading="lazy"
        ></iframe>
        <div className="absolute inset-0 bg-black bg-opacity-30 pointer-events-none"></div>
      </div>
    </section>
  );
};

export default VideoSection;
