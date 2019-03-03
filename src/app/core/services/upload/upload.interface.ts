import { Observable } from 'rxjs';
import { UploadFile, Score, User, MediaType, Origin, IScore } from '../../models';

export interface UploadInterface {
  upload(file: UploadFile, path: string): Observable<Origin>;
  saveScore(score: IScore): Observable<IScore>;
}
