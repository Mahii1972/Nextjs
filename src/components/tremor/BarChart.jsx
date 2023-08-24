import { Card, Title, BarChart, Subtitle } from "@tremor/react";

const chartdata2 = [
  {
    year: "2022",
    "Solar": 890,
    "Wind": 338,
    
  },
  {
    year: "2023",
    "Solar": 289,
    "Wind": 233,
    
  },
];

const dataFormatter = (number) => {
  return  number + " MW";
};

const BarCharts = () => (
  <Card>
    <Title>Annual Energy Generation</Title>
    <BarChart
      className="mt-6"
      data={chartdata2}
      index="year"
      categories={["Solar", "Wind"]}
      colors={["teal", "amber",]}
      valueFormatter={dataFormatter}
      yAxisWidth={48}
    />
  </Card>
);

export default BarCharts