import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from 'src/printer/printer.service';
import { orderByIdReport } from 'src/reports';

@Injectable()
export class StoreReportsService extends PrismaClient implements OnModuleInit {
  constructor(
    private readonly printerService: PrinterService
  ) { super(); }

  async onModuleInit() {
    await this.$connect();
  }

  async getOrderByIdReport(orderId: number){
    const order = await this.orders.findUnique({
      where: {order_id: orderId},
      include: {
        customers: true, 
        order_details: {
          include: {
            products: true
          }
        }
      }
    });
    if(!order) throw new NotFoundException('Order not found');
    // console.log(JSON.stringify(order, null, 2));
    const docDefinition = orderByIdReport({data: order as any});
    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }
}
