import type { TDocumentDefinitions } from "pdfmake/interfaces";
import { getDonutChart } from "./charts/donut.chart";
import { headerSection } from "./sections/header.section";

interface TopCountry {
  country: string;
  costumers: number;
}

interface ReportOptions {
  title?: string;
  subtitle?: string;
  topCountries: TopCountry[];
}



export const getStatisticsReport = async(options:ReportOptions): Promise<TDocumentDefinitions> => {

  const { title, subtitle, topCountries } = options;
  const donutChart = await getDonutChart({
    entries: topCountries.map(c => ({label: c.country, value: c.costumers})),
    position: 'left'
  })

  const docDefinition: TDocumentDefinitions = {
    pageMargins: [40, 100, 40, 60],
    header: headerSection({title}),
    content: [
      {
        columns: [
          {
            stack: [
              {
                text: '10 Most Popular Countries',
                alignment: 'center',
                margin: [0, 0, 0, 10],
              },
              {
                image: donutChart,
                width: 250
              },
            ]
          },
          {
            layout: 'lightHorizontalLines',
            width: 'auto',
            table: {
              headerRows: 1,
              widths: [100, 'auto'],
              body: [
                ['Country', 'Costumers'],
                ...topCountries.map(c => [c.country, c.costumers])
              ]
            }
          }
        ]
      }
    ]
  };

  return docDefinition;
}