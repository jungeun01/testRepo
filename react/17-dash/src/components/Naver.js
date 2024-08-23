import React from "react";

function Navbar() {
  return (
    <nav style={styles.navbar}>
      <h1>Smart Farm Dashboard</h1>
    </nav>
  );
}

const styles = {
  navbar: {
    background: "#4CAF50",
    padding: "10px",
    color: "white",
    textAlign: "center",
  },
};

export default Navbar;
