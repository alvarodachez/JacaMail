import { TestBed } from '@angular/core/testing';

import { AuntenticadorJwtService } from './auntenticador-jwt.service';

describe('AuntenticadorJwtService', () => {
  let service: AuntenticadorJwtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuntenticadorJwtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
