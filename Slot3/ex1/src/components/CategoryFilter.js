import React from "react";

export default function CategoryFilter({ category, setCategory }) {
  return (
    <select value={category} onChange={(e) => setCategory(e.target.value)}>
      <option value="">All Categories</option>
      <option value="Finance">Finance</option>
      <option value="Retail">Retail</option>
      <option value="Auto">Auto</option>
      <option value="Technology">Technology</option>
    </select>
  );
}
