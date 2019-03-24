import { Component, OnInit } from '@angular/core';
import { Observable, from } from 'rxjs';
import { IScoreId, CategoriaTipo } from '../core/models';
import { ScoreService } from '../core/services';
import { OrcaState, From } from '../core/store';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-music',
  template: `
  <mat-toolbar color="primary">
  <mat-toolbar-row>
  <mat-select (selectionChange)="goToGroup($event)">
    <mat-option *ngFor="let g of $Grupos|async" [value]="g" (click)="goToGroup(g)">
      {{g}}
    </mat-option>
  </mat-select>
    <span>Second bar</span>
  </mat-toolbar-row>
  </mat-toolbar>
  <mat-tab-group dynamicHeight>
  <mat-tab label="Biblioteca de la Orquesta">
    <ng-template matTabContent>
     <app-music-list [userId]="userId" [scores]="$Scores|async"></app-music-list>
    </ng-template>
  </mat-tab>

  <mat-tab label="Generos">
    <ng-template matTabContent>
     <app-music-list [userId]="userId" [scores]="$filteredScore|async"></app-music-list>

    </ng-template>
  </mat-tab>

  <mat-tab label="Favoritos">
    <ng-template matTabContent>
    <app-music-list [userId]="userId" [scores]="$FavScores|async"></app-music-list>
    </ng-template>
  </mat-tab>  
</mat-tab-group>
  `,
  styleUrls: []
})
export class MusicComponent implements OnInit {

  $Scores: Observable<IScoreId[]> = from([]);
  $FavScores: Observable<IScoreId[]> = from([]);
  $filteredScore: Observable<IScoreId[]> = from([]);
  $Generos: Observable<string[]> = from([]);
  $Grupos: Observable<string[]> = from([]);
  userId: string;
  constructor(
    private fbScore: ScoreService,
    private store: Store<OrcaState>
  ) {

  }
  ngOnInit() {
    this.store.select(From.auth.getId).subscribe(id => this.userId = id);
    this.$Scores = this.fbScore.getScoreList();
    this.$FavScores = this.store.select(From.music.getFavPartituras);
    this.$Generos = this.store.select(From.music.getGeneros);
    this.$Grupos = this.store.select(From.music.getGrupos);
  }
  goToGroup(genero) {
    console.log(genero);
    const filter = { path: CategoriaTipo.GRUPOS, val: genero.value }
    this.$filteredScore = this.fbScore
      .getScoreList(filter)
      .pipe(
        tap(v => console.log(`Los scores del genero son ${JSON.stringify(v)}`))
      )

  }
}
