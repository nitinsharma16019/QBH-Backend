import { Controller, Get, NotFoundException, Param, Post, Res} from '@nestjs/common';
import { PdfService } from './pdf.service';
import { Response } from 'express';
import { UserService } from 'src/user/user.service';

@Controller('pdf')
export class PdfController {

    constructor(private pdfService:PdfService,private userService:UserService){}
    
    @Post('generate')
    async generatePdf(@Res() res: Response): Promise<void> {
        const pdfId = await this.pdfService.generatePdf(this.userService.users);
        res.json({ pdfId });
    }

    @Get('download/:id')
    async downloadPdf(@Param('id') id: string, @Res() res: Response): Promise<void> {
        const pdfBytes = this.pdfService.getPdf(id);
        if (!pdfBytes) {
            throw new NotFoundException('PDF not found');
        }
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename=${id}.pdf`,
        });
        res.send(Buffer.from(pdfBytes));
    }

    @Get('list')
    async listPdfs(@Res() res: Response): Promise<void> {
        const pdfList = this.pdfService.listPdfs();
        res.json(pdfList);
    }
}
