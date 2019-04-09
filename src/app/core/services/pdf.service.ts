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
  resizebase64 = function (base64, maxWidth, maxHeight) {


    // Max size for thumbnail
    if (typeof (maxWidth) === 'undefined') maxWidth = 500;
    if (typeof (maxHeight) === 'undefined') maxHeight = 500;

    // Create and initialize two canvas
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    var canvasCopy = document.createElement("canvas");
    var copyContext = canvasCopy.getContext("2d");

    // Create original image
    var img = new Image();
    img.src = base64;

    // Determine new ratio based on max size
    var ratio = 1;
    if (img.width > maxWidth)
      ratio = maxWidth / img.width;
    else if (img.height > maxHeight)
      ratio = maxHeight / img.height;

    // Draw original image in second canvas
    canvasCopy.width = img.width;
    canvasCopy.height = img.height;
    copyContext.drawImage(img, 0, 0);

    // Copy and resize second canvas to first canvas
    canvas.width = img.width * ratio;
    canvas.height = img.height * ratio;
    ctx.drawImage(canvasCopy, 0, 0, canvasCopy.width, canvasCopy.height, 0, 0, canvas.width, canvas.height);

    return canvas.toDataURL();
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
        // const end_y = (i + 1) * height;
        if (arr.length === i + 1) {
          return this.doc.addImage(img, 'JPEG', 0, start_y, this.LETTER_PAPER_WIDTH, height)
        }
        this.doc.addImage(img, 'JPEG', 0, start_y, this.LETTER_PAPER_WIDTH, height)
      })
      this.docSize++;
    } catch (error) {
      this.doc = new jsPDF("portrait", "cm", "letter");
      this.doc.addImage(images.pop(), 'JPEG', 0, 0, this.LETTER_PAPER_WIDTH, this.LETTER_PAPER_HEIGHT)
      console.log(error)
    }
  }
  reset() {
    this.doc = new jsPDF("portrait", "cm", "letter")
    this.docSize = 0;
  }
  addPage() {
    this.doc.addPage('letter', 'p')
  }
  save(title: string) {
    this.doc.save(`${title}.pdf`)
  }
}
function resizebase64(base64, maxWidth, maxHeight) {


  // Max size for thumbnail
  if (typeof (maxWidth) === 'undefined') maxWidth = 500;
  if (typeof (maxHeight) === 'undefined') maxHeight = 500;

  // Create and initialize two canvas
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  var canvasCopy = document.createElement("canvas");
  var copyContext = canvasCopy.getContext("2d");

  // Create original image
  var img = new Image();
  img.src = base64;

  // Determine new ratio based on max size
  var ratio = 1;
  if (img.width > maxWidth)
    ratio = maxWidth / img.width;
  else if (img.height > maxHeight)
    ratio = maxHeight / img.height;

  // Draw original image in second canvas
  canvasCopy.width = img.width;
  canvasCopy.height = img.height;
  copyContext.drawImage(img, 0, 0);

  // Copy and resize second canvas to first canvas
  canvas.width = img.width * ratio;
  canvas.height = img.height * ratio;
  ctx.drawImage(canvasCopy, 0, 0, canvasCopy.width, canvasCopy.height, 0, 0, canvas.width, canvas.height);

  return canvas.toDataURL();
}