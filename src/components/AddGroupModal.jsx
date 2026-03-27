import React, { useState } from 'react';
import { useSystemData } from '../context/SystemDataContext';
import { Building2, Receipt } from 'lucide-react';

const ICON_OPTIONS = {
  none: null,
  building: Building2,
  receipt: Receipt,
};

export default function AddGroupModal({ isOpen, onClose }) {
  const { addGroup } = useSystemData();
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [groupUrl, setGroupUrl] = useState('');
  const [color, setColor] = useState('#D4F82E');
  const [iconKey, setIconKey] = useState('building');
  const [logoFile, setLogoFile] = useState(null);
  const [bgFile, setBgFile] = useState(null);

  if (!isOpen) return null;

  function handleFileChange(e, setFile) {
    const f = e.target.files && e.target.files[0];
    if (f) {
      const url = URL.createObjectURL(f);
      setFile(url);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!groupName || !groupUrl) return;
    const icon = ICON_OPTIONS[iconKey] || null;
    addGroup({ group_name: groupName, description, group_url: groupUrl, logo: logoFile, bg: bgFile, color, icon });
    onClose && onClose();
    setGroupName('');
    setDescription('');
    setGroupUrl('');
    setColor('#D4F82E');
    setIconKey('building');
    setLogoFile(null);
    setBgFile(null);
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div className="absolute inset-0 overlay-bg backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-3xl mx-4 rounded-2xl modal-card border shadow-2xl p-6 z-50">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h2 className="text-2xl font-semibold">Create new Group</h2>
            <p className="text-sm text-gray-400">Groups organize related systems and have their own landing page URL.</p>
          </div>
          <button onClick={onClose} aria-label="Close" className="ml-auto inline-flex items-center justify-center h-9 w-9 rounded-lg panel-bg border text-gray-300 hover:opacity-90">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <div>
              <label className="block text-sm text-gray-300 mb-2">Group name</label>
              <input value={groupName} onChange={(e) => setGroupName(e.target.value)} className="w-full rounded-lg panel-input px-4 py-3 text-sm placeholder:text-neutral-500 focus-accent" placeholder="My Group" autoFocus />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">Group URL (path)</label>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-3 py-2 rounded-l-lg text-sm text-neutral-400">/</span>
                <input value={groupUrl} onChange={(e) => setGroupUrl(e.target.value)} className="flex-1 rounded-lg panel-input px-4 py-3 text-sm placeholder:text-neutral-500 focus-accent" placeholder="e.g. my-group" />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full rounded-lg panel-input px-4 py-3 text-sm placeholder:text-neutral-500" rows={4} placeholder="Short description for the group" />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-300 mb-2">Accent color</label>
              <div className="flex items-center gap-3">
                <input value={color} onChange={(e) => setColor(e.target.value)} type="color" className="h-10 w-12 p-0 rounded-md border-0" />
                <input value={color} onChange={(e) => setColor(e.target.value)} className="flex-1 rounded-lg panel-input px-3 py-2 text-sm placeholder:text-neutral-500" />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">Icon</label>
              <select value={iconKey} onChange={(e) => setIconKey(e.target.value)} className="w-full rounded-lg panel-input px-3 py-2 text-sm">
                <option value="building">Building</option>
                <option value="receipt">Receipt</option>
                <option value="none">None</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">Logo (optional)</label>
              <div className="flex items-center gap-3">
                <input id="logoFile" type="file" accept="image/*" onChange={(e) => handleFileChange(e, setLogoFile)} className="hidden" />
                <label htmlFor="logoFile" className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-800 text-sm text-gray-200 border border-neutral-700 cursor-pointer hover:bg-neutral-700">Choose logo</label>
                {logoFile && <img src={logoFile} alt="logo preview" className="h-12 w-12 object-contain rounded-md border border-neutral-700" />}
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">Background image (optional)</label>
              <div className="flex items-center gap-3">
                <input id="bgFile" type="file" accept="image/*" onChange={(e) => handleFileChange(e, setBgFile)} className="hidden" />
                <label htmlFor="bgFile" className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-800 text-sm text-gray-200 border border-neutral-700 cursor-pointer hover:bg-neutral-700">Choose image</label>
              </div>
              {bgFile && <div className="mt-3 h-28 w-full rounded-md overflow-hidden border border-neutral-700"><img src={bgFile} alt="bg preview" className="h-full w-full object-cover" /></div>}
            </div>
          </div>

          <div className="md:col-span-3 flex items-center justify-end gap-3 mt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border border-neutral-700 text-sm text-gray-300">Cancel</button>
            <button type="submit" className="px-5 py-2 rounded-lg btn-accent text-sm font-semibold shadow">Create Group</button>
          </div>
        </form>
      </div>
    </div>
  );
}
