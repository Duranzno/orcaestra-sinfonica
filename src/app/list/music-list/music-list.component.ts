import { Component, OnInit } from '@angular/core';
import { PersonaTipo } from '../../shared/models/autor.interface';
import { IStoredType } from '../../shared/models/almacenamiento.interface';
import { IScore } from '../../shared/models/partitura.interface';
import { MusicService } from '../music.service';
import { Store } from '@ngrx/store';
import * as fromMusic from '../redux/music.reducer';
import * as Music from '../redux/music.actions';
import * as fromAll from '../../app.reducer';
import { mockSheet } from '../../shared/mock';
@Component({
  selector: 'app-music-list',
  templateUrl: './music-list.component.html',
  styleUrls: ['./music-list.component.scss'],
})
export class MusicListComponent implements OnInit {
  // mockData= mockSheet;
  state: { ui?: any, auth?: any, music?: any } = {};

  constructor(private musicService: MusicService, private store: Store<fromMusic.State>) { }

  ngOnInit() {
    // this.musicService.setPartitura(this.mockData);
    this.store.select(fromAll.getPartitura).subscribe(x => this.state.music = x);
  }

}
