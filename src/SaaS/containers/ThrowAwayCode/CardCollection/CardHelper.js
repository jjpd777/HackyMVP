
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export const prepare2WritePDF = async(props)=>{
    const url = "https://firebasestorage.googleapis.com/v0/b/firebasefinallyjuan.appspot.com/o/factura-001204-listosoftware.pdf?alt=media&token=95cfac58-2ae0-41db-9449-f2e186a5ebf1"
        const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())
        const pdfDoc = await PDFDocument.load(existingPdfBytes)
        
        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

        const pages = pdfDoc.getPages()
        const firstPage = pages[0]
        const { width, height } = firstPage.getSize();
        var baseX = 205;
        var baseY = 339;

        const hourX = baseX + 310;
        const hourY = baseY + 14;

        firstPage.drawText("10-10-2049", {
          x: hourX,
          y: height / 2 + hourY,
          size: 7,
          font: helveticaFont,
          color: rgb(0.1, 0.1, 0.1),
        })
        const pdfBytes = await pdfDoc.save();

      return pdfBytes;
}