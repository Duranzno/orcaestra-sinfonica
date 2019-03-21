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
     <app-music-list [scores]="$Scores|async"></app-music-list>
    </ng-template>
  </mat-tab>

  <mat-tab label="Generos">
    <ng-template matTabContent>
      <div *ngFor="let g of $Generos|async" fxLayout="column" fxLayoutGap.gt-md="20px"
        fxLayoutAlign="center center">
          <button mat-button (click)="goToGeneros(g)">{{g}}</button>
     </div>
     <app-music-list [scores]="$GeneroScores|async"></app-music-list>

    </ng-template>
  </mat-tab>

  <mat-tab label="Favoritos">
    <ng-template matTabContent>
    <app-music-list [scores]="$FavScores|async"></app-music-list>
    </ng-template>
  </mat-tab>  
</mat-tab-group>
  `,
  styleUrls: []
})
export class MusicComponent implements OnInit {

  $Scores: Observable<IScoreId[]> = from([]);
  $FavScores: Observable<IScoreId[]> = from([]);
  $GeneroScores: Observable<IScoreId[]> = from([]);
  $Generos: Observable<string[]> = from([]);
  constructor(
    private fbScore: ScoreService,
    private store: Store<OrcaState>
  ) {

  }
  ngOnInit() {
    this.$Scores = this.fbScore.getScoreList();
    this.$FavScores = this.store.select(From.music.getFavPartituras);
    this.$Generos = this.store.select(From.music.getGeneros);
  }
  goToGeneros(genero: string) {
    // alert(genero);
    this.$GeneroScores = this.fbScore.getScoreList({ path: CategoriaTipo.GENERO, val: genero })
  }
}
