
import firebase from 'firebase';
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export const craftString = (message) => {
  
    message = message.split("%").join("%25")
    message = message.split("&").join("%26")
    message = message.split("=").join("%3D")
    message = message.split("?").join("%3F")
    message = message.split("#").join("%23")
    message = message.split(":").join("%3A")
    message = message.split("/").join("%2F")
    console.log(message)
    return message;
}

export async function createPDF() {
    const url = "https://firebasestorage.googleapis.com/v0/b/firebasefinallyjuan.appspot.com/o/factura-001204-listosoftware.pdf?alt=media&token=95cfac58-2ae0-41db-9449-f2e186a5ebf1"
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())
    const pdfDoc = await PDFDocument.load(existingPdfBytes)
    var returnURL = "";
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

    const pages = pdfDoc.getPages()
    const firstPage = pages[0]
    const { width, height } = firstPage.getSize();

    var baseX = 205;
    var baseY = 339;

    const hourX = baseX + 310;
    const hourY = baseY + 14;

    const pdfBytes = await pdfDoc.save();
    var storageRef = firebase.storage().ref();
    const stringDate = "factura-listosoftware";

    var file2write = storageRef.child(stringDate+'.pdf')
    await file2write.put(pdfBytes).then(function (snapshot) {
        file2write.getDownloadURL().then(function (url) {
            return url;
        })
    }
        )
}