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
        <Typography variant="h5" color="gray">Menu</Typography>
        <List>
          <ListItem color="lightBlue">
            <Link href="/">Homepage</Link>
          </ListItem>
          <ListItem color="lightBlue">
            <Link href="/database">Uploads</Link>
          </ListItem>
          <ListItem color="lightBlue">
            <Link href="/graph">See Graph</Link>
          </ListItem>
          <ListItem color="lightBlue">
            <Link href="/pst">Table</Link>
          </ListItem>
          <ListItem color="lightBlue">
            <Link href="/database/form">Data registration Form</Link>
          </ListItem>
          <ListItem color="lightBlue">
            <Link href="/logout">Log out</Link>
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