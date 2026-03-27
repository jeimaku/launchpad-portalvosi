// src/components/PortalGateway.jsx
import React from 'react';
import { Building2, Receipt, ArrowRight } from 'lucide-react';
import launchpadLogo from '../assets/lplogo.png'; 
import heroBg from '../assets/launchpad.png'; 

function PortalGateway() {
  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-6 font-sans">
      
      {/* --- BACKGROUND IMAGE & OVERLAY --- */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: `url(${heroBg})` }}
      ></div>
      <div className="absolute inset-0 bg-[#1A1A1A]/85 z-0"></div> 
      {/* ---------------------------------- */}

      <div className="relative z-10 flex flex-col items-center w-full max-w-5xl">
        
        {/* Header Section */}
        <div className="text-center mb-16 flex flex-col items-center">
          <div className="bg-[#1A1A1A] p-4 rounded-2xl inline-block mb-6 shadow-lg">
            <img 
              src={launchpadLogo} 
              alt="Launchpad Coworking Logo" 
              className="h-16 object-contain" 
            />
          </div>
          <p className="text-gray-300 max-w-lg mx-auto font-medium">
            Welcome to the Launchpad Coworking centralized gateway. Please select the system you need to access below.
          </p>
        </div>

        {/* Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          
          {/* Card 1: Virtual Office */}
          <a 
            href="#virtual-office-link" 
            className="group relative bg-neutral-900/70 backdrop-blur-sm border border-neutral-700 rounded-2xl p-8 hover:border-[#D4F82E] transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,248,46,0.15)] flex flex-col h-full"
          >
            <div className="bg-neutral-800 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md">
              <Building2 className="text-[#D4F82E] w-7 h-7" />
            </div>
            <h2 className="text-2xl font-semibold mb-3 text-white">Virtual Office Management</h2>
            <p className="text-gray-400 mb-8 flex-grow leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="flex items-center text-[#D4F82E] font-medium mt-auto">
              <span>Access Portal</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
            </div>
          </a>

          {/* Card 2: Sales Invoicing */}
          <a 
            href="#sales-invoicing-link" 
            className="group relative bg-neutral-900/70 backdrop-blur-sm border border-neutral-700 rounded-2xl p-8 hover:border-[#D4F82E] transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,248,46,0.15)] flex flex-col h-full"
          >
            <div className="bg-neutral-800 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md">
              <Receipt className="text-[#D4F82E] w-7 h-7" />
            </div>
            <h2 className="text-2xl font-semibold mb-3 text-white">Sales Invoicing System</h2>
            <p className="text-gray-400 mb-8 flex-grow leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="flex items-center text-[#D4F82E] font-medium mt-auto">
              <span>Access Portal</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
            </div>
          </a>

        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Launchpad Coworking Philippines. All rights reserved.
        </div>

      </div>
    </div>
  );
}

export default PortalGateway;