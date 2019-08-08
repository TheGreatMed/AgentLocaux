import { TestBed } from '@angular/core/testing';

import { PosteServiceService } from './poste-service.service';

describe('PosteServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PosteServiceService = TestBed.get(PosteServiceService);
    expect(service).toBeTruthy();
  });
});
