
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PortalCard from './CardSystem';
import launchpadLogo from '../assets/lplogo.png';
import heroBg from '../assets/launchpad.png';
import { useSystemData } from '../context/SystemDataContext';

function GroupLanding() {
  const { groupUrl } = useParams();
  const { groups } = useSystemData();
  const group = groups.find((g) => g.group_url === groupUrl);

  if (!group) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white p-6 font-sans">
        <h1 className="text-2xl font-semibold mb-4">Group not found</h1>
        <p className="text-gray-400 mb-6 text-center max-w-md">
          The group you are looking for does not exist. Please go back to the main portal.
        </p>
        <Link
          to="/"
          className="px-4 py-2 rounded-full border text-sm font-medium transition-colors border-accent text-accent hover-accent"
        >
          Back to Portal
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-6 font-sans">
      {/* --- BACKGROUND IMAGE & OVERLAY --- */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: `url(${group.bg || heroBg})` }}
      ></div>
      <div className="absolute inset-0 bg-[#1A1A1A]/30 z-0"></div>
      {/* ---------------------------------- */}

      <div className="relative z-10 flex flex-col items-center w-full max-w-5xl">
        {/* Header Section */}
        <div className="text-center mb-12 flex flex-col items-center">
          <div className="bg-[#1A1A1A] p-3 rounded-2xl inline-block mb-6 shadow-lg">
            {group.logo ? (
              <img src={group.logo} alt={`${group.group_name} logo`} className="h-14 object-contain" />
            ) : (
              <img src={launchpadLogo} alt="Launchpad Coworking Logo" className="h-16 object-contain" />
            )}
          </div>
          <h1 className="text-2xl font-semibold mb-3" style={{ color: group.color || '#FFFFFF' }}>{group.group_name}</h1>
          <p className="text-gray-300 max-w-lg mx-auto font-medium text-center">
            {group.description}
          </p>
        </div>

        {/* Systems as cards (reuse PortalCard style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {group.systems.map((system) => (
            <PortalCard
              key={system.system_id}
              href={system.system_link}
              Icon={system.icon || group.icon}
              title={system.system_name}
              description={system.description}
              bgImage={group.bg}
              logo={system.system_logo || null}
              accentColor={group.color || '#D4F82E'}
              openInNewTab={true}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} {group.group_name}. All rights reserved.
        </div>

      </div>
    </div>
  );
}

export default GroupLanding;
