import { Score } from './partitura.interface';
import { iScore } from '../mock';
import { MediaType, OriginType } from './media.interface';

describe('Score', () => {
  let originalTimeout;
  beforeEach(function () {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  afterEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });
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
    beforeEach(function () {
      originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });

    afterEach(function () {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    let score2 = new Score(iScore);
    beforeAll(function () {
      score2 = new Score(iScore);
      score2.addMediaOrigin(MediaType.MP3, { type: OriginType.DROPBOX, url: 'dpx1' });
      score2.addMediaOrigin(MediaType.MP3, { type: OriginType.DROPBOX, url: 'dpx2' });
      score2.addMediaOrigin(MediaType.PDF, { type: OriginType.DROPBOX, url: 'dpx3' });
      score2.addMediaOrigin(MediaType.PDF, { type: OriginType.DROPBOX, url: 'dpx4' });
      score2.addMediaOrigin(MediaType.AVATAR, { type: OriginType.DROPBOX, url: 'dpx5' });
      score2.addMediaOrigin(MediaType.AVATAR, { type: OriginType.DROPBOX, url: 'dpx6' });
      score2.addMediaOrigin(MediaType.AVATAR, { type: OriginType.DROPBOX, url: 'dpx7' });
    });
    it('deberia tener dos pdf', () => {
      const arrMedia = score2.getByMedia(MediaType.PDF);
      expect(arrMedia.length).toBe(1);
      expect(arrMedia.pop().originArray.length).toBe(2);
    });
    it('deberia tener 3 avatar', () => {
      const arrMedia = score2.getByMedia(MediaType.AVATAR);
      expect(arrMedia.length).toBe(1);
      expect(arrMedia.pop().originArray.length).toBe(3);
    });
    it('deber no tener mxml', () => {
      const arrMedia = score2.getByMedia(MediaType.MXML);
      expect(arrMedia.length).toBe(0);
    });
    it('deberia tener 2 MP3', () => {
      const arrMedia = score2.getByMedia(MediaType.MP3);
      expect(arrMedia.length).toBe(1);
      expect(arrMedia.pop().originArray.length).toBe(2);
    });
    afterAll(_ => {
      score2.media = [];
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
