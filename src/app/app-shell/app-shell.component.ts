import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-shell',
  template: `
    < img src = "/assets/art/orcas.gif" alt = "" class= "loading" >
  `,
  styles: [`
    .loading{
      height:300px;
      margin 0 auto;
    }`]
})
export class AppShellComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
