import { EffectsModule } from '@ngrx/effects';
import { UIEffects } from './ui.effects';
import { AuthEffects } from './auth.effects';
export const AppEffectsModules = EffectsModule.forRoot([
  UIEffects, AuthEffects,
]);
