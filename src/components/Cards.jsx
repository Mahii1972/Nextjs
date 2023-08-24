import React from 'react'
import { Card, Text, Metric, Flex, ProgressBar } from "@tremor/react";


const Cards = () => {
  return (
    <div className='flex flex-row'>
    <Card className="max-w-xs mx-auto">
    <Text>Sales</Text>
    <Metric>$ 34,743</Metric>
    <Flex className="mt-4">
      <Text>32% of annual target</Text>
      <Text>$ 225,000</Text>
    </Flex>
    <ProgressBar value={32} className="mt-2" />
  </Card>
      <Card className="max-w-xs mx-auto">
      <Text>Sales</Text>
      <Metric>$ 34,743</Metric>
    </Card>
    </div>
  )
}

export default Cards