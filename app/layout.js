import React from 'react';
import Sidebar from '../components/sidebar';

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Sidebar />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;