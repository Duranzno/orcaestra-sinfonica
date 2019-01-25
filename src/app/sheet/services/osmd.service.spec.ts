import { TestBed } from '@angular/core/testing';

import { OsmdService } from './osmd.service';

describe('OsmdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OsmdService = TestBed.get(OsmdService);
    expect(service).toBeTruthy();
  });
});
