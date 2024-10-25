import type { StyleDictionary, TDocumentDefinitions } from "pdfmake/interfaces";
import { headerSection } from "./sections/header.section";
import { DateFormatte } from "../helpers";

const style: StyleDictionary = {
  header: {
    bold: true,
    fontSize: 22,
    alignment: 'center',
    margin: [0, 60, 0, 20],
  },
  body: {
    alignment: 'justify',
    margin: [0, 0, 0, 70],
  },
  signature: {
    fontSize: 14,
    bold: true,
  },
  footer: {
    fontSize: 10,
    alignment: 'center',
    margin: [0, 0, 0, 20],
  },
};

interface ReportOptions {
  employerName: string;
  employerPosition: string;
  employeeName: string;
  employeePosition: string;
  employeeStartDate: Date;
  employeeHours: number;
  employeeWorkSchedule: string;
  employerCompany: string;
}


export const getEmploymentLetterReportById = (values: ReportOptions):TDocumentDefinitions => {

  const { employerName, employerPosition, employeeName, employeePosition, employeeStartDate, employeeHours, employeeWorkSchedule, employerCompany } = values;

  const docDefinition: TDocumentDefinitions = {
    styles: style,
    pageMargins: [40, 60, 40, 60],
    header: headerSection({}),
    content: [
      {
        text: 'CONSTANCIA DE EMPLEO',
        style: 'header',
      },
      {
        text: `Yo, ${employerName}, en mi calidad de ${employerPosition} de ${employerCompany}, por medio de la presente certifco que ${employeeName} ha sido empleado en nuestra empresa desde el ${DateFormatte.getDDMMYYYY(employeeStartDate)}.\n\n
              Durante su empleo, el Sr./Sra. ${employeeName} ha desempeñado el cargo de ${employeePosition}, demostrando responsabilidad, compromiso y habilidades profesionales en sus labores.\n\n
              La jornada laboral del Sr./ Sra. ${employeeName} es de ${employeeHours} horas semanales, con un horario de ${employeeWorkSchedule}, cumpliendo con las políticas y procedimientos establecidos por la empresa.\n\n
              Esta constancia se expide a solicitud del interesado para los fnes que considere conveniente.\n\n`,
        style: 'body'
      },
      {
        text: `Atentamente`,
        style: 'signature',
      },
      {
        text: `${employerName}`,
        style: 'signature',
      },
      {
        text: `${employerPosition}`,
        style: 'signature',
      },
      {
        text: `${employerCompany}`,
        style: 'signature',
      },
      {
        text: `${DateFormatte.getDDMMYYYY(new Date())}`,
        style: 'signature',
      },
    ],
    footer: {
      text: `Este documento es una constancia de empleo y no representa un compromiso laboral.`,
      style: 'footer',
    }
};

  return docDefinition;
};