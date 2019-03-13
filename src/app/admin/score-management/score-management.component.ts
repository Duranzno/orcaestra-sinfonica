import { Component, OnInit, ViewChild } from '@angular/core';
import { IScoreId } from 'src/app/core/models';
import { Subscription, Observable, merge } from 'rxjs';
import { OrcaState, From } from 'src/app/core/store';
import { Store } from '@ngrx/store';
import { FirebaseService } from 'src/app/core/services';
import { MatPaginator, MatSort } from '@angular/material';
import { startWith, switchMap, map } from 'rxjs/operators';
import { DataScore } from 'src/app/core/models/data.score.model';
// interface CategTable { nombre: string; n?: number; blurb?: string };
@Component({
  selector: 'app-score-management',
  templateUrl: './score-management.component.html',
  // styles: ['./score-management.component.scss']
})
export class ScoreManagementComponent implements OnInit {
  dataSource: Observable<DataScore[]>;
  isLoadingResults: boolean = false;
  resultsLength = 0;
  // 'its', 'obra', 'generos', "extraInfo", "almacenamiento", "media", 

  columns: string[] = ["generos", "almacenamiento", "media", "instrumentos", "gente", "id"];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private store: Store<OrcaState>,
    private fb: FirebaseService,
  ) { }
  edit(uid) {
    alert(JSON.stringify(uid));
  }
  ngOnInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.dataSource = merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.fb.fetchScoreList();
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.resultsLength = data.length;
          // return data;
          return data.map(i => new DataScore(i))
        })
      );
  }

}

