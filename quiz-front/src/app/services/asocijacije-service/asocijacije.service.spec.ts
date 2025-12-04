import { TestBed } from '@angular/core/testing';

import { AsocijacijeService } from './asocijacije.service';

describe('AsocijacijeService', () => {
  let service: AsocijacijeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsocijacijeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
