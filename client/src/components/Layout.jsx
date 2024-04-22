import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import PropTypes from "prop-types";

function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="layout">
      <Navbar />
      <Sidebar />
      <div className="content">{children}</div>
    </div>
  );
}

Layout.PropTypes = {
  children: PropTypes.node,
};