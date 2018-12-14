import { Component, OnInit } from '@angular/core';
import { OpenSheetMusicDisplay } from "opensheetmusicdisplay";
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.less']
})
export class SheetComponent implements OnInit {

	osmd: OpenSheetMusicDisplay;
  constructor(private http:HttpClient) {
  	this.http.get('assets/favicon.ico')
  		.subscribe(res=>console.log(res))
  }

  ngOnInit() {
  	var container = document.createElement("div");
  	document.body.appendChild(container);
  	this.osmd = new OpenSheetMusicDisplay(container, { autoResize: false });
  	// this.loadMusicXML("assets/music.xml");
  }
 	loadMusicXML(url) {
 		let ethis=this;
		let xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function () {
			switch (xhttp.readyState) {
				case 0: // UNINITIALIZED
				case 1: // LOADING
				case 2: // LOADED
				case 3: // INTERACTIVE
				break;
				case 4: // COMPLETED
					ethis.osmd.load(xhttp.responseXML);
					ethis.osmd.render();
					break;
				default:
				throw ("Error loading MusicXML.");
			}
		};
		xhttp.open("GET", url, true);
		xhttp.send();
   }
}
