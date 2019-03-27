import { Injectable, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';



@Injectable({
  providedIn: 'root',
})
export class PdfService implements OnInit {
  public docSize: number;
  LETTER_PAPER_HEIGHT;
  LETTER_PAPER_WIDTH;
  private doc: jsPDF;
  ngOnInit(): void {

  }
  constructor() {
    this.doc = new jsPDF("portrait", "cm", "letter")
    this.docSize = 0;
    this.LETTER_PAPER_HEIGHT = this.doc.internal.pageSize.getHeight();
    this.LETTER_PAPER_WIDTH = this.doc.internal.pageSize.getWidth();

  }

  addImages(...images) {
    try {
      if (!images.length)
        throw new Error(`No se envio nada ${JSON.stringify(images)}`)
      if (images.length > 4)
        throw new Error(`Demasiadas imagenes ${JSON.stringify(images)}`)

      let height = this.LETTER_PAPER_HEIGHT / images.length;
      images.forEach((img, i, arr) => {
        const start_y = (i) * height;
        const end_y = (i + 1) * height;
        if (arr.length === i + 1) {
         return this.doc.addImage(img, 'JPEG', 0, start_y, this.LETTER_PAPER_WIDTH, this.LETTER_PAPER_HEIGHT)
        }
        this.doc.addImage(img, 'JPEG', 0, start_y, this.LETTER_PAPER_WIDTH, end_y)
      })
      this.docSize++;
    } catch (error) {
      this.doc = new jsPDF("portrait", "cm", "letter");
      this.doc.addImage(images.pop(), 'JPEG', 0, 0, this.LETTER_PAPER_WIDTH, this.LETTER_PAPER_HEIGHT)
      console.log(error)
    }
  }
  addPage() {
    this.doc.addPage('letter', 'p')
  }
  save(title: string) {
    this.doc.save(`${title}.pdf`)
  }
}
