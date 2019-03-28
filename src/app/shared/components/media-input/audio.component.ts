import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-audio',
  template: `
  <input type="file" accept="audio/*" capture>

  `,
  styles: []
})
export class AudioComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
