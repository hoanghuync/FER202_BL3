import React from "react";

export default function SearchBar({ searchTerm, setSearchTerm, onSearch }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={onSearch} style={{ marginLeft: "0.5rem" }}>
        Search
      </button>
    </div>
  );
}
