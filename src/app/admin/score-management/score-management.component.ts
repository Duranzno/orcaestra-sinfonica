import { Component, OnInit, ViewChild } from '@angular/core';
import { IScoreId } from 'src/app/core/models';
import { Subscription, Observable, merge } from 'rxjs';
import { OrcaState, From } from 'src/app/core/store';
import { Store } from '@ngrx/store';
import { FirebaseService } from 'src/app/core/services';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { startWith, switchMap, map } from 'rxjs/operators';
import { DataScore } from 'src/app/core/models/data.score.model';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { ScoreEditDialog } from 'src/app/shared/components';
// interface CategTable { nombre: string; n?: number; blurb?: string };
@Component({
  selector: 'app-score-management',
  templateUrl: './score-management.component.html',
  styleUrls: ['./score-management.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ScoreManagementComponent implements OnInit {
  dataSource: Observable<DataScore[]>;
  isLoadingResults: boolean = false;
  resultsLength = 0;
  expandedElement: DataScore | null;
  EditedDScore: DataScore;
  // 'its', 'obra', "extraInfo", "almacenamiento", "media",

  columns: string[] = ['its', 'obra', 'extraInfo', 'generos', 'media', 'instrumentos', 'gente', 'almacenamiento', 'id'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private store: Store<OrcaState>,
    private fb: FirebaseService,
    public dialog: MatDialog
  ) { }
  edit(uid): void {
    const dialogRef = this.dialog.open(ScoreEditDialog, {
      data: this.EditedDScore,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.updateDataSource();
    });
  }

  ngOnInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.updateDataSource();
  }
  updateDataSource() {
    this.dataSource = merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.fb.getScoreList();
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.resultsLength = data.length;
          // return data;
          return data.map(i => new DataScore(i));
        })
      );
  }

}

