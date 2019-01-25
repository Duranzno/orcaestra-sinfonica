import { Component, OnInit } from '@angular/core';
import { IScore } from '../../shared/models/partitura.interface';
import { IStoredType } from '../../shared/models/almacenamiento.interface';
import { PersonaTipo } from '../../shared/models/autor.interface';
import { MusicService } from '../music.service';
import { Store } from '@ngrx/store';

import * as fromMusic from '../redux/music.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-music-detail',
  templateUrl: './music-detail.component.html',
  styleUrls: ['./music-detail.component.less']
})
export class MusicDetailComponent implements OnInit {
  mockData$: Observable<IScore>;
  mockData: IScore = {
    'youtube': '',
    'almacenamiento': [
      {
        'tipo': IStoredType.SCORE,
        'cantidad': 2
      }
    ],
    'generos': [
      'Barroco'
    ],
    'its': 1,
    'photoURL': '/assets/9th/beethoven.jpg',
    'gente': [
      {
        'nombre': 'Alejandro',
        'tipo': PersonaTipo.UPLOADER,
        'apellido': 'Go'
      },
      {

        'nombre': 'Ludwing',
        'tipo': PersonaTipo.AUTOR,
        'apellido': 'Beethoven'
      }
    ],
    'instrumentos': ['Violin', 'Piano'],
    // tslint:disable-next-line:max-line-length
    'extrainfo': 'La Sinfonía n.º 9 en re menor, op. 125, conocida también como "Coral", es la última sinfonía completa del compositor alemán Ludwig van Beethoven. Es una de las obras más trascendentales, importantes y populares de la música y el arte. Su último movimiento es un final coral sorprendentemente inusual en su época que se ha convertido en símbolo de la libertad. Precisamente, una adaptación de la sinfonía, realizada por Herbert von Karajan es, desde 1972, el himno de la Unión Europea (UE).1​ En 2001, la partitura original de la sinfonía se inscribió en el Registro de la Memoria del Mundo de la UNESCO, donde forma parte, junto con otros sobresalientes monumentos, de la herencia espiritual de la humanidad',
    'obra': 'Sinfonía n.º 9 '
  };
  constructor(private musicService: MusicService, private store: Store<fromMusic.State>) { }

  ngOnInit() {
    this.mockData$ = this.store.select(fromMusic.getPartitura);
    this.store.select(fromMusic.getPartitura).subscribe(
      (sheet: IScore) => {
        console.log(sheet);
        // this.mockData = sheet;
      }
    );
    // this.store.select()
  }
  log(g) {
    console.log(g);
  }
}
