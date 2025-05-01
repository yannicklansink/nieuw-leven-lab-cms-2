'use client';

import React from 'react';
import Button from '@/components/elements/Button';

interface VideoSectionProps {
  videoUrl: string;
}

const VideoSection: React.FC<VideoSectionProps> = ({ videoUrl }) => {
  return (
    <section className="w-full mt-12 mb-12 relative">
      <div className="relative w-full aspect-video">
        <iframe
          src={videoUrl}
          className="absolute top-0 left-0 w-full h-full"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title="Product video"
          loading="lazy"
        ></iframe>
        
        {/* Overlay content */}
        <div className="absolute inset-0 flex items-center">
          <div className="content-container z-10 py-12">
            <div className="max-w-md">
              <h2 className="text-4xl md:text-5xl text-white mb-6">
                Lose weight and keep it off with GLP-1s
              </h2>
              <Button href="https://google.com" variant="primary">
                Get started
              </Button> 
            </div>
          </div>
        </div>
        
        {/* Semi-transparent overlay for better text visibility */}
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>
    </section>
  );
};

export default VideoSection; 