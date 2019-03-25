import { Injectable } from '@angular/core';
import * as jsPDF from 'jspdf';

const LETTER_PAPER_WIDTH = 21.59;
const LETTER_PAPER_HEIGHT = 27.94;

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  doc: jsPDF;
  constructor() {
    this.doc = new jsPDF("portrait", "cm", "letter");
  }
  save(...images) {
    if (!images.length) throw new Error(`No se envio nada ${JSON.stringify(images)}`)
    if (images.length > 4) throw new Error(`Demasiadas imagenes ${JSON.stringify(images)}`)
    let height = LETTER_PAPER_HEIGHT / images.length;
    images.forEach((img, i) => {
      const start_y = (i) * height;
      const end_y = (i + 1) * height;
      this.doc.addImage(img, 'JPEG', 0, start_y, LETTER_PAPER_WIDTH, end_y)
    })
    this.doc.save('a.pdf')
  }

}
