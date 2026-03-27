import React, { createContext, useContext, useState } from 'react';
import { systemGroups as initialGroups } from '../data/systemData';

const SystemDataContext = createContext(null);

export function SystemDataProvider({ children }) {
  // keep a local mutable copy of groups (preserve icon component references)
  const [groups, setGroups] = useState(() =>
    initialGroups.map((g) => ({
      ...g,
      systems: (g.systems || []).map((s) => ({ ...s })),
    }))
  );

  function addGroup({ group_name, description, group_url, icon = null }) {
    const nextId = groups.reduce((acc, g) => Math.max(acc, g.group_id), 0) + 1;
    const newGroup = { group_id: nextId, group_name, description, group_url, icon, systems: [] };
    setGroups((prev) => [...prev, newGroup]);
    return newGroup;
  }

  function updateGroup(group_id, updates) {
    setGroups((prev) => prev.map((g) => (g.group_id === group_id ? { ...g, ...updates } : g)));
  }

  function deleteGroup(group_id) {
    setGroups((prev) => prev.filter((g) => g.group_id !== group_id));
  }

  function addSystem(group_id, system) {
    const nextSid = groups.flatMap(g => g.systems).reduce((acc, s) => Math.max(acc, s.system_id || 0), 0) + 1;
    const newSystem = { system_id: nextSid, ...system, created_at: new Date().toISOString() };
    setGroups((prev) => prev.map((g) => (g.group_id === group_id ? { ...g, systems: [...g.systems, newSystem] } : g)));
    return newSystem;
  }

  function updateSystem(system_id, updates) {
    setGroups((prev) => prev.map((g) => ({ ...g, systems: g.systems.map((s) => (s.system_id === system_id ? { ...s, ...updates } : s)) })));
  }

  function deleteSystem(system_id) {
    setGroups((prev) => prev.map((g) => ({ ...g, systems: g.systems.filter((s) => s.system_id !== system_id) })));
  }

  return (
    <SystemDataContext.Provider value={{ groups, setGroups, addGroup, updateGroup, deleteGroup, addSystem, updateSystem, deleteSystem }}>
      {children}
    </SystemDataContext.Provider>
  );
}

export function useSystemData() {
  return useContext(SystemDataContext);
}
