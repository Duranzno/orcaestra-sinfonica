import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: []
})
export class WelcomeComponent {
  constructor() { }

  show(files) { console.log('admin/upload', files); }

}
