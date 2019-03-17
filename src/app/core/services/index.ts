import { AuthService } from './auth.service';
import { UIService } from './ui.service';
import { FirestorageService } from './upload/firestorage.service';
import { ScoreService } from './firebase/score.service';
import { CategoriesService } from './firebase/categories.service';
import { UserService } from './firebase/user.service';
import { MessagingService } from './messaging.service';

export const APP_SERVICES = [
  AuthService,
  UIService,
  FirestorageService,
  ScoreService,
  CategoriesService,
  UserService,
  MessagingService
];

export { MessagingService } from './messaging.service';
export { AuthService } from './auth.service';
export { UIService } from './ui.service';
export { FirestorageService } from './upload/firestorage.service';
export { ScoreService } from './firebase/score.service';
export { CategoriesService } from './firebase/categories.service';
export { UserService } from './firebase/user.service';
