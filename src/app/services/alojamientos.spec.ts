import { TestBed } from '@angular/core/testing';
import { Alojamientos } from './alojamientos';

describe('Alojamientos', () => {
  let service: Alojamientos;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Alojamientos);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
