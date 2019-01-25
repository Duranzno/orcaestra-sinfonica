import { TestBed } from '@angular/core/testing';

import { WavesurferService } from './wavesurfer.service';

describe('WavesurferService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WavesurferService = TestBed.get(WavesurferService);
    expect(service).toBeTruthy();
  });
});
