import { timer, of, Observable } from 'rxjs';
import { switchMap, last, map } from 'rxjs/operators';
import { OriginType, Origin } from '../../models';

describe('Upload', () => {
  describe('upload()', () => {
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
});

