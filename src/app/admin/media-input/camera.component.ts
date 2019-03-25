import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-camera',
  template: `
  <span style="color:red;" *ngIf="message">
    {{message}}
  </span>
  <input #file type="file" accept='image/*' (change)="preview(file.files)"  capture="environment" />
  <img [src]="imgURL" height="200" *ngIf="imgURL">
  `,
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements OnInit {
  public imagePath;
  imgURL: any;
  private eventsSubscription: any
  public message: string;
  @Input('reset') reset: Observable<void>;
  @Output('img') img = new EventEmitter<string | ArrayBuffer>();
  constructor() { }

  ngOnInit() {
    this.eventsSubscription = this.reset.subscribe(() => {
      this.imagePath = undefined;
      this.message = undefined;
      this.imgURL = undefined;
    })
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe()
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
      this.img.emit(reader.result)
    }

  }

}
