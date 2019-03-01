import { Score } from './partitura.interface';
import { iScore } from '../mock';
import { MediaType, OriginType } from './media.interface';

describe('Score', () => {
  describe('addMediaOrigin', () => {
    const score = new Score(iScore);

    beforeEach(function () {
      score.media = [];
    });
    it('deberia crear y agregar un solo tipo de media', () => {
      expect(score.media.length).toBe(0);
      score.addMediaOrigin(MediaType.MP3, { type: OriginType.DROPBOX, url: 'dpx' });
      expect(score.media.length).toBe(1);
    });
    it('deberia agregar a media existente', () => {
      expect(score.media.length).toBe(0);
      score.addMediaOrigin(MediaType.MP3, { type: OriginType.DROPBOX, url: 'dpx' });
      score.addMediaOrigin(MediaType.MP3, { type: OriginType.DROPBOX, url: 'dpx' });
      expect(score.media.length).toBe(1);
      expect(score.media.pop().originArray.length).toBe(2);
    });
  });
  describe('getByMedia', () => {
    let score = new Score(iScore);
    beforeAll(function () {
      score = new Score(iScore);
      score.addMediaOrigin(MediaType.MP3, { type: OriginType.DROPBOX, url: 'dpx1' });
      score.addMediaOrigin(MediaType.MP3, { type: OriginType.DROPBOX, url: 'dpx2' });
      score.addMediaOrigin(MediaType.PDF, { type: OriginType.DROPBOX, url: 'dpx3' });
      score.addMediaOrigin(MediaType.PDF, { type: OriginType.DROPBOX, url: 'dpx4' });
      score.addMediaOrigin(MediaType.AVATAR, { type: OriginType.DROPBOX, url: 'dpx5' });
      score.addMediaOrigin(MediaType.AVATAR, { type: OriginType.DROPBOX, url: 'dpx6' });
      score.addMediaOrigin(MediaType.AVATAR, { type: OriginType.DROPBOX, url: 'dpx7' });
    });
    it('deberia tener dos pdf', () => {
      const arrMedia = score.getByMedia(MediaType.PDF);
      expect(arrMedia.length).toBe(1);
      expect(arrMedia.pop().originArray.length).toBe(2);
    });
    it('deberia tener 3 avatar', () => {
      const arrMedia = score.getByMedia(MediaType.AVATAR);
      expect(arrMedia.length).toBe(1);
      expect(arrMedia.pop().originArray.length).toBe(3);
    });
    it('deber no tener mxml', () => {
      const arrMedia = score.getByMedia(MediaType.MXML);
      expect(arrMedia.length).toBe(0);
    });
    it('deberia tener 2 MP3', () => {
      const arrMedia = score.getByMedia(MediaType.MP3);
      expect(arrMedia.length).toBe(1);
      expect(arrMedia.pop().originArray.length).toBe(2);
    });
    afterAll(_ => {
      score.media = [];
    });
  });
  describe('getByMediaOrigin', () => {
    const score = new Score(iScore);
    beforeAll(function () {
      score.addMediaOrigin(MediaType.MP3, { type: OriginType.DROPBOX, url: 'dpx1' });
      score.addMediaOrigin(MediaType.MP3, { type: OriginType.FIREBASE, url: 'fb1' });
      score.addMediaOrigin(MediaType.MP3, { type: OriginType.FIREBASE, url: 'fb2' });
      score.addMediaOrigin(MediaType.MP3, { type: OriginType.ASSETS, url: 'assts' });

      score.addMediaOrigin(MediaType.PDF, { type: OriginType.DROPBOX, url: 'dpx3' });
      score.addMediaOrigin(MediaType.PDF, { type: OriginType.DROPBOX, url: 'dpx4' });
      score.addMediaOrigin(MediaType.PDF, { type: OriginType.DROPBOX, url: 'dpx45' });

      score.addMediaOrigin(MediaType.AVATAR, { type: OriginType.DROPBOX, url: 'dpx5' });
      score.addMediaOrigin(MediaType.AVATAR, { type: OriginType.DROPBOX, url: 'dpx5' });
      score.addMediaOrigin(MediaType.AVATAR, { type: OriginType.DROPBOX, url: 'dpx6' });
      score.addMediaOrigin(MediaType.AVATAR, { type: OriginType.DROPBOX, url: 'dpx7' });
    });
    it('mp3 deberia tener dos elementos de firebase', () => {
      const arrMp3Fb = score.getByMediaOrigin(MediaType.MP3, OriginType.FIREBASE);
      expect(arrMp3Fb.length).toBe(2);
      // expect(arrMp3Dp.length).toBe(1);
      // expect(arrMp3Assets.length).toBe(1);
    });
    afterAll(() => { score.media = []; });
  });
});
