import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import ChartDataLabels from "chartjs-plugin-datalabels";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend, 
  ChartDataLabels
);

const BarChart = ({ chartData }) => {

  const chartOptions = {
    plugins: {
      title: {
        display: true,
        text: "Temperature records"
      },
      legend: {
        display: true,
        position: "bottom"
      },
      datalabels: {
        display: true,
        color: 'black'
      }
    }
  };

  return (
    <div>
      <Bar
        data={chartData}
        options={chartOptions}
      />
    </div>
  );
};

export default BarChart;