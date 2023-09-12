"use client"
import './globals.css'
import React, { useState } from "react";
import Sidebar from '../components/sidebar';
import ResultsContext from './SearchContext/store';


export default function RootLayout({ children }) {
  const [results, setResults] = useState([]);
  const [requirement, setRequirement] = useState(0);
  const [groupName, setGroupName] = React.useState('');
  return (
    <html lang="en">
      <body>
      <ResultsContext.Provider value={{ results, setResults, requirement, setRequirement ,groupName,
      setGroupName: (newGroupName) => setGroupName(newGroupName) }}>
        <Sidebar>
          {children}
        </Sidebar>
        </ResultsContext.Provider>

      </body>
    </html>
  )
}

export const metadata = {
  title: 'Home',
  description: 'Welcome to Next.js',
}