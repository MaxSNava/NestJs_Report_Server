import type { Content } from "pdfmake/interfaces";
import { DateFormatte } from "../../helpers";

const logo:Content = {
  image: 'src/assets/tucan-code-logo.png',
  width: 100,
  height: 100,
  alignment: 'center',
  margin: [0, 0, 0, 20],
}

const currenDate:Content = {
  text: DateFormatte.getDDMMYYYY(new Date()),
  alignment: 'right',
  margin: [20, 40],
  width: 170
}

interface HeaderOptions {
  title?: string;
  subtitle?: string;
  showLogo?: boolean;
  showDate?: boolean;
}

export const headerSection = (options: HeaderOptions):Content => {
  const { title, subtitle, showLogo=true, showDate=true } = options;

  const headerLogo:Content = showLogo ? logo : '';
  const headerDate:Content = showDate ? currenDate : null;

  const headerTitle:Content = title ? {
    stack: [
      {
        text: title, 
        alignment: 'center',
        margin: [0, 15, 0, 0],
        style: {
          bold: true,
          fontSize: 22
        } 
      },
      {
        text: subtitle, 
        alignment: 'center',
        margin: [0, 15, 0, 0],
        style: {
          bold: true,
          fontSize: 14
        } 
      }
    ]
  } : null;

  return { columns: [ headerLogo, headerTitle, headerDate ] }
}