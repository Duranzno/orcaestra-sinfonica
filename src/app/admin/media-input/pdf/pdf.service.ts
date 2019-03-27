import { Injectable, Inject, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';

import { AppConfig } from 'src/app/app-config';
import { APP_CONFIG } from 'src/app/app.config';

const LETTER_PAPER_WIDTH = 21.59;
const LETTER_PAPER_HEIGHT = 27.94;

@Injectable({
  providedIn: 'root',
})
export class PdfService implements OnInit {
  doc;
  isBrowser;
  ngOnInit(): void {
  }
  constructor(
    @Inject(APP_CONFIG) config: AppConfig) {
    if (config.windowExists) {
      this.doc = new jsPDF("portrait", "cm", "letter");
    }
    else {
      console.log('servidor')
    }
  }

  save(title: string) {
    this.doc.save(`${title}.pdf`)
  }
  addImages(...images) {
    if (!images.length) throw new Error(`No se envio nada ${JSON.stringify(images)}`)
    if (images.length > 4) throw new Error(`Demasiadas imagenes ${JSON.stringify(images)}`)
    let height = LETTER_PAPER_HEIGHT / images.length;
    images.forEach((img, i) => {
      const start_y = (i) * height;
      const end_y = (i + 1) * height;
      this.doc.addImage(img, 'JPEG', 0, start_y, LETTER_PAPER_WIDTH, end_y)
    })
  }
  addPage(...images) {
    this.doc.addPage('letter', 'p')
    this.addImages(images)
  }

}
