import { Component, OnInit, Input, OnDestroy, OnChanges, Inject } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { DomSanitizer } from '@angular/platform-browser';
import { FirebaseApp, FirebaseMessaging } from '@angular/fire';

import { Subscription } from 'rxjs';
import { AuthService, MessagingService } from './core/services';
import { OrcaState, From } from './core/store';
import { Store } from '@ngrx/store';
import { MatIconRegistry } from '@angular/material';
import { InstrTipo } from './core/models/instr.interface';
import { MediaTipo, RegistroTipo, PersonaTipo } from './core/models';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment.prod';
import { filter, take } from 'rxjs/operators';
import { SwPush } from '@angular/service-worker';
import { AngularFireMessaging } from '@angular/fire/messaging';
@Component({
  selector: "app-root",
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnChanges, OnDestroy {

  @Input() isVisible: boolean = true; // 1
  visibility = 'shown'
  sideNavOpened: boolean = true; // 1
  matDrawerOpened = false; // 0
  matDrawerShow: boolean = true; // 1
  sideNavMode: string = 'side';
  $subs = new Subscription();
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private mediaObserver: MediaObserver,
    private store: Store<OrcaState>,
    private msg: MessagingService,
    db: AngularFirestore) {
    // db.firestore.enablePersistence().then(() => console.log("Firestore es capaz de corre offline"))
  }
  ngOnInit() {
    this.addIcons();
    this.initPushService();
    this.store.dispatch(new From.media.FetchCategory());
    // this.authService.initAuthListener();
    this.$subs = this.mediaObserver.media$
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


    this.addSvg(InstrTipo.CUERDA, 'midi');
    this.addSvg(InstrTipo.PERCUSION, 'drum');
    this.addSvg(InstrTipo.TECLADO, 'piano');
    this.addSvg(InstrTipo.VIENTO_METAL, 'trumpet');
    this.addSvg(InstrTipo.VOZ, 'microphone');
    this.addSvg(InstrTipo.VIENTO_MADERA, 'flute');
    this.addSvg(MediaTipo.YOUTUBE, 'youtube');
    this.addSvg(MediaTipo.PDF, 'music-file');
    this.addSvg(MediaTipo.MP3, 'cd');
    this.addSvg(MediaTipo.MIDI, 'music-file');
    this.addSvg(RegistroTipo.SCORE, 'folder');

    this.addSvg(PersonaTipo.ADAPTADOR, 'persona');
    this.addSvg(PersonaTipo.ARREGLISTA, 'persona');
    this.addSvg(PersonaTipo.AUTOR, 'persona');
    this.addSvg(PersonaTipo.EDITOR, 'persona');
    this.addSvg(PersonaTipo.ORQUESTADOR, 'persona');
    this.addSvg(PersonaTipo.TRANSCRIPTOR, 'persona');
    this.addSvg(PersonaTipo.UPLOADER, 'persona');

  }
  initPushService() {
    this.$subs.add(
      this.store.select(From.auth.getUid)
        .subscribe((id) => {
          console.log((!id) ? `No ha iniciado sesión` : `El id del usuario es ${id}`);
          // if (environment.production && this.msg.getToken())
          if (id && id !== '') {
            this.msg.init()
              .then((token) => {
                console.log(`Going to dispatch ${id} fromAuth.UploadFCM(${token})`)
                this.store.dispatch(new From.auth.UploadFCM(token))
              });

          }
        }))
  }
  ngOnDestroy() {
    this.$subs.unsubscribe();
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
