import { Component, OnInit, Input } from '@angular/core';
import { Media } from 'src/app/core/models';

@Component({
  selector: 'app-midi',
  template: `
    <p>
      midi works!
    </p>
  `,
  styleUrls: ['./media.card.component.scss']
})
export class MidiComponent implements OnInit {
  @Input('media') media: Media;

  constructor() { }

  ngOnInit() {
  }

}
