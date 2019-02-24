import { EffectsModule } from '@ngrx/effects';
import { UIEffects } from './ui.effects';
import { AuthEffects } from './auth.effects';

import { MusicEffects } from './music.effects';
import { MediaEffects } from './media.effects';
export const AppEffectsModules = EffectsModule.forRoot([
  UIEffects, AuthEffects, MediaEffects, MusicEffects
]);
