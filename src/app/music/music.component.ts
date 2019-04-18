import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, from, Subscription, of } from 'rxjs';
import { IScoreId, CategoriaTipo } from '../core/models';
import { ScoreService, UserService } from '../core/services';
import { OrcaState, From } from '../core/store';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material';

@Component({
  selector: 'app-music',
  templateUrl: `./music.component.html`,
})
export class MusicComponent implements OnInit, OnDestroy {
  selectedTab = 0;
  $loading = of(true);
  $Scores: Observable<IScoreId[]> = from([]);
  $FavScores: Observable<IScoreId[]> = from([]);
  $filteredScore: Observable<IScoreId[]> = from([]);
  // $Generos: Observable<string[]> = from([]);
  $Grupos: Observable<string[]> = from([]);
  $subs = new Subscription();
  uGrupo: string;
  selectedGrupo = "";
  userId: string;
  constructor(
    private fbScore: ScoreService,
    private store: Store<OrcaState>,
    private route: ActivatedRoute,
  ) {
    this.$subs.add(this.route.paramMap.subscribe(
      (_param: ParamMap) => {
        const param = _param.get('genero');
        if (param == "favoritos") {
          this.selectedTab = 2;
        } else if (!!param && param !== "") {
          this.goToGroup(param);
          this.selectedTab = 1;
        } else {
          this.selectedTab = 0;
        }
      }))
  }

  ngOnInit() {
    // this.$loading = this.store.select(From.ui.getIsLoading);
    this.$subs.add(
      this.store.select(From.auth.getUid).subscribe(id => {
        if (!!id) {
          this.userId = id;
          this.store.dispatch(new From.media.FetchFav({ userId: this.userId }));
        }
      }
      ));
    this.$subs.add(
      this.store.select(From.auth.getUser).subscribe(u => {
        if (!!u.password) {
          this.uGrupo = u.grupo;
          this.selectedGrupo = u.grupo;
          this.goToGroup()
        }
      }));
    this.$Scores = this.fbScore.getScoreList()
    this.$FavScores = this.store.select(From.music.getFavPartituras)
    // this.$Generos = this.store.select(From.music.getGeneros)
    this.$Grupos = this.store.select(From.music.getGrupos)
  }

  goToGroup(grupo?: any) {
    if (grupo) { this.selectedGrupo = (typeof grupo === "string") ? grupo : grupo.value }
    const filter = {
      path: CategoriaTipo.GRUPOS,
      val: this.selectedGrupo
    }
    this.$filteredScore = this.fbScore
      .getScoreList(filter)
      .pipe(tap(v => console.log(`Los scores del genero son ${JSON.stringify(v)}`)))
  }
  updateUserGroup() {
    if (!!this.uGrupo && !!this.selectedGrupo) this.store.dispatch(new From.auth.SetGrupo(this.selectedGrupo));
  }
  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    switch (tabChangeEvent.index) {
      case 0://Biblioteca
        break;
      case 1://Grupos
        break;
      case 2://Favoritos
        break;
    }
  }
  ngOnDestroy() { this.$subs.unsubscribe() }
}
