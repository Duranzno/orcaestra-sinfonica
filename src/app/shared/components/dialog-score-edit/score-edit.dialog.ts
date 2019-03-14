import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataScore } from 'src/app/core/models/data.score.model';

@Component({
  selector: 'app-dialog-score-edit',
  template: `
  <h1 mat-dialog-title>Hi</h1>
<div mat-dialog-content>
  <p>What's your favorite animal?</p>
  <mat-form-field>
  </mat-form-field>
</div>
<div mat-dialog-actions>
  <button mat-button (click)="onNoClick()">No Thanks</button>
  <button mat-button [mat-dialog-close]="data" cdkFocusInitial>Ok</button>
</div>
  `,
  styleUrls: ['./score-edit.dialog.scss']
})
export class ScoreEditDialog implements OnInit {

  constructor(public dialogRef: MatDialogRef<ScoreEditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DataScore) { }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
