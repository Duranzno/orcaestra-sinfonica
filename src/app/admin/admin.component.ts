import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: []
})
export class AdminComponent implements OnInit {
  constructor(
    private router: Router) {

  }
  ngOnInit() {
  }
  toUpload() {
    this.router.navigateByUrl('admin/upload');
  }
}
