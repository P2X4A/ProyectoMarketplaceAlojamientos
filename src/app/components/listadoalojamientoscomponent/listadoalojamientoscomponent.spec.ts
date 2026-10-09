import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Listadoalojamientoscomponent } from './listadoalojamientoscomponent';

describe('Listadoalojamientoscomponent', () => {
  let component: Listadoalojamientoscomponent;
  let fixture: ComponentFixture<Listadoalojamientoscomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Listadoalojamientoscomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Listadoalojamientoscomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
