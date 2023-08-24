"use client";

import BarCharts from "@/components/tremor/BarChart";
import DonutCharts from "@/components/tremor/DonutChart";
import KpiCard from "@/components/tremor/KpiCard";
import LineCharts from "@/components/tremor/LineChart";
import SalesPeopleTable from "@/components/tremor/SalesTable";
import {
  Card,
  Grid,
  Title,
  Text,
  Tab,
  TabList,
  TabGroup,
  TabPanel,
  TabPanels,
  Col,
} from "@tremor/react";
import React from "react";

const page = () => {
  return (
    <main className="px-12 py-12">
      <Title>Dashboard</Title>
      <Text>SOLAURA POWER PVT Ltd</Text>

      <TabGroup className="mt-6">
        <TabList>
          <Tab>Overview</Tab>
          <Tab>Detail</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Grid numItemsMd={2} numItemsLg={3} className="gap-6 mt-6">
              {/* <Card>
               
                <div className="h-28" />
              </Card> */}
              <KpiCard className="w-12"/>
              <KpiCard/>
              <KpiCard/>
              {/* <DonutCharts/> */}
              
            </Grid>
            {/* <div className="mt-6">
              <Card>
                <div className="h-80" />
              </Card>
            </div> */}
            <Grid numItemsMd={2} className="mt-6 gap-6">
        {/* <Card>
          <LineCharts/>
        </Card>

        <Card>
          <div className="h-72" >
            <BarCharts/>
          </div>
        </Card> */}
        <LineCharts/>
        <BarCharts/>
        <Card>
          <BarCharts/>
        </Card>
        <Card>
          <LineCharts/>
        </Card>
        
      </Grid>
          </TabPanel>
          <TabPanel>
            <div className="mt-6">
              <Card>
                {/* <div className="h-96" /> */}
                <SalesPeopleTable/>
              </Card>
              
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </main>
  );
};

export default page;
