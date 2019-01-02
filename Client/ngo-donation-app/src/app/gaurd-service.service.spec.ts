import { TestBed, inject } from '@angular/core/testing';

import { GaurdServiceService } from './gaurd-service.service';

describe('GaurdServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GaurdServiceService]
    });
  });

  it('should be created', inject([GaurdServiceService], (service: GaurdServiceService) => {
    expect(service).toBeTruthy();
  }));
});
