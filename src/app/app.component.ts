import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { DomSanitizer } from '@angular/platform-browser';

import { Subscription } from 'rxjs';
import { AuthService } from './core/services';
import { SwUpdate } from '@angular/service-worker';
import { OrcaState, From } from './core/store';
import { Store } from '@ngrx/store';
import { MatIconRegistry } from '@angular/material';
import { InstrType } from './core/models/instr.interface';
import { MediaType, StoredType, PersonaTipo } from './core/models';

@Component({
  selector: "app-root",
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnChanges, OnDestroy {

  watcher$: Subscription;
  @Input() isVisible: boolean = true; // 1
  visibility = 'shown'

  sideNavOpened: boolean = true; // 1
  matDrawerOpened = false; // 0
  matDrawerShow: boolean = true; // 1
  sideNavMode: string = 'side';
  subscriptions = new Subscription();

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private mediaObserver: MediaObserver,
    private swUpdate: SwUpdate,
    private store: Store<OrcaState>
  ) { }
  ngOnInit() {
    this.addIcons();
    if (window) {
      if (this.swUpdate.isEnabled) {
        this.subscriptions.add(this.swUpdate.available.subscribe(() => {
          if (confirm('Nueva version de Orcaestra Sinfonica Disponible.¿Quiere descargarla?')) {
            window.location.reload();
          }
        }));
      }
    }
    this.store.dispatch(new From.media.FetchCategory());
    // this.authService.initAuthListener();
    this.watcher$ = this.mediaObserver.media$
      .subscribe((change: MediaChange) => {
        this.toggleView();
      });
  }
  ngOnChanges() {
    this.visibility = this.isVisible ? 'shown' : 'hidden';
  }

  toggleView() {
    if (this.mediaObserver.isActive('gt-md')) {
      this.sideNavMode = 'side';
      this.sideNavOpened = true; // 1
      this.matDrawerOpened = false; // 0
      this.matDrawerShow = true; // 1
    } else if (this.mediaObserver.isActive('gt-xs')) {
      this.sideNavMode = 'side';
      this.sideNavOpened = false; // 0
      this.matDrawerOpened = true; // 1
      this.matDrawerShow = true; // 1
    } else if (this.mediaObserver.isActive('lt-sm')) {
      this.sideNavMode = 'over';
      this.sideNavOpened = false; // 0
      this.matDrawerOpened = false; // 0
      this.matDrawerShow = false; // 0
    }
  }
  addIcons() {
    this.addSvg('musical-note', 'musical-note');


    this.addSvg(InstrType.CUERDA, 'midi');
    this.addSvg(InstrType.PERCUSION, 'drum');
    this.addSvg(InstrType.TECLADO, 'piano');
    this.addSvg(InstrType.VIENTO_METAL, 'trumpet');
    this.addSvg(InstrType.VOZ, 'microphone');
    this.addSvg(InstrType.VIENTO_MADERA, 'flute');
    this.addSvg(MediaType.YOUTUBE, 'youtube');
    this.addSvg(MediaType.PDF, 'music-file');
    this.addSvg(MediaType.MXML, 'music-file');
    this.addSvg(MediaType.MP3, 'cd');
    this.addSvg(MediaType.MIDI, 'music-file');
    this.addSvg(StoredType.COPIA, 'folder');
    this.addSvg(StoredType.SCORE, 'folder');
    this.addSvg(StoredType.PO, 'folder');

    this.addSvg(PersonaTipo.ADAPTADOR, 'persona');
    this.addSvg(PersonaTipo.ARREGLISTA, 'persona');
    this.addSvg(PersonaTipo.AUTOR, 'persona');
    this.addSvg(PersonaTipo.EDITOR, 'persona');
    this.addSvg(PersonaTipo.ORQUESTADOR, 'persona');
    this.addSvg(PersonaTipo.TRANSCRIPTOR, 'persona');
    this.addSvg(PersonaTipo.UPLOADER, 'persona');

  }
  ngOnDestroy() {
    this.watcher$.unsubscribe();
    this.subscriptions.unsubscribe();
  }
  private addSvg(tipo: string, nombre: string) {
    this.matIconRegistry.addSvgIcon(
      tipo,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/data-icons/' + nombre + '.svg'
      )
    );
  }

}
