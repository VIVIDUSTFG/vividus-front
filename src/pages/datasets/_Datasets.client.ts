/* eslint-disable max-lines */
import { url } from '@/lib/data';
import ApexCharts from 'apexcharts';

let result = null;

const response = await fetch(url('datasets/api/submissions-chart'), {
  method: 'GET',
});

if (response.ok) {
  const body = await response.json();
  if (response.body) {
    result = body;
  }
}

console.log(result);

const getMainChartOptions = () => {
  return {
    chart: {
      height: '350',
      type: 'bar',
    },
    series: [
      {
        name: 'Number of submissions',
        data: result.map((item) => ({
          x: item.dataset_title,
          y: item.number_of_submissions,
        })),
      },
    ],
    colors: ['#FF4F00'],
    yaxis: {
      min: 0, // Starting from 0
      tickAmount: Math.max(...result.map((item) => item.number_of_submissions)),
      labels: {
        formatter: function (val) {
          return Math.round(val);
        },
      },
    },
    xaxis: {
      type: 'category',
    },
    title: {
      text: 'Number of submissions per dataset',
    },
  };
};

if (document.getElementById('main-chart')) {
  if (result.length > 0) {
    const chart = new ApexCharts(document.getElementById('main-chart'), getMainChartOptions());
    chart.render();

    // init again when toggling dark mode
    document.addEventListener('dark-mode', () => {
      chart.updateOptions(getMainChartOptions());
    });
  } else {
    document.getElementById('main-chart').innerHTML = 'No data available';
  }
}
