import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from 'src/printer/printer.service';
import { getEmploymentLetterReport, getEmploymentLetterReportById, getHelloWorldReport } from 'src/reports';

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

  employmentLetter(){
    const docDefinition = getEmploymentLetterReport();
    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }

  async employmentLetterById(employeeId: number){
    const employee = await this.employees.findUnique({ where: { id: employeeId } })

    if(!employee) throw new NotFoundException(`Employee with id ${employeeId} not found`);

    const docDefinition = getEmploymentLetterReportById({
      employerName: 'John Doe',
      employerPosition: 'CEO',
      employeeName: employee.name,
      employeePosition: employee.position,
      employeeStartDate: employee.start_date,
      employeeHours: employee.hours_per_day,
      employeeWorkSchedule: employee.work_schedule,
      employerCompany: 'Tucan Code Inc.'
    });
    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }

}
