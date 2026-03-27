
import React, { useState } from 'react';
import launchpadLogo from '../assets/lplogo.png'; 
import heroBg from '../assets/launchpad.png'; 
import PortalCard from './CardSystem';
import AdminLoginModal from './AdminLoginModal';
import AddGroupModal from './AddGroupModal';
import AddSystemModal from './AddSystemModal';
import ThemeToggle from './ThemeToggle';
import { useSystemData } from '../context/SystemDataContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';


function PortalGateway() {
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const { groups } = useSystemData();
  const auth = useAuth();
  const [isAddGroupOpen, setIsAddGroupOpen] = useState(false);
  const [isAddSystemOpen, setIsAddSystemOpen] = useState(false);
  const [selectedGroupForSystem, setSelectedGroupForSystem] = useState(null);

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-6 font-sans">
      {/* Admin Login / Controls (top-right) */}
      <div className="absolute top-6 right-6 z-20 flex items-center gap-3">
        <ThemeToggle />
        <div>
          {!auth.isAdmin ? (
            <button
              type="button"
              onClick={() => setIsAdminLoginOpen(true)}
              className="px-3 py-2 rounded-full text-sm font-medium text-white overlay-bg backdrop-blur-sm hover:btn-accent transition-colors shadow"
            >
              Admin Login
            </button>
          ) : (
            <div className="flex items-center gap-3 overlay-bg backdrop-blur rounded-full p-1 pr-3 shadow-md">
              <button onClick={() => setIsAddGroupOpen(true)} className="px-3 py-2 rounded-full text-sm font-medium text-white hover:overlay-bg transition-colors">+ Group</button>
              <button onClick={() => { setSelectedGroupForSystem(null); setIsAddSystemOpen(true); }} className="px-3 py-2 rounded-full text-sm font-medium text-white hover:overlay-bg transition-colors">+ System</button>
              <button onClick={() => { auth.logout(); }} className="px-3 py-2 rounded-full text-sm font-medium btn-accent">Logout</button>
            </div>
          )}
        </div>
      </div>
      
      {/* --- BACKGROUND IMAGE & OVERLAY --- */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
      ></div>
      <div className="absolute inset-0 z-0"></div> 

      <div className="relative z-10 flex flex-col items-center w-full max-w-5xl">
        
        {/* Header Section */}
        <div className="text-center mb-16 flex flex-col items-center">
          <p className="text-gray-300 max-w-lg mx-auto font-medium text-4xl">
            Welcome to the System Portal
          </p>
        </div>

        {/* Cards Container: one card per group from systemData */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {groups.map((group) => (
            <div key={group.group_id} className="group relative">
              {auth.isAdmin && (
                <button
                  onClick={() => { setSelectedGroupForSystem(group.group_id); setIsAddSystemOpen(true); }}
                  title="Add system to this group"
                  className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[#0b0b0b]/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                >
                  <span className="text-xl">+</span>
                </button>
              )}
              <div className="transform transition-transform group-hover:scale-[1.01]">
                <PortalCard
                  href={`/${group.group_url}`}
                  Icon={group.icon}
                  title={group.group_name}
                  description={group.description}
                  bgImage={group.bg}
                  logo={group.logo}
                  accentColor={group.color || '#D4F82E'}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Launchpad Coworking Philippines. All rights reserved.
        </div>

      </div>

      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
      />

      <AddGroupModal isOpen={isAddGroupOpen} onClose={() => setIsAddGroupOpen(false)} />
      <AddSystemModal isOpen={isAddSystemOpen} onClose={() => { setIsAddSystemOpen(false); setSelectedGroupForSystem(null); }} initialGroupId={selectedGroupForSystem} groups={groups} />
    </div>
  );
}

export default PortalGateway;