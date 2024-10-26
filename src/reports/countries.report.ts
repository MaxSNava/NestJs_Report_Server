import { TDocumentDefinitions } from "pdfmake/interfaces";
import { headerSection } from "./sections/header.section";
import { countries as Country } from "@prisma/client";
import { footerSection } from "./sections/footer.section";

interface ReportOptions {
  title?: string;
  subtitle?: string;
  countries: Country[];
}

export const getCountriesReport = ( options:ReportOptions ):TDocumentDefinitions => {

  const { title, subtitle, countries } = options;

  return {
    pageOrientation: 'landscape',
    header: headerSection({
      title: 'Countries Report',
      subtitle: 'List of countries and their details',
    }),
    footer: footerSection,
    pageMargins: [40, 110, 40, 60],
    content: [
      {
        layout: 'customLayout',
        table: {
          headerRows: 1,
          widths: [50, 'auto', 50, 50, 'auto', '*'],
          body: [
            ["ID", "Name", "ISO2", "ISO3", "Local Name", "Continent"],
            ...countries.map( (country) => [
              country.id.toString(),
              country.name,
              country.iso2,
              country.iso3,
              { text: country.local_name, bold: true },
              country.continent
            ])
          ]
        }
      },
      {
        text: 'Total',
        style: {
          fontSize: 18,
          bold: true,
          margin: [0, 40, 0, 0]
        }
      },
      {
        layout: 'noBorders',
        table: {
          headerRows: 1,
          body: [
            [
              { text: 'Total countries' },
              { text: countries.length.toString() },
            ]
          ]
        }
      }
    ]
  };
}