import React from 'react';
import './Sidebar.css'; // Assume you have a CSS file for styling

const Sidebar = () => {
  return (
    <nav className={ "sidebar ${isSidebarOpen ? 'open' : 'closed'}"}>
    <div className="search-bar">
      <input type="text" placeholder="Search journal..." />
    </div>
    <div className="menu-items">
      <button className="new-entry">New Entry</button>
      <button className="view-all">View All Entries</button>
      <button className="view-favorites">View Starred Entries</button>
    </div>
  </nav>
  );
};

export default Sidebar;
