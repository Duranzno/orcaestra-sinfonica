import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, from, Subscription } from 'rxjs';
import { IScoreId, CategoriaTipo } from '../core/models';
import { ScoreService, UserService } from '../core/services';
import { OrcaState, From } from '../core/store';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-music',
  template: `
  <mat-toolbar color="primary">
  <mat-toolbar-row>
  <mat-form-field>
    <mat-label>Seleccione Grupo Musical</mat-label>
    <mat-select (selectionChange)="goToGroup($event)">
      <mat-option *ngFor="let g of $Grupos|async" [value]="g" (click)="goToGroup(g)">
        {{g}}
      </mat-option>
    </mat-select>
    </mat-form-field>
    <button mat-icon-button (click)="updateUserGroup()">
      <mat-icon>{{(grupo===uGrupo)?'favorite':'favorite_border'}}</mat-icon>
    </button>
  </mat-toolbar-row>
  </mat-toolbar>
  <mat-tab-group dynamicHeight  [selectedIndex]="selectedTab">
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
})
export class MusicComponent implements OnInit, OnDestroy {
  selectedTab = 0;
  $Scores: Observable<IScoreId[]> = from([]);
  $FavScores: Observable<IScoreId[]> = from([]);
  $filteredScore: Observable<IScoreId[]> = from([]);
  $Generos: Observable<string[]> = from([]);
  $Grupos: Observable<string[]> = from([]);
  $subs = new Subscription();
  grupo: string;
  uGrupo: string;
  userId: string;
  constructor(
    private fbScore: ScoreService,
    private store: Store<OrcaState>,
    private route: ActivatedRoute,
    private user: UserService,
  ) {
    this.$subs.add(this.route.paramMap.subscribe(
      (_param: ParamMap) => {
        const param = _param.get('genero');
        if (param == "favoritos") {
          this.selectedTab = 2;
        } else {
          this.goToGroup({ value: param });
          this.selectedTab = 1;
        }
      }))
  }
  ngOnInit() {
    this.$subs.add(this.store.select(From.auth.getUid).subscribe(id => this.userId = id));
    this.$subs.add(this.store.select(From.auth.getGroup).subscribe(uGrupo => this.uGrupo = uGrupo));
    this.$Scores = this.fbScore.getScoreList();
    this.store.dispatch(new From.media.FetchFav({ userId: '8uSyP89aa5a3w5AJ2jw8Xc2kvAG2' }))
    this.$FavScores = this.store.select(From.music.getFavPartituras);
    this.$Generos = this.store.select(From.music.getGeneros);
    this.$Grupos = this.store.select(From.music.getGrupos);
  }
  goToGroup(grupo: { value: string }) {
    if (grupo && grupo.value) {
      this.grupo = grupo.value;
      const filter = { path: CategoriaTipo.GRUPOS, val: grupo.value }
      this.$filteredScore = this.fbScore
        .getScoreList(filter)
        .pipe(
          tap(v => console.log(`Los scores del genero son ${JSON.stringify(v)}`))
        )
    }

  }
  updateUserGroup() {
    if (this.grupo) this.store.dispatch(new From.auth.SetGrupo(this.grupo));
  }
  ngOnDestroy() { this.$subs.unsubscribe() }
}
