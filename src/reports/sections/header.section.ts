import type { Content } from "pdfmake/interfaces";
import { DateFormatte } from "../../helpers";

const logo: Content = {
  image: 'src/assets/tucan-code-logo.png',
  width: 100,
  height: 100,
  alignment: 'center',
  margin: [0, 0, 0, 20],
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
  const headerDate:Content = showDate ? {
    text: DateFormatte.getDDMMYYYY(new Date()),
    alignment: 'right',
    margin: [0, 0, 0, 20],
  }: null;

  return {
    columns: [
      headerLogo,
      headerDate,
    ],
  }
}