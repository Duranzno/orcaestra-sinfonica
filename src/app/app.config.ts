import { AppConfig } from './app-config';
export { AppConfig } from './app-config';

import { InjectionToken } from '@angular/core';

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export const APP_DI_CONFIG: AppConfig = {
  windowExists: true
};
export const SERVER_DI_CONFIG: AppConfig = {
  windowExists: false
};