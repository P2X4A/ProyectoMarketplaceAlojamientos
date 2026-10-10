import { Injectable, signal, WritableSignal } from '@angular/core';
import { AlojamientoModel } from '../models/alojamiento.model';
import { CotizacionModel } from '../models/cotizacion.model';

@Injectable({ providedIn: 'root' })
export class Cotizaciones {
  private readonly claveAlmacen: string = 'alojamientoslr_cotizacion';
  readonly porcentajeServicio: number = 0.1;

  cotizacionActual: WritableSignal<CotizacionModel | null> = signal(this.leerDeAlmacen());


  aTexto(fecha: Date): string {
    const mes: string = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia: string = String(fecha.getDate()).padStart(2, '0');
    return fecha.getFullYear() + '-' + mes + '-' + dia;
  }

  aFecha(texto: string): Date {
    const partes: number[] = texto.split('-').map((parte: string) => Number(parte));
    return new Date(partes[0], partes[1] - 1, partes[2]);
  }
  hoy(): string {
    return this.aTexto(new Date());
  }
  sumarDias(texto: string, dias: number): string {
    const fecha: Date = this.aFecha(texto);
    fecha.setDate(fecha.getDate() + dias);
    return this.aTexto(fecha);
  }
  calcularNoches(llegada: string, salida: string): number {
    const milisegundosDia: number = 1000 * 60 * 60 * 24;
    const diferencia: number = this.aFecha(salida).getTime() - this.aFecha(llegada).getTime();
    return Math.round(diferencia / milisegundosDia);
  }

  errorLlegada(llegada: string): string {
    if (llegada === '') {
      return 'Selecciona la fecha de llegada.';
    }
    if (llegada < this.hoy()) {
      return 'La fecha de llegada no puede ser anterior a la fecha actual.';
    }
    return '';
  }
  errorSalida(llegada: string, salida: string): string {
    if (salida === '') {
      return 'Selecciona la fecha de salida.';
    }
    if (llegada !== '' && salida <= llegada) {
      return 'La fecha de salida debe ser posterior a la fecha de llegada.';
    }
    return '';
  }
  errorHuespedes(huespedes: number | null, capacidad: number): string {
    if (huespedes === null || huespedes <= 0) {
      return 'El número de huéspedes debe ser mayor que cero.';
    }
    if (!Number.isInteger(huespedes)) {
      return 'El número de huéspedes debe ser un número entero.';
    }
    if (huespedes > capacidad) {
      return 'El número de huéspedes no puede superar la capacidad del alojamiento (' + capacidad + ').';
    }
    return '';
  }
  esValida(alojamiento: AlojamientoModel, llegada: string, salida: string, huespedes: number | null): boolean {
    return (
      alojamiento.precioNoche > 0 &&
      this.errorLlegada(llegada) === '' &&
      this.errorSalida(llegada, salida) === '' &&
      this.errorHuespedes(huespedes, alojamiento.capacidad) === ''
    );
  }

  calcular(alojamiento: AlojamientoModel, llegada: string, salida: string, huespedes: number): CotizacionModel {
    const noches: number = this.calcularNoches(llegada, salida);
    const subtotal: number = noches * alojamiento.precioNoche;
    const tarifaServicio: number = Math.round(subtotal * this.porcentajeServicio);
    return {
      alojamientoId: alojamiento.id,
      nombreAlojamiento: alojamiento.nombre,
      ciudad: alojamiento.ciudad,
      tipo: alojamiento.tipo,
      precioNoche: alojamiento.precioNoche,
      fechaLlegada: llegada,
      fechaSalida: salida,
      huespedes: huespedes,
      noches: noches,
      subtotal: subtotal,
      tarifaLimpieza: alojamiento.tarifaLimpieza,
      tarifaServicio: tarifaServicio,
      total: subtotal + alojamiento.tarifaLimpieza + tarifaServicio,
    };
  }

  guardar(cotizacion: CotizacionModel): void {
    this.cotizacionActual.set(cotizacion);
    localStorage.setItem(this.claveAlmacen, JSON.stringify(cotizacion));
  }
  limpiar(): void {
    this.cotizacionActual.set(null);
    localStorage.removeItem(this.claveAlmacen);
  }
  private leerDeAlmacen(): CotizacionModel | null {
    const guardado: string | null = localStorage.getItem(this.claveAlmacen);
    return guardado !== null ? JSON.parse(guardado) : null;
  }
}
