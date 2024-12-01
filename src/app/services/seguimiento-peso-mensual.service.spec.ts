import { TestBed } from '@angular/core/testing';

import { SeguimientoPesoMensualService } from './seguimiento-peso-mensual.service';

describe('SeguimientoPesoMensualService', () => {
  let service: SeguimientoPesoMensualService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeguimientoPesoMensualService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
