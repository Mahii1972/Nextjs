import { Card, Title, DonutChart } from "@tremor/react";

const cities = [
  {
    name: "Solar",
    sales: 9800,
  },
  {
    name: "Wind",
    sales: 4567,
  },
//   {
//     name: "Hong Kong",
//     sales: 3908,
//   },
//   {
//     name: "San Francisco",
//     sales: 2400,
//   },
//   {
//     name: "Singapore",
//     sales: 1908,
//   },
//   {
//     name: "Zurich",
//     sales: 1398,
//   },
];

const valueFormatter = (number) => `$ ${Intl.NumberFormat("in").format(number).toString()}`;

 const DonutCharts = () => {

    return (
        <Card className="max-w-lg">
          <Title>Sales</Title>
          <DonutChart
            className="mt-6"
            data={cities}
            category="sales"
            index="name"
            valueFormatter={valueFormatter}
            colors={["rose", "cyan", "amber"]}
          />
        </Card>
      );
} 

export default DonutCharts