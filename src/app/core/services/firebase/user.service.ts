import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Injectable()
export class UserService {
  constructor(private db: AngularFirestore) { }
}