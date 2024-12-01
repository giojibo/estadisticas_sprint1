import { TestBed } from '@angular/core/testing';

import { SeguimientoPorcionesService } from './seguimiento-porciones.service';

describe('SeguimientoPorcionesService', () => {
  let service: SeguimientoPorcionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeguimientoPorcionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
