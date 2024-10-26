import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from 'src/printer/printer.service';
import { getHelloWorldReport } from 'src/reports';

@Injectable()
export class StoreReportsService extends PrismaClient implements OnModuleInit {
  constructor(
    private readonly printerService: PrinterService
  ) { super(); }

  async onModuleInit() {
    await this.$connect();
  }

  async getOrderByIdReport(orderId: string){
    const docDefinition = getHelloWorldReport({ name: orderId });
    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }
}
