import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { AlojamientoModel } from '../../models/alojamiento.model';
import { CotizacionModel } from '../../models/cotizacion.model';
import { MarketplaceDataModel } from '../../models/marketplace-data.model';
import { Alojamientos } from '../../services/alojamientos';
import { Cotizaciones } from '../../services/cotizaciones';
import { Notificador } from '../../services/notificador';

@Component({
  selector: 'app-cotizacioncomponent',
  standalone: false,
  styleUrl: './cotizacioncomponent.css',
  templateUrl: './cotizacioncomponent.html',
})
export class Cotizacioncomponent implements OnInit {
  alojamientosService: Alojamientos = inject(Alojamientos);
  cotizacionesService: Cotizaciones = inject(Cotizaciones);
  notificador: Notificador = inject(Notificador);
  ruta: ActivatedRoute = inject(ActivatedRoute);
  enrutador: Router = inject(Router);

  id: WritableSignal<number> = signal(0);

  fechaLlegada: string = '';
  fechaSalida: string = '';
  huespedes: number | null = 1;
  mostrarErrores: boolean = false;

  ngOnInit(): void {
    this.cargarAlojamientos();
    this.ruta.paramMap.subscribe((parametros: ParamMap) => {
      this.id.set(Number(parametros.get('id') ?? 0));
      this.recuperarCotizacion();
    });
  }
  cargarAlojamientos(): void {
    if (this.alojamientosService.estanCargados()) {
      return;
    }
    this.alojamientosService.getDatos().subscribe({
      next: (respuesta: HttpResponse<MarketplaceDataModel>) => {
        this.alojamientosService.guardarDatos(respuesta.body);
      },
      error: (error: HttpResponse<unknown>) => {
        this.alojamientosService.cargaFallida.set(true);
        this.notificador.error('No se pudo cargar la información del alojamiento.', 'Error ' + error.status);
      },
    });
  }
  recuperarCotizacion(): void {
    const anterior: CotizacionModel | null = this.cotizacionesService.cotizacionActual();
    if (anterior !== null && anterior.alojamientoId === this.id()) {
      this.fechaLlegada = anterior.fechaLlegada;
      this.fechaSalida = anterior.fechaSalida;
      this.huespedes = anterior.huespedes;
    }
  }

  alojamiento(): AlojamientoModel | undefined {
    return this.alojamientosService.obtenerPorId(this.id());
  }
  hoy(): string {
    return this.cotizacionesService.hoy();
  }
  minimoSalida(): string {
    const base: string = this.fechaLlegada !== '' ? this.fechaLlegada : this.hoy();
    return this.cotizacionesService.sumarDias(base, 1);
  }

  errorLlegada(): string {
    if (this.fechaLlegada === '' && !this.mostrarErrores) {
      return '';
    }
    return this.cotizacionesService.errorLlegada(this.fechaLlegada);
  }
  errorSalida(): string {
    if (this.fechaSalida === '' && !this.mostrarErrores) {
      return '';
    }
    return this.cotizacionesService.errorSalida(this.fechaLlegada, this.fechaSalida);
  }
  errorHuespedes(alojamiento: AlojamientoModel): string {
    return this.cotizacionesService.errorHuespedes(this.huespedes, alojamiento.capacidad);
  }

  cotizacion(alojamiento: AlojamientoModel): CotizacionModel | null {
    if (!this.cotizacionesService.esValida(alojamiento, this.fechaLlegada, this.fechaSalida, this.huespedes)) {
      return null;
    }
    return this.cotizacionesService.calcular(
      alojamiento,
      this.fechaLlegada,
      this.fechaSalida,
      this.huespedes ?? 0,
    );
  }

  reservar(alojamiento: AlojamientoModel): void {
    this.mostrarErrores = true;
    const resultado: CotizacionModel | null = this.cotizacion(alojamiento);
    if (resultado === null) {
      this.notificador.error('Revisa las fechas y el número de huéspedes antes de reservar.', 'Cotización no válida');
      return;
    }
    this.cotizacionesService.guardar(resultado);
    this.notificador.exito('Cotización generada por $' + resultado.total.toLocaleString('es-CO') + '.');
    this.enrutador.navigate(['/reserva']);
  }
}
