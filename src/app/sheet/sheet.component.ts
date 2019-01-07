import { Component, OnInit } from '@angular/core';
import { OpenSheetMusicDisplay } from "opensheetmusicdisplay";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: []
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
	this.loadMusicXML("https://raw.githubusercontent.com/opensheetmusicdisplay/opensheetmusicdisplay/develop/test/data/ActorPreludeSample.xml");
	}
 	loadMusicXML(url) {
 		let ethis=this;    
		let xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function () {
			switch (xhttp.readyState) {
				case 0: // UNINITIALIZED
					console.log("uninitialized");
					break;
				case 1: // LOADING
					console.log("loading");
					break;
				case 2: // LOADED
					console.log("loaded");
					break;
				case 3: // INTERACTIVE
					console.log("interactive");
					break;
				case 4: // COMPLETED
					// ethis.osmd.load(xhttp.response);
					// ethis.osmd.render();
					// console.log("completed");
					// console.log(xhttp.responseXML);
					// console.log(xhttp);
					break;
				default:
				throw ("Error loading MusicXML.");
			}
		};
		xhttp.open("GET", url, true);
		xhttp.send();
   }
}
