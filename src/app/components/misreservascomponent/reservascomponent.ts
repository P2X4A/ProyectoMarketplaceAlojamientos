import { Component, inject, LOCALE_ID } from '@angular/core';
import { formatDate } from '@angular/common';
import { ReservaModel } from '../../models/reserva.model';
import { Reservas } from '../../services/reservas';
import { Cotizaciones } from '../../services/cotizaciones';
import { Alojamientos } from '../../services/alojamientos';

@Component({
  selector: 'app-misreservascomponent',
  standalone: false,
  styleUrl: './reservascomponent.css',
  templateUrl: './reservascomponent.html',
})
export class Reservascomponent {
  reservasService: Reservas = inject(Reservas);
  cotizacionesService: Cotizaciones = inject(Cotizaciones);
  alojamientosService: Alojamientos = inject(Alojamientos);
  idioma: string = inject(LOCALE_ID);

  listar(): ReservaModel[] {
    return this.reservasService.reservas();
  }

  rangoFechas(reserva: ReservaModel): string {
    const llegada: Date = this.cotizacionesService.aFecha(reserva.fechaLlegada);
    const salida: Date = this.cotizacionesService.aFecha(reserva.fechaSalida);
    const textoSalida: string = formatDate(salida, 'd MMM. y', this.idioma);
    if (llegada.getFullYear() !== salida.getFullYear()) {
      return formatDate(llegada, 'd MMM. y', this.idioma) + ' - ' + textoSalida;
    }
    if (llegada.getMonth() !== salida.getMonth()) {
      return formatDate(llegada, 'd MMM.', this.idioma) + ' - ' + textoSalida;
    }
    return formatDate(llegada, 'd', this.idioma) + ' - ' + textoSalida;
  }
}
