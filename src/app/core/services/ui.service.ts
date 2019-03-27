import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';

@Injectable()
export class UIService {
  loadingStateChanged = new Subject<boolean>();
  constructor(private snackbar: MatSnackBar) { }

  showSnackbar(message: string, duration: number, action?: string) {
    this.snackbar.open(message, action, {
      duration: duration * 1000
    });
  }
}
