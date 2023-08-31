import KwhLineChart from '../components/linechart';
import StackedBar from '../components/StackedBarChart';
import ProgressBar from '../components/ProgressBar';
import QuarterProgress from '../components/QuarterProgressBar';

export default function Home() {
  return (
    <div className="p-8 bg-white">
      <h1 className="text-2xl font-bold mb-5">Predicted Kwh vs Actual Kwh</h1>
      <KwhLineChart className="mb-10"/>
      <h1 className="text-2xl font-bold mb-5">Actual vs Issued Kwh</h1>
      <StackedBar className="mb-10"/>
      <h1 className="text-2xl font-bold mb-5">Predicted vs Committed Progress</h1>
      <ProgressBar className="mb-10"/>
      <h1 className="text-2xl font-bold mb-5">Quarterly Progress</h1>
      <QuarterProgress className="mb-10"/>
    </div>
  );
}
