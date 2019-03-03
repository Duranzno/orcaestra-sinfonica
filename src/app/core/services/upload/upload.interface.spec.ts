import { timer, of, Observable, from } from 'rxjs';
import { switchMap, last, map, mergeMap, } from 'rxjs/operators';
import { OriginType, Origin, Score, UploadFile, MediaType } from '../../models';
import { UploadInterface } from './upload.interface';
import { iScore } from '../../mock';

describe('upload Interface', () => {
  describe('Abstract', () => {
    let snapshot$: Observable<any>, downloadUrl$: Observable<string>, o: Origin;
    beforeEach(function () {
      snapshot$ = timer(1000);
      o = { url: 'www.stuff.com', type: OriginType.FIREBASE };
      downloadUrl$ = of(o.url);
    });

    it('upload mock', (done) => {
      const a = snapshot$.pipe(
        last(),
        switchMap(_ => downloadUrl$),
        map(url => {
          return { url, type: OriginType.FIREBASE };
        })
      ).subscribe(result => {
        expect(result.type).toBe(o.type);
        expect(result.url).toBe(o.url);
        done();
      });
    });
  });

  describe('Complete Workflow', () => {
    let uService: UploadInterface, uFile: UploadFile, score: Score;
    beforeAll(function () {
      uService = new MockUploadFile();
      uFile = new UploadFile({
        file: new File(['foo', 'bar'], 'foobar.txt'),
        type: MediaType.MIDI
      });
      score = new Score(iScore);
    });
    afterEach(() => {
      score.media = [];
    });
    it('from file to score', (done) => {
      const path = score.setPath(MediaType.AVATAR, uFile);
      uService.upload(uFile, path as string).subscribe(
        origin => {
          score.addMediaOrigin(uFile.type, origin);

          const result = score.getByMediaOrigin(uFile.type, origin.type);
          expect(result).toContain(origin);
          console.log(result);
          done();
        }
      );

    });
    it('from file array to score', (done) => {
      const arr = from([uFile, uFile, uFile]);
      const path = score.setPath(MediaType.AVATAR, uFile);
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
          score.addMediaOrigin(uFile.type, o);
        },
        () => { },
        () => {
          const result = score.getByMediaOrigin(uFile.type, OriginType.ASSETS);
          expect(result.length).toBe(3);
          console.log(result);
          done();
        });


      uService.upload(uFile, path as string).subscribe(
        origin => {
          score.addMediaOrigin(uFile.type, origin);

          const result = score.getByMediaOrigin(uFile.type, origin.type);
          expect(result).toContain(origin);
          console.log(result);
          done();
        }
      );

    });
  });
});
class MockUploadFile implements UploadInterface {
  upload(file: UploadFile, path: string): Observable<Origin> {
    return of({
      type: OriginType.ASSETS,
      url: 'www.www'
    });
  }

  saveScore(score: Score): Observable<Score> { return of(new Score(score)); }
}

