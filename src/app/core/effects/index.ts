import { EffectsModule } from '@ngrx/effects';
import { UIEffects } from './ui.effects';
export const AppEffectsModules = EffectsModule.forRoot([
  UIEffects
]);
