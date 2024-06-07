import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { PdfModule } from './pdf/pdf.module';
import { PdfController } from './pdf/pdf.controller';
import { PdfService } from './pdf/pdf.service';

@Module({
  imports: [PdfModule],
  controllers: [UserController,PdfController],
  providers: [UserService,PdfService],
})
export class AppModule {}
