import { TestBed } from '@angular/core/testing';

import { AuthorizationDataService } from './authorization-data.service';

describe('AuthorizationDataService', () => {
  let service: AuthorizationDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthorizationDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
