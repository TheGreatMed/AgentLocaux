import { TestBed } from '@angular/core/testing';

import { DeviseServiceService } from './devise-service.service';

describe('DeviseServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeviseServiceService = TestBed.get(DeviseServiceService);
    expect(service).toBeTruthy();
  });
});
