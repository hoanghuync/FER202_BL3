import React from "react";

export default function SortDropdown({ sortOption, setSortOption }) {
  return (
    <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
      <option value="">-- Sort by --</option>
      <option value="startAsc">Start Year ↑</option>
      <option value="startDesc">Start Year ↓</option>
      <option value="duration">Duration (start–end)</option>
    </select>
  );
}
