import { TestBed, inject } from '@angular/core/testing';

import { GaurdServiceAdminService } from './gaurd-service-admin.service';

describe('GaurdServiceAdminService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GaurdServiceAdminService]
    });
  });

  it('should be created', inject([GaurdServiceAdminService], (service: GaurdServiceAdminService) => {
    expect(service).toBeTruthy();
  }));
});
