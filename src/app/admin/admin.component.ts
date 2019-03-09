import { Component, OnInit } from '@angular/core';
import { OrcaState } from '../core/store';
import { AuthService, FirebaseService } from '../core/services';
import { Store } from '@ngrx/store';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: []
})
export class AdminComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private store: Store<OrcaState>,
    private fb: FirebaseService,
    private db: AngularFirestore) {

  }
  ngOnInit() {
    this.fb.fetchCateg()
      .subscribe(val => {
        console.log(val);
      });

  }
}
