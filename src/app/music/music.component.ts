import { Component, OnInit } from '@angular/core';
import { Observable, from } from 'rxjs';
import { IScoreId, CategoriaTipo } from '../core/models';
import { ScoreService } from '../core/services';
import { OrcaState, From } from '../core/store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-music',
  template: `
  <mat-tab-group dynamicHeight>
  <mat-tab label="Biblioteca de la Orquesta">
    <ng-template matTabContent>
     <app-music-list [scores]="scores$|async"></app-music-list>
    </ng-template>
  </mat-tab>

  <mat-tab label="Generos">
    <ng-template matTabContent>
      <div *ngFor="let g of generos$|async" fxLayout="column" fxLayoutGap.gt-md="20px"
        fxLayoutAlign="center center">
          <button mat-button (click)="goToGeneros(g)">{{g}}</button>
     </div>
     <app-music-list [scores]="generoScores$|async"></app-music-list>

    </ng-template>
  </mat-tab>

  <mat-tab label="Favoritos">
    <ng-template matTabContent>
    <app-music-list [scores]="favScores$|async"></app-music-list>
    </ng-template>
  </mat-tab>
</mat-tab-group>
  `,
  styleUrls: []
})
export class MusicComponent implements OnInit {

  scores$: Observable<IScoreId[]>;
  favScores$: Observable<IScoreId[]> = from([]);
  generoScores$: Observable<IScoreId[]> = from([]);
  generos$: Observable<string[]> = from([]);
  constructor(
    private fbScore: ScoreService,
    private store: Store<OrcaState>
  ) {

  }
  ngOnInit() {
    this.scores$ = this.fbScore.getScoreList();
    this.favScores$ = this.store.select(From.music.getFavPartituras);
    this.generos$ = this.store.select(From.music.getGeneros);
  }
  goToGeneros(genero: string) {
    // alert(genero);
    this.generoScores$ = this.fbScore.getScoreList({ path: CategoriaTipo.GENERO, val: genero })
  }
}
