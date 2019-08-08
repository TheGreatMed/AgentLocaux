import { TestBed } from '@angular/core/testing';

import { SituationServiceService } from './situation-service.service';

describe('SituationServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SituationServiceService = TestBed.get(SituationServiceService);
    expect(service).toBeTruthy();
  });
});
