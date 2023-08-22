import React from 'react';
import Link from 'next/link';

const Sidebar = ({ children }) => {
  return (
    <div className="container">
      <div className="sidebar">
        <div className="menu-items">
          <Link href="/">Homepage</Link>
          <Link href="/chooseDatabase">Uploads</Link>
          <Link href="/new">See Graph</Link>
          <Link href="/pst">Table</Link>
        </div>
      </div>
      <main className="main-content">{children}</main>
      <style jsx>{`
        .container {
          display: flex;
        }
        .sidebar {
          flex: 0 0 20%;
          height: 100vh;
          padding: 20px;
          background-color: #f5f5f5;
          border-right: 1px solid #ddd;
        }
        .menu-items {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .menu-items a {
          text-decoration: none;
          color: #333;
        }
        .menu-items a:hover {
          color: #0070f3;
          cursor: pointer;
        }
        .main-content {
          flex: 1;
          padding: 20px;
        }
      `}</style>
    </div>
  );
};

export default Sidebar;
