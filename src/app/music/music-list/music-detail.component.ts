import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { MediaTipo, OrigenTipo, IScore, Score, IScoreId } from '../../core/models';
import { NgNavigatorShareService } from 'ng-navigator-share';

import { From, OrcaState } from '../../core/store';

@Component({
  selector: 'app-music-detail',
  templateUrl: './music-detail.component.html',
  styleUrls: ['./music-detail.component.scss']
})
export class MusicDetailComponent implements OnInit, OnDestroy {
  media: { avatar: string; sheet: string; } = { avatar: '', sheet: '' };
  score: Score;
  isFav: boolean = false;
  @Input('score') iScore: IScoreId;
  @Input('userId') userId: string;
  constructor(private store: Store<OrcaState>,
    private ngNavigatorShareService: NgNavigatorShareService) { }

  ngOnInit() {
    this.score = new Score(this.iScore);
    this.isFav = this.score.suscriptores.some(id => id === this.userId);
    // console.log(this.score);
  }
  ngOnDestroy() {

  }
  people(): string {
    const autor = this.score.getAutor(), others = this.score.getNotAutor();
    if (autor) { return `Autor: ${autor.nombre} ${(autor.apellido) ? autor.apellido : ''}` }
    else if (others.length > 0) { return `${others[0].tipo}: ${others[0].nombre} ${(others[0].apellido) ? others[0].apellido : ''}` }
    else { return `Artistas Desconocidos` }
  }

  shareable() { return (navigator && 'share' in navigator) }
  async shareApi() {
    // this.ngNavigatorShareService.

    try {
      const sharedResponse = await this.ngNavigatorShareService.share({
        title: `Revisa ${this.score.obra} en Orcaestra Sinfonica`,
        url: `https://orcaestra-sinfonica.firebaseapp.com/musica/partitura/${this.iScore.id}`
      });
      console.log(sharedResponse);
    } catch (error) {
      console.log('You app is not shared, reason: ', error);
    }
  }
  fav() {
    if (!this.isFav) {
      this.store.dispatch(new From.media.SaveFav({ scoreId: this.iScore.id, userId: '8uSyP89aa5a3w5AJ2jw8Xc2kvAG2' }));
      this.isFav = true;
    }
    else {
      this.store.dispatch(new From.media.DeleteFav({ scoreId: this.iScore.id, userId: '8uSyP89aa5a3w5AJ2jw8Xc2kvAG2' }));
      this.isFav = false;
    }
  }


}
