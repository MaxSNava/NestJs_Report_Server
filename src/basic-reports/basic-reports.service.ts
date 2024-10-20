import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from 'src/printer/printer.service';
import { getHelloWorldReport } from 'src/reports';

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    // console.log('Connected to the database');
    await this.$connect();
  }

  constructor(
    private readonly printerService: PrinterService
  ) { super(); }

  hello(){
    const docDefinition = getHelloWorldReport({ name: 'John Doe' });
    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }

}
