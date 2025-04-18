import React from "react";

const SearchFilter = ({ onSearch, onFilter }) => {
  return (
    <div className="flex justify-between mb-4">
      <input
        type="text"
        placeholder="Search students..."
        onChange={(e) => onSearch(e.target.value)}
        className="p-2 border rounded"
      />
      <select onChange={(e) => onFilter(e.target.value)} className="p-2 border rounded">
        <option value="">Filter by class</option>
        <option value="Class A">Class A</option>
        <option value="Class B">Class B</option>
      </select>
    </div>
  );
};

export default SearchFilter;
