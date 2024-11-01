import * as Utils from 'src/helpers/chart-utils';

interface DonutEntry {
  label: string;
  value: number;
}

interface DonutOptions {
  entries: DonutEntry[];
  position?: 'top' | 'right' | 'bottom' | 'left';
}

export const getDonutChart = async(options:DonutOptions):Promise<string> => {

  const {entries, position='top'} = options;

  const data = {
    labels: entries.map(e => e.label),
    datasets: [
      {
        label: 'Dataset 1',
        data: entries.map(e => e.value),
        backgroundColor: Object.values(Utils.CHART_COLORS)
      }
    ]
  };
  
  const config = {
    type: 'doughnut',
    data: data,
    options: {
      legend: {
        position: position
      },
      plugins: {
        datalabels: {
          color: 'white',
          font: {
            weight: 'bold',
            size: 14
          }
        }
      }
    }
  };

  return Utils.chartJsToImage(config);
}