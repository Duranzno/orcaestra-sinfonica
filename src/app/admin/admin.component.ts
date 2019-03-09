import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrcaState, From } from '../core/store';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
@Component({
  selector: 'app-admin',
  template: `
  <h1>admin component</h1>
  <button mat-raised-button (click)="toUpload()">
  Cargar Partituras
  </button>
`,
  styleUrls: []
})
export class AdminComponent implements OnInit {
  constructor(
    private router: Router,
    private store: Store<OrcaState>) {

  }
  ngOnInit() {
    // this.store.;

  }
  toUpload() {
    this.router.navigateByUrl('admin/upload');
  }
}
