import { Observable } from 'rxjs';
import { IUploadFile, Score, User, MediaTipo, Origen, IScore } from '../../models';

export interface UploadInterface {
  upload(file: IUploadFile, path: string): Observable<Origen>;
}
