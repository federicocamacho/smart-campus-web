import { TestBed } from '@angular/core/testing';

import { ScCommonService } from './sc-common.service';

describe('ScCommonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScCommonService = TestBed.get(ScCommonService);
    expect(service).toBeTruthy();
  });
});
