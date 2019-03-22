import { Observable } from 'rxjs';
import { IUploadFile, Score, User, MediaTipo, Origen, IScore } from '../../models';

export interface UploadServiceInterface {
  upload(file: IUploadFile, path: string): Observable<Origen>;
}
