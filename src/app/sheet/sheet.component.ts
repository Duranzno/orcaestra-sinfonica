import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WavesurferService } from './services/wavesurfer.service';
import { OsmdService } from './services/osmd.service';
import { YoutubeService } from './services/youtube.service';
import { OpenSheetMusicDisplay } from 'opensheetmusicdisplay';

@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: []
})
export class SheetComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private ws: WavesurferService,
    public youtube: YoutubeService,
    private osmd: OsmdService) {
    // this.http.get('assets/favicon.ico')
    //   .subscribe(res => console.log(res));
  }

  ngOnInit() {
    const container = document.createElement('div');
    document.body.appendChild(container);
  }

}
