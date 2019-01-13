import { Component, OnInit } from '@angular/core';
import { PersonaTipo } from '../../shared/models/autor.interface';
import { IStoredType } from '../../shared/models/almacenamiento.interface';
import { IScore } from '../../shared/models/partitura.interface';
import { MusicService } from '../music.service';
import { Store } from '@ngrx/store';
import * as fromMusic from '../music.reducer';
import * as Music from '../music.actions';

@Component({
  selector: 'app-music-list',
  templateUrl: './music-list.component.html',
  styleUrls: ['./music-list.component.less'],
})
export class MusicListComponent implements OnInit {
  mockData: IScore = {
    its: 1,
    obra: 'Quinta Sinfonia',
    almacenamiento: [{ cantidad: 2, 'tipo': IStoredType.COPIA }],
    involucrados: [{ nombre: 'Ludwing van', 'apellido': 'Beethoven', 'tipo': PersonaTipo.AUTOR }],
    generos: ['Clasica', 'Musica Vieja'],
    instrumentos: ['Piano', 'Violin'],
    extraInfo: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmo tempor incididunt ut labore.',
  };
  constructor(private musicService: MusicService, private store: Store<fromMusic.State>) { }

  ngOnInit() {
    this.musicService.setPartitura(this.mockData);
  }

}
