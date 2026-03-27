import React, { useState } from 'react';
import { useSystemData } from '../context/SystemDataContext';

export default function AddSystemModal({ isOpen, onClose, initialGroupId = null, groups = [] }) {
  const { addSystem } = useSystemData();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [groupId, setGroupId] = useState(initialGroupId || (groups[0] && groups[0].group_id) || 0);
  const [logoFile, setLogoFile] = useState(null);

  if (!isOpen) return null;

  function handleSubmit(e) {
    e.preventDefault();
    if (!name) return;
    addSystem(groupId, { system_name: name, description, system_link: link, group_id: groupId, system_logo: logoFile });
    onClose && onClose();
    setName('');
    setDescription('');
    setLink('');
    setLogoFile(null);
  }

  function handleFileChange(e) {
    const f = e.target.files && e.target.files[0];
    if (f) {
      const url = URL.createObjectURL(f);
      setLogoFile(url);
    }
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div className="absolute inset-0 overlay-bg backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-3xl mx-4 rounded-2xl modal-card border shadow-2xl p-6 z-50">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h2 className="text-2xl font-semibold">Add New System</h2>
            <p className="text-sm text-gray-400">Pick a group and provide the system link so users can access it.</p>
          </div>
          <button onClick={onClose} aria-label="Close" className="ml-auto inline-flex items-center justify-center h-9 w-9 rounded-lg panel-bg border text-gray-300 hover:opacity-90">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <div>
              <label className="block text-sm text-gray-300 mb-2">System name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg panel-input px-4 py-3 text-sm placeholder:text-neutral-500 focus-accent" placeholder="System name" autoFocus />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">Link</label>
              <input value={link} onChange={(e) => setLink(e.target.value)} className="w-full rounded-lg panel-input px-4 py-3 text-sm placeholder:text-neutral-500 focus-accent" placeholder="https://example.com" />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full rounded-lg panel-input px-4 py-3 text-sm placeholder:text-neutral-500" rows={3} placeholder="Short description" />
            </div>

            <div className="flex items-center gap-3">
              <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border border-neutral-700 text-sm text-gray-300">Cancel</button>
              <button type="submit" className="px-5 py-2 rounded-lg btn-accent text-black text-sm font-semibold shadow">Add System</button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-300 mb-2">Group</label>
              <select value={groupId} onChange={(e) => setGroupId(Number(e.target.value))} className="w-full rounded-lg panel-input px-3 py-2 text-sm">
                {groups.map((g) => (
                  <option key={g.group_id} value={g.group_id}>{g.group_name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">Logo (optional)</label>
              <div className="flex items-center gap-3">
                <input id="systemLogo" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                <label htmlFor="systemLogo" className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-800 text-sm text-gray-200 border border-neutral-700 cursor-pointer hover:bg-neutral-700">Upload logo</label>
                {logoFile && <img src={logoFile} alt="logo preview" className="h-12 w-12 object-contain rounded-md border border-neutral-700" />}
              </div>
            </div>

            {logoFile && (
              <div>
                <label className="block text-sm text-gray-300 mb-2">Logo preview</label>
                <div className="h-24 w-full rounded-md overflow-hidden border border-neutral-700"><img src={logoFile} alt="logo" className="h-full w-full object-contain p-2" /></div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
