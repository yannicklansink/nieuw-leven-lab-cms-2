'use client';

import Image from 'next/image';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { useState } from 'react';
import VideoSection from '@/components/sections/VideoSection';
import Button from '@/components/elements/Button';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <main className={`${inter.className} min-h-screen`}>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div className="content-container flex items-center justify-between">
          <div className="text-3xl">Nieuw Leven</div>
          <div className="flex space-x-6">
            <a href="#" className="text-sm font-medium hover:text-gray-700">Sexual Health</a>
            <a href="#" className="text-sm font-medium hover:text-gray-700">Weight Loss</a>
            <a href="#" className="text-sm font-medium hover:text-gray-700">Fertility</a>
            <a href="#" className="text-sm font-medium hover:text-gray-700">Hair</a>
            <a href="#" className="text-sm font-medium hover:text-gray-700">Skin</a>
            <a href="#" className="text-sm font-medium hover:text-gray-700">Daily Health</a>
            <a href="#" className="text-sm font-medium hover:text-gray-700">Top Products</a>
          </div>
          <div className="w-8 h-8 flex items-center justify-center rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
        </div>
      </nav>
      
      {/* Mobile Navigation */}
      <nav className="flex md:hidden items-center justify-between px-6 py-4 border-b border-gray-100 relative">
        <button 
          className="w-8 h-8 flex items-center justify-center"
          onClick={toggleMobileMenu}
          aria-label="Menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <div className="text-3xl">Nieuw Leven Lab</div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white z-50 shadow-lg py-4">
            <div className="flex flex-col space-y-3 px-6">
              <a href="#" className="text-sm font-medium hover:text-gray-700 py-2 border-b border-gray-100">Sexual Health</a>
              <a href="#" className="text-sm font-medium hover:text-gray-700 py-2 border-b border-gray-100">Weight Loss</a>
              <a href="#" className="text-sm font-medium hover:text-gray-700 py-2 border-b border-gray-100">Fertility</a>
              <a href="#" className="text-sm font-medium hover:text-gray-700 py-2 border-b border-gray-100">Hair</a>
              <a href="#" className="text-sm font-medium hover:text-gray-700 py-2 border-b border-gray-100">Skin</a>
              <a href="#" className="text-sm font-medium hover:text-gray-700 py-2 border-b border-gray-100">Daily Health</a>
              <a href="#" className="text-sm font-medium hover:text-gray-700 py-2">Top Products</a>
            </div>
          </div>
        )}
      </nav>

      <div className="content-container">
        {/* Desktop Hero Section */}
        <section className="hidden md:flex py-12">
          <div className="w-1/2">
            <h1>
              100% online,<br />
              we got you
            </h1>
          </div>
          <div className="w-1/2">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>2,000,000+ members treated</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="8" x2="16" y2="8"></line>
                  <line x1="16" y1="12" x2="16" y2="12"></line>
                  <line x1="16" y1="16" x2="16" y2="16"></line>
                  <line x1="8" y1="8" x2="8" y2="8"></line>
                  <line x1="8" y1="12" x2="8" y2="12"></line>
                  <line x1="8" y1="16" x2="8" y2="16"></line>
                </svg>
                <span>Free and discreet shipping</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="3" y1="9" x2="21" y2="9"></line>
                  <line x1="9" y1="21" x2="9" y2="9"></line>
                </svg>
                <span>100% online process</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
                </svg>
                <span>No insurance required</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* Mobile Hero Section */}
        <section className="md:hidden py-6">
          <div className="flex items-center space-x-2 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span>2,000,000+ members treated</span>
          </div>
          <div className="flex items-center space-x-2 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="8" x2="16" y2="8"></line>
              <line x1="16" y1="12" x2="16" y2="12"></line>
              <line x1="16" y1="16" x2="16" y2="16"></line>
              <line x1="8" y1="8" x2="8" y2="8"></line>
              <line x1="8" y1="12" x2="8" y2="12"></line>
              <line x1="8" y1="16" x2="8" y2="16"></line>
            </svg>
            <span>Free and discreet shipping</span>
          </div>
          <h1>
            Fuller hair,<br />
            we got you
          </h1>
        </section>
        
        {/* Product Cards - First Row */}
        <section className="pb-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Weight Loss Card */}
            <div className="bg-[#f7f5f2] rounded-lg overflow-hidden flex">
              <div className="p-6 flex flex-col h-full w-full">
                <div className="flex-grow">
                  <h2 className="text-3xl font-bold mb-6">
                    Lose weight<br />
                    with GLP-1s
                  </h2>
                  <div className="h-64 relative">
                    <Image 
                      src="https://images.pexels.com/photos/8460220/pexels-photo-8460220.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" 
                      alt="GLP-1 medication" 
                      className="object-contain"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <Button variant="primary">
                    Get started
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Sparks Card */}
            <div className="bg-[#f7f5f2] rounded-lg overflow-hidden flex">
              <div className="p-6 flex flex-col h-full w-full">
                <div className="flex-grow">
                  <h2 className="text-3xl font-bold mb-2">
                    Get hard faster<br />
                    with Sparks
                  </h2>
                  <div className="inline-block bg-white rounded-full px-3 py-1 text-sm font-medium mb-4">
                    Best seller
                  </div>
                  <div className="h-64 relative">
                    <Image 
                      src="https://images.pexels.com/photos/7661589/pexels-photo-7661589.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" 
                      alt="Sparks pill" 
                      className="object-contain"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <Button variant="primary">
                    Get started
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>  
        
        {/* Product Cards  - Second Row */}
        <section className="pb-6">
          <div className="grid grid-cols-1 gap-4">
            {/* Zepbound Card */}
            <div className="bg-[#D8CADF] rounded-lg overflow-hidden p-6 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 mr-4">
                  <Image 
                    src="https://via.placeholder.com/100"
                    alt="Zepbound vial" 
                    width={50}
                    height={50}
                    className="object-contain"
                  />
                </div>
                <div>
                  <p className="text-xl font-bold">
                    Access<br />Zepbound® in a vial
                  </p>
                </div>
              </div>
              <button className="bg-black text-white rounded-full p-2 flex items-center justify-center hover:bg-gray-800 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
            
            {/* Daily Rise Card */}
            <div className="bg-[#E9E9E9] rounded-lg overflow-hidden p-6 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 mr-4">
                  <Image 
                    src="https://via.placeholder.com/100"
                    alt="Daily Rise product" 
                    width={50}
                    height={50}
                    className="object-contain"
                  />
                </div>
                <div>
                  <p className="text-xl font-bold">
                    Have better sex<br />with Daily Rise
                  </p>
                </div>
              </div>
              <button className="bg-black text-white rounded-full p-2 flex items-center justify-center hover:bg-gray-800 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
            
            {/* Hair Regrowth Card */}
            <div className="bg-[#C9D4E2] rounded-lg overflow-hidden p-6 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 mr-4">
                  <Image 
                    src="https://via.placeholder.com/100"
                    alt="Hair regrowth product" 
                    width={50}
                    height={50}
                    className="object-contain"
                  />
                </div>
                <div>
                  <p className="text-xl font-bold">
                    Regrow your hair
                  </p>
                </div>
              </div>
              <button className="bg-black text-white rounded-full p-2 flex items-center justify-center hover:bg-gray-800 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </section>
      </div>
      
      <VideoSection videoUrl="https://player.vimeo.com/video/1071426065?h=397458370f&autoplay=1&loop=1&background=1&muted=1" />

      {/* Additional content can be added below */}
      <div className="content-container">
        {/* Place for additional content */}
      </div>
    </main>
  );
}