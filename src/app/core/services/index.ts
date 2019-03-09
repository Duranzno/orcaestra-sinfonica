import { AuthService } from './auth.service';
import { UIService } from './ui.service';
import { FirebaseService } from './upload/firebase.service';

export const APP_SERVICES = [
  AuthService,
  UIService,
  FirebaseService,
];
export { AuthService } from './auth.service';
export { UIService } from './ui.service';
export { FirebaseService } from './upload/firebase.service';
