import { TestBed } from '@angular/core/testing';

import { SeguimientoCaloricoService } from './seguimiento-calorico.service';

describe('SeguimientoCaloricoService', () => {
  let service: SeguimientoCaloricoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeguimientoCaloricoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
