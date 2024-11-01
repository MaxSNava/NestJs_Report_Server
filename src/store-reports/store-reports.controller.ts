import { Controller, Get, Param, Res } from '@nestjs/common';
import { StoreReportsService } from './store-reports.service';
import { Response } from 'express';

@Controller('store-reports')
export class StoreReportsController {
  constructor(private readonly storeReportsService: StoreReportsService) {}

  @Get('orders/:orderId')
  async getOrderReport(@Param('orderId') orderId: string, @Res() res: Response){
    const pdfDoc = await this.storeReportsService.getOrderByIdReport(+orderId);
    res.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Order_Report';
    pdfDoc.pipe(res);
    pdfDoc.end();
  }

  @Get('svg-chart')
  async getSvgChart(@Res() res: Response){
    const pdfDoc = await this.storeReportsService.getSvgChart();
    res.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'SVG_Chart';
    pdfDoc.pipe(res);
    pdfDoc.end();
  }

  @Get('statistics')
  async statistics(@Res() res: Response){
    const pdfDoc = await this.storeReportsService.getStatistics();
    res.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Statistics';
    pdfDoc.pipe(res);
    pdfDoc.end();
  }
}
