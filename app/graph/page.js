"use client"
import React from 'react';
import KwhLineChart from '@/components/linechart';
import TwoBarsPerMonth from '@/components/StackedBarChart';
import CircularProgressBar from '@/components/ProgressBar';
import QuarterProgress from '@/components/QuarterProgressBar';
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";
import { CardCommitted, CardIssued, CardDevices } from '@/components/cards';



export default function Home() {
  const tabsData = [
    { 
        value: 'kwh',
        label: 'Predicted Kwh vs Actual Kwh',
        component: KwhLineChart
    },
    { 
        value: 'issued',
        label: 'Actual vs Issued Kwh',
        component: TwoBarsPerMonth
    },
    { 
        value: 'committed',
        label: 'Predicted vs Committed Progress',
        component: CircularProgressBar
    },
    { 
        value: 'quarterly',
        label: 'Quarterly Progress',
        component: QuarterProgress
    }
  ];

  return (
    <div className="p-8 bg-white">
        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
        <CardCommitted />
      <CardIssued />
      <CardDevices />
      </div>
        <Tabs color="teal" variant="rounded" defaultValue='kwh'>
            <TabsHeader>
                {tabsData.map(({ value, label }) => (
                    <Tab key={value} value={value}>{label}</Tab>
                ))}
            </TabsHeader>
            <TabsBody>
                {tabsData.map(({ value, component: Component }) => (
                    <TabPanel key={value} value={value}>
                        <Component className="mb-10"/>
                    </TabPanel>
                ))}
            </TabsBody>
        </Tabs>
    </div>
  );
};