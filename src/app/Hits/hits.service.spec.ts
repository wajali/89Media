import { TestBed, inject } from '@angular/core/testing';

import { HitsService } from './hits.service';

describe('HitsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HitsService]
    });
  });

  it('should be created', inject([HitsService], (service: HitsService) => {
    expect(service).toBeTruthy();
  }));
});
