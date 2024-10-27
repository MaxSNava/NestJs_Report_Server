import * as fs from 'fs';
import type { TDocumentDefinitions } from "pdfmake/interfaces";
import * as Utils from "../helpers/chart-utils";

const svgContent = fs.readFileSync('src/assets/ford.svg', 'utf8');

// Chart Image
const generateChartImage = async () => {
  const chartConfig = {
    type: 'bar',
    data: {
      labels: [2012, 2013, 2014, 2015, 2016],
      datasets: [{
        label: 'Sales',
        data: [650, 590, 800, 810, 560]
      }]
    }
  }

  //return chartJsToImage(chartConfig, {height: 10, width: 10});
  return Utils.chartJsToImage(chartConfig);
}

const generateDonutChartImage = async () => {

  const DATA_COUNT = 5;
  const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

  const data = {
    labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
    datasets: [
      {
        label: 'Dataset 1',
        data: Utils.numbers(NUMBER_CFG),
        backgroundColor: Object.values(Utils.CHART_COLORS),
      }
    ]
  }

  const chartConfig = {
    type: 'doughnut',
    data: data,
    options: {
      title: {
        display: true,
        text: 'Chart.js Doughnut Chart'
      }
    }
  };

  return Utils.chartJsToImage(chartConfig);
}

export const getBasicChartSvgReport = async (): Promise<TDocumentDefinitions> => {

  //const chart = await generateChartImage();
  //const donutChart = await generateDonutChartImage();
  const [chart, donutChart] = await Promise.all([generateChartImage(), generateDonutChartImage()]);

  return {
    content: [
      {
        svg: svgContent,
        width: 100,
      },
      {
        image: chart,
        width: 500
      },
      {
        image: donutChart,
        width: 500
      }
    ]
  }
}