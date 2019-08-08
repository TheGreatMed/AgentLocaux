import { TestBed } from '@angular/core/testing';

import { PaysServiceService } from './pays-service.service';

describe('PaysServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaysServiceService = TestBed.get(PaysServiceService);
    expect(service).toBeTruthy();
  });
});
