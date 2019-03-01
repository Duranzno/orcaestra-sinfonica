import { Observable } from 'rxjs';
import { UploadFile, Score, User, MediaType, Origin } from '../../models';

export interface UploadService {
  upload(file: UploadFile, path: string): Observable<Origin>;
  setPath(type: MediaType, data: User | Score): string | Error;
  saveScore(score: Score): Observable<Score>;
}
