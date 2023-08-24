import { Card, Title, LineChart } from "@tremor/react";

const chartdata = [
  {
    month: 'Jan',
    "Solar Growth Rate": 2.04,
    "Wind Growth Rate": 1.53,
  },
  {
    month: 'Feb',
    "Solar Growth Rate": 1.96,
    "Wind Growth Rate": 1.58,
  },
  {
    month: 'Mar',
    "Solar Growth Rate": 1.96,
    "Wind Growth Rate": 1.61,
  },
  {
    month: 'Apr',
    "Solar Growth Rate": 1.93,
    "Wind Growth Rate": 1.61,
  },
  {
    month: 'May',
    "Solar Growth Rate": 1.88,
    "Wind Growth Rate": 1.67,
  },
  //...
];

// const dataFormatter = (number) => `${Intl.NumberFormat("us").format(number).toString()}%`;

const LineCharts = () => (
  <Card >
    <Title>Solar/Wind Growth Rates (2021-2023)</Title>
    <LineChart
      className="mt-6"
      data={chartdata}
      index="month"
      categories={["Solar Growth Rate", "Wind Growth Rate"]}
      colors={["teal", "amber"]}
    //   valueFormatter={dataFormatter}
      yAxisWidth={40}
    />
  </Card>
);

export default LineCharts 