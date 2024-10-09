/* eslint-disable max-lines */
import { url } from '@/lib/data';
import ApexCharts from 'apexcharts';

let dataset = null;

if (document.getElementById('main-chart')) {
  dataset = document.getElementById('main-chart').dataset.datasetId;
}

let data = null;

if (dataset) {
  const response = await fetch(url(`datasets/${dataset}/api/submissions-metrics?dataset-id=${dataset}`), {
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
  const metricNames = ['precision', 'accuracy', 'recall', 'f1', 'aoc_roc', 'aoc_pr'];
  const series = metricNames.map((metric) => ({
    name: metric.replace(/_/g, ' '),
    data: data.map((item) => ({
      x: item.title,
      y: item[metric],
    })),
  }));
  // const series = data.flatMap((item) =>
  //   Object.keys(item)
  //     .filter((key) => key !== 'title')
  //     .map((metric) => ({
  //       name: metric,
  //       data: { x: item.title, y: item[metric] },
  //     }))
  // );
  return {
    series: series,
    chart: {
      height: 350,
      type: 'heatmap',
    },
    dataLabels: {
      enabled: false,
    },
    colors: ['#FF4F00'],
    title: {
      text: 'Submission metrics',
    },
  };
};

if (document.getElementById('main-chart')) {
  if (data.length > 0) {
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
