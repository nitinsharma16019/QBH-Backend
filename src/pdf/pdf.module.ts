import { Module } from '@nestjs/common';
import { PdfController } from './pdf.controller';
import { PdfService } from './pdf.service';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [PdfController],
  providers: [PdfService,UserService]
})
export class PdfModule {}
