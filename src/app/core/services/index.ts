import { AuthService } from './auth.service';
import { UIService } from './ui.service';
import { FirebaseService } from './upload/firebase.service';
import { MusicService } from './music.service';

export const APP_SERVICES = [
  AuthService,
  MusicService,
  UIService,
  FirebaseService,
];
export { AuthService } from './auth.service';
export { UIService } from './ui.service';
export { MusicService } from './music.service';
export { FirebaseService } from './upload/firebase.service';
