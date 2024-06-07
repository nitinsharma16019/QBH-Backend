import { Get, Injectable } from '@nestjs/common';
import { PDFDocument} from 'pdf-lib';
import * as fs from 'fs';

@Injectable()
export class PdfService {
    private pdfs: { id: string, data: Uint8Array }[] = [];

    async generatePdf(users: any[]): Promise<string> {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage();
        const { width, height } = page.getSize();
        const fontSize = 12;
        page.drawText('User Data', { x: 50, y: height - 50, size: 24 });
        let yOffset = height - 100;
        users.forEach(user => {
            page.drawText(`Name: ${user.name}`, { x: 50, y: yOffset, size: fontSize });
            page.drawText(`Email: ${user.email}`, { x: 50, y: yOffset - 20, size: fontSize });
            page.drawText(`Phone: ${user.phone}`, { x: 50, y: yOffset - 40, size: fontSize });
            page.drawText(`Address: ${user.address}`, { x: 50, y: yOffset - 60, size: fontSize });
            yOffset -= 80;
        });

        const pdfBytes = await pdfDoc.save();
        const pdfId = `${Date.now()}`;
        this.pdfs.push({ id: pdfId, data: pdfBytes });
        return pdfId;
    }

    getPdf(id: string): Uint8Array | null {
        const pdf = this.pdfs.find(p => p.id === id);
        return pdf ? pdf.data : null;
    }

    listPdfs(): { id: string }[] {
        return this.pdfs;
    }
}
