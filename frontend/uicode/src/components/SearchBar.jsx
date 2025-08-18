import React from 'react';
import { CiSearch } from 'react-icons/ci';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => (
  <div className="search-bar">
    <div className="search-input-wrapper">
      <CiSearch className="search-icon" />
      <input
        type="text"
        className="form-control"
        placeholder="Search doctors..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  </div>
);

export default SearchBar;

