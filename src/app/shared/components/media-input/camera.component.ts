import { Component, OnInit, Output, EventEmitter, Input, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-camera',
  template: `
    <div class="camera" (click)="click()">
      <input 
       #file [id]="cid" type="file" accept='image/*' (change)="preview(file.files)"  capture="environment" />
      <div class="container">
      <img [src]="imgURL" height="200" class="image" *ngIf="imgURL"  style="width:100%">
        <div class="middle">
          <div class="text" >{{text}}</div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements OnInit {
  public imagePath;
  @ViewChild('file') someInput: ElementRef;
  imgURL: any;
  private eventsSubscription: any
  public message: string;
  @Input('cid') cid: string;
  @Input('text') text: string;
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
  click() { this.someInput.nativeElement.click(); }

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
