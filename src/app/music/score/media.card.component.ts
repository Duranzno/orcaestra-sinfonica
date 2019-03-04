import { Component, OnInit, Input } from '@angular/core';
import { Media } from 'src/app/core/models';

@Component({
  selector: 'app-media-card',
  templateUrl: './media.card.component.html',
  styles: []
})
export class MediaCardComponent implements OnInit {
  @Input('media') media: Media;
  constructor() { }

  ngOnInit() {
  }

}
