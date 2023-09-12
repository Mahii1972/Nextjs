"use client"
import React from "react";
import Link from "next/link";
import {
  Card,
  Typography,
  List,
  ListItem,
} from "@material-tailwind/react";

function Sidebar({ children }) {
  return (
    <div className="flex min-h-screen">
      <Card className="text-center w-56 p-6">
      <Link href="/">
          <Typography variant="h5" color="gray" className="cursor-pointer">A Next.js App</Typography>
        </Link>
        <List>
        <ListItem color="lightBlue">
            <Link href="/Dashboard">Dashboard</Link>
          </ListItem>
          <ListItem color="lightBlue">
            <Link href="/database">file Upload</Link>
          </ListItem>
          <ListItem color="lightBlue">
            <Link href="/table">Commit</Link>
          </ListItem>
          <ListItem color="lightBlue">
            <Link href="/database/form">Data Entry Form</Link>
          </ListItem>
        </List>
      </Card>
      <main className="main-content flex-grow bg-gray-100 pt-10 pb-5 pl-20 pr-5">
        {children}
      </main>
    </div>
  );
}

export default Sidebar;