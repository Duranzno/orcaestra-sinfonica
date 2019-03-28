import { GenerosComponent } from './score-upload/generos.component';
import { InvolucradosComponent } from './score-upload/involucrados.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { IconSummaryArrComponent, IconSummaryComponent } from './icon/icon-summary/icon-summary.component';
import { ScoreEditDialog } from './dialog-score-edit/score-edit.dialog';
import { MediaInputComponent } from './media-input/media-input.component';
import { CameraComponent } from './media-input/camera.component';
import { AudioComponent } from './media-input/audio.component';

export const APP_SHARED_COMPONENTS = [
  GenerosComponent, InvolucradosComponent, IconSummaryComponent, MediaInputComponent, CameraComponent, AudioComponent, FileUploadComponent, IconSummaryArrComponent, ScoreEditDialog
];
export { ScoreEditDialog } from './dialog-score-edit/score-edit.dialog';
