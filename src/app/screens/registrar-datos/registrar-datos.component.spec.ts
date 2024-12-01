import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarDatosComponent } from './registrar-datos.component';

describe('RegistrarDatosComponent', () => {
  let component: RegistrarDatosComponent;
  let fixture: ComponentFixture<RegistrarDatosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrarDatosComponent]
    });
    fixture = TestBed.createComponent(RegistrarDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
