import { Building2, Receipt } from 'lucide-react';
import launchpadLogo from '../assets/lplogo.png';
import bgimage from '../assets/launchpad.png';

// Static sample data that mimics your Landing_page_system schema
// Tables: user, system_group, system

export const systemGroups = [
  {
    group_id: 1,
    group_name: 'Launchpad Coworking Systems',
    logo: launchpadLogo,
    bg: bgimage,
    color: '#adca29',
    description: 'Core systems for managing coworking space operations and client services.',
    // used in URL like http://localhost:5173/launchpad-coworking-systems
    group_url: 'launchpad-coworking-systems',
    icon: Building2,
    systems: [
      {
        system_id: 1,
        system_name: 'Virtual Office Management',
        system_logo: null,
        description: 'Manage virtual office clients, mail handling, and meeting room bookings.',
        system_link: '#virtual-office-link',
        group_id: 1,
        created_at: '2025-01-01T00:00:00Z',
      },
      {
        system_id: 2,
        system_name: 'Sales Invoicing System',
        system_logo: null,
        description: 'Issue invoices and track payments for all clients.',
        system_link: 'http://192.168.200.15:5179/dashboard',
        group_id: 1,
        created_at: '2025-01-02T00:00:00Z',
      },
    ],
  },
  {
    group_id: 2,
    group_name: 'Paysera Financial Systems',
    logo: launchpadLogo,
    bg: null,
    color: '#7b8be6',
    description: 'Systems for invoices, payments, and financial reporting.',
    // used in URL like http://localhost:5173/payserve-financial-systems
    group_url: 'payserve-financial-systems',
    icon: Receipt,
    systems: [
      {
        system_id: 3,
        system_name: 'Inventory Management System',
        system_logo: null,
        description: 'Manage and track inventory levels for all products.',
        system_link: '#Invertory',
        group_id: 2,
        created_at: '2025-01-03T00:00:00Z',
      }
    ],
  },
];
