import { TestBed } from '@angular/core/testing';
import { Notificador } from './notificador';

describe('Notificador', () => {
  let service: Notificador;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Notificador);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
