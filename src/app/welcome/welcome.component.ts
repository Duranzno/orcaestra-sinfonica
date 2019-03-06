import { Component, OnInit } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: []
})
export class WelcomeComponent implements OnInit {
  wave: any;

  constructor() {
  }
  ngOnInit(): void {

  }
}
