import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OpenSheetMusicDisplay } from 'opensheetmusicdisplay';

@Injectable({
  providedIn: 'root'
})
export class OsmdService {
  private osmd: OpenSheetMusicDisplay;

  constructor(private http: HttpClient) { }
  setup(url) {
    const container = document.getElementById('osmd');
    console.log(container);
    this.osmd = new OpenSheetMusicDisplay(container, { autoResize: true });
    // tslint:disable-next-line:max-line-length
    this.loadMusicXML(url);
  }
  loadMusicXML(url) {
    const ethis = this;
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      switch (xhttp.readyState) {
        case 0: // UNINITIALIZED
          console.log('uninitialized');
          break;
        case 1: // LOADING
          console.log('loading');
          break;
        case 2: // LOADED
          console.log('loaded');
          break;
        case 3: // INTERACTIVE
          console.log('interactive');
          break;
        case 4: // COMPLETED
          ethis.osmd.load(xhttp.response);

          ethis.osmd.render();
          console.log('completed');
          console.log(xhttp.responseXML);
          console.log(xhttp);
          break;
        default:
          throw new Error(('Error loading MusicXML.'));
      }
    };
    xhttp.open('GET', url, true);
    xhttp.send();
  }
}
