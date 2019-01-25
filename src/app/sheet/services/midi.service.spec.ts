import { TestBed } from '@angular/core/testing';

import { MidiService } from './midi.service';

describe('MidiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MidiService = TestBed.get(MidiService);
    expect(service).toBeTruthy();
  });
});
