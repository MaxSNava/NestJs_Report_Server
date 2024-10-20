import { Injectable } from '@nestjs/common';
import PdfPrinter from 'pdfmake'; // TODO: Optimizar después
import { BufferOptions, TDocumentDefinitions } from 'pdfmake/interfaces';

const fonts = {
  Roboto: {
    normal: 'fonts/Roboto-Regular.ttf',
    bold:   'fonts/Roboto-Bold.ttf',
    italic: 'fonts/Roboto-Italic.ttf',
    bolditalic: 'fonts/Roboto-BoldItalic.ttf'
  }
}

@Injectable()
export class PrinterService {

  private printer = new PdfPrinter(fonts);

  createPdf(docDefinition: TDocumentDefinitions, options: BufferOptions = {} ): PDFKit.PDFDocument {
    return this.printer.createPdfKitDocument(docDefinition, options);
  }

}
