import React from 'react';
import { Link } from 'react-router-dom';
// import './Navbar.css';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <Link to="/admin" style={styles.navLink}>Admin Dashboard</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/user" style={styles.navLink}>User Dashboard</Link>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#1e1e2f',
    padding: '10px 20px',
  },
  navList: {
    display: 'flex',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  navItem: {
    marginRight: '20px',
  },
  navLink: {
    color: '#fff', // Changed to white for better visibility
    textDecoration: 'none',
    fontSize: '16px',
  },
};

export default Navbar;
