import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-camera',
  template: `
  <h3>Angular 7 Image Preview before Upload:</h3>
  <span style="color:red;" *ngIf="message">
    {{message}}
  </span>
  <input #file type="file" accept='image/*' (change)="preview(file.files)"  capture="environment" />
  <img [src]="imgURL" height="200" *ngIf="imgURL">
  `,
  styles: []
})
export class CameraComponent implements OnInit {
  public imagePath;
  imgURL: any;
  public message: string;

  constructor() { }

  ngOnInit() {

  }
  preview(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

}
