import { Injectable, signal, WritableSignal } from '@angular/core';
import { CotizacionModel } from '../models/cotizacion.model';
import { ReservaModel } from '../models/reserva.model';


@Injectable({ providedIn: 'root' })
export class Reservas {
  private readonly claveAlmacen: string = 'alojamientoslr_reservas';
  readonly estadoInicial: string = 'CONFIRMADA';

  reservas: WritableSignal<ReservaModel[]> = signal(this.leerDeAlmacen());

  tieneReservas(): boolean {
    return this.reservas().length > 0;
  }
  generarId(): string {
    const consecutivo: number = this.reservas().length + 1;
    return 'RES-' + String(consecutivo).padStart(4, '0');
  }
  crear(cotizacion: CotizacionModel, nombre: string, correo: string): ReservaModel {
    const nueva: ReservaModel = {
      id: this.generarId(),
      alojamiento: {
        id: cotizacion.alojamientoId,
        nombre: cotizacion.nombreAlojamiento,
        ciudad: cotizacion.ciudad,
        tipo: cotizacion.tipo,
      },
      fechaLlegada: cotizacion.fechaLlegada,
      fechaSalida: cotizacion.fechaSalida,
      huespedes: cotizacion.huespedes,
      noches: cotizacion.noches,
      total: cotizacion.total,
      nombreHuesped: nombre.trim(),
      correo: correo.trim(),
      estado: this.estadoInicial,
    };
    this.reservas.set([...this.reservas(), nueva]);
    this.persistir();
    return nueva;
  }
  private leerDeAlmacen(): ReservaModel[] {
    const guardado: string | null = localStorage.getItem(this.claveAlmacen);
    return guardado !== null ? JSON.parse(guardado) : [];
  }
  private persistir(): void {
    localStorage.setItem(this.claveAlmacen, JSON.stringify(this.reservas()));
  }
}
