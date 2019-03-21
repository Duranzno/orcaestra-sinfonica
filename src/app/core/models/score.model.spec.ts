import { Score } from './score.model';
import { iScore } from '../mock';
import { MediaTipo, OrigenTipo } from './media.model';

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
      score.addMediaOrigen(MediaTipo.MP3, { tipo: OrigenTipo.DROPBOX, url: 'dpx' });
      expect(score.media.length).toBe(1);
    });
    it('deberia agregar a media existente', () => {
      expect(score.media.length).toBe(0);
      score.addMediaOrigen(MediaTipo.MP3, { tipo: OrigenTipo.DROPBOX, url: 'dpx' });
      score.addMediaOrigen(MediaTipo.MP3, { tipo: OrigenTipo.DROPBOX, url: 'dpx' });
      expect(score.media.length).toBe(1);
      expect(score.media.pop().origenArray.length).toBe(2);
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
      score2.addMediaOrigen(MediaTipo.MP3, { tipo: OrigenTipo.DROPBOX, url: 'dpx1' });
      score2.addMediaOrigen(MediaTipo.MP3, { tipo: OrigenTipo.DROPBOX, url: 'dpx2' });
      score2.addMediaOrigen(MediaTipo.PDF, { tipo: OrigenTipo.DROPBOX, url: 'dpx3' });
      score2.addMediaOrigen(MediaTipo.PDF, { tipo: OrigenTipo.DROPBOX, url: 'dpx4' });
      score2.addMediaOrigen(MediaTipo.AVATAR, { tipo: OrigenTipo.DROPBOX, url: 'dpx5' });
      score2.addMediaOrigen(MediaTipo.AVATAR, { tipo: OrigenTipo.DROPBOX, url: 'dpx6' });
      score2.addMediaOrigen(MediaTipo.AVATAR, { tipo: OrigenTipo.DROPBOX, url: 'dpx7' });
    });
    it('deberia tener dos pdf', () => {
      const arrMedia = score2.getByMedia(MediaTipo.PDF);
      expect(arrMedia.length).toBe(1);
      expect(arrMedia.pop().origenArray.length).toBe(2);
    });
    it('deberia tener 3 avatar', () => {
      const arrMedia = score2.getByMedia(MediaTipo.AVATAR);
      expect(arrMedia.length).toBe(1);
      expect(arrMedia.pop().origenArray.length).toBe(3);
    });
    it('deber no tener mxml', () => {
      const arrMedia = score2.getByMedia(MediaTipo.MXML);
      expect(arrMedia.length).toBe(0);
    });
    it('deberia tener 2 MP3', () => {
      const arrMedia = score2.getByMedia(MediaTipo.MP3);
      expect(arrMedia.length).toBe(1);
      expect(arrMedia.pop().origenArray.length).toBe(2);
    });
    afterAll(_ => {
      score2.media = [];
    });
  });
  describe('getByMediaOrigin', () => {
    const score = new Score(iScore);
    beforeAll(function () {
      score.addMediaOrigen(MediaTipo.MP3, { tipo: OrigenTipo.DROPBOX, url: 'dpx1' });
      score.addMediaOrigen(MediaTipo.MP3, { tipo: OrigenTipo.FIREBASE, url: 'fb1' });
      score.addMediaOrigen(MediaTipo.MP3, { tipo: OrigenTipo.FIREBASE, url: 'fb2' });
      score.addMediaOrigen(MediaTipo.MP3, { tipo: OrigenTipo.ASSETS, url: 'assts' });

      score.addMediaOrigen(MediaTipo.PDF, { tipo: OrigenTipo.DROPBOX, url: 'dpx3' });
      score.addMediaOrigen(MediaTipo.PDF, { tipo: OrigenTipo.DROPBOX, url: 'dpx4' });
      score.addMediaOrigen(MediaTipo.PDF, { tipo: OrigenTipo.DROPBOX, url: 'dpx45' });

      score.addMediaOrigen(MediaTipo.AVATAR, { tipo: OrigenTipo.DROPBOX, url: 'dpx5' });
      score.addMediaOrigen(MediaTipo.AVATAR, { tipo: OrigenTipo.DROPBOX, url: 'dpx5' });
      score.addMediaOrigen(MediaTipo.AVATAR, { tipo: OrigenTipo.DROPBOX, url: 'dpx6' });
      score.addMediaOrigen(MediaTipo.AVATAR, { tipo: OrigenTipo.DROPBOX, url: 'dpx7' });
    });
    it('mp3 deberia tener dos elementos de firebase', () => {
      const arrMp3Fb = score.getByMediaOrigen(MediaTipo.MP3, OrigenTipo.FIREBASE);
      expect(arrMp3Fb.length).toBe(2);
      // expect(arrMp3Dp.length).toBe(1);
      // expect(arrMp3Assets.length).toBe(1);
    });
    afterAll(() => { score.media = []; });
  });
});
