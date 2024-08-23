import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div style={styles.sidebar}>
      <Link to="/">Overview</Link>
      <Link to="/analytics">Analytics</Link>
      <Link to="/settings">Settings</Link>
    </div>
  );
}

const styles = {
  sidebar: {
    background: "#333",
    padding: "15px",
    color: "white",
    height: "100vh",
    width: "200px",
    position: "fixed",
  },
  link: {
    display: "block",
    color: "white",
    padding: "10px 0",
    textDecoration: "none",
  },
};

export default Sidebar;
