import { timer, of, Observable, from } from 'rxjs';
import { switchMap, last, map, mergeMap, } from 'rxjs/operators';
import { OrigenTipo, Origen, Score, IUploadFile, MediaTipo } from '../../models';
import { UploadServiceInterface } from './upload.interface';
import { iScore } from '../../mock';

describe('upload Interface', () => {
  describe('Abstract', () => {
    let snapshot$: Observable<any>, downloadUrl$: Observable<string>, o: Origen;
    beforeEach(function () {
      snapshot$ = timer(1000);
      o = { url: 'www.stuff.com', tipo: OrigenTipo.FIREBASE };
      downloadUrl$ = of(o.url);
    });

    it('upload mock', (done) => {
      const a = snapshot$.pipe(
        last(),
        switchMap(_ => downloadUrl$),
        map(url => {
          return { url, type: OrigenTipo.FIREBASE };
        })
      ).subscribe(result => {
        expect(result.type).toBe(o.tipo);
        expect(result.url).toBe(o.url);
        done();
      });
    });
  });

  describe('Complete Workflow', () => {
    let uService: UploadServiceInterface, uFile: IUploadFile, score: Score;
    beforeAll(function () {
      uService = new MockIUploadFile();
      uFile = <IUploadFile>({
        archivo: new File(['foo', 'bar'], 'foobar.txt'),
        tipo: MediaTipo.MIDI
      });
      score = new Score(iScore);
    });
    afterEach(() => {
      score.media = [];
    });
    it('from file to score', (done) => {
      const path = score.setPath(MediaTipo.AVATAR, uFile);
      uService.upload(uFile, path as string).subscribe(
        origin => {
          score.addMediaOrigen(uFile.tipo, origin);

          const result = score.getByMediaOrigen(uFile.tipo, origin.tipo);
          expect(result).toContain(origin);
          console.log(result);
          done();
        }
      );

    });
    it('from file array to score', (done) => {
      const arr = from([uFile, uFile, uFile]);
      const path = score.setPath(MediaTipo.AVATAR, uFile);
      score.media = [];
      const oriArr$ = arr.pipe(
        mergeMap((u, index) => {
          console.log(JSON.stringify(u), index);
          return uService.upload(u, path as string);
        })
      );
      oriArr$.subscribe(val => { console.log(JSON.stringify(val)); });
      oriArr$.subscribe(
        o => {
          score.addMediaOrigen(uFile.tipo, o);
        },
        () => { },
        () => {
          const result = score.getByMediaOrigen(uFile.tipo, OrigenTipo.ASSETS);
          expect(result.length).toBe(3);
          console.log(result);
          done();
        });


      uService.upload(uFile, path as string).subscribe(
        origin => {
          score.addMediaOrigen(uFile.tipo, origin);

          const result = score.getByMediaOrigen(uFile.tipo, origin.tipo);
          expect(result).toContain(origin);
          console.log(result);
          done();
        }
      );

    });
  });
});
class MockIUploadFile implements UploadServiceInterface {
  upload(file: IUploadFile, path: string): Observable<Origen> {
    return of({
      tipo: OrigenTipo.ASSETS,
      url: 'www.www'
    });
  }

  saveScore(score: Score): Observable<Score> { return of(new Score(score)); }
}

