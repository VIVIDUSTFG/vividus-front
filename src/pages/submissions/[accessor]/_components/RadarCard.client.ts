/* eslint-disable max-lines */
import { url } from '@/lib/data';
import ApexCharts from 'apexcharts';

let submissionId = null;

if (document.getElementById('radar-chart')) {
  submissionId = document.getElementById('radar-chart').dataset.submissionId;
}

let data = null;

if (submissionId) {
  const response = await fetch(url(`submissions/${submissionId}/api/radar-chart?submission-id=${submissionId}`), {
    method: 'GET',
  });

  if (response.ok) {
    const body = await response.json();
    if (response.body) {
      data = body;
    }
  }
}

const getMainChartOptions = () => {
  if (!data) return {};
  const keys = Object.keys(data).filter((key) => key !== 'title');
  const values = Object.keys(data)
    .filter((key) => key !== 'title')
    .map((key) => data[key]);
  return {
    series: [
      {
        name: data.title,
        data: values,
      },
    ],
    chart: {
      height: 350,
      type: 'radar',
    },
    colors: ['#FF4F00'],
    title: {
      text: 'Average Metrics',
    },
    yaxis: {
      stepSize: 0.1,
    },
    xaxis: {
      categories: keys,
    },
  };
};

if (document.getElementById('radar-chart')) {
  if (data !== null) {
    const chart = new ApexCharts(document.getElementById('radar-chart'), getMainChartOptions());
    chart.render();

    // init again when toggling dark mode
    document.addEventListener('dark-mode', () => {
      chart.updateOptions(getMainChartOptions());
    });
  } else {
    document.getElementById('radar-chart').innerHTML = 'No data available';
  }
}
