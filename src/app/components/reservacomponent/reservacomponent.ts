import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CotizacionModel } from '../../models/cotizacion.model';
import { ReservaModel } from '../../models/reserva.model';
import { Cotizaciones } from '../../services/cotizaciones';
import { Reservas } from '../../services/reservas';
import { Notificador } from '../../services/notificador';

@Component({
  selector: 'app-reservacomponent',
  standalone: false,
  styleUrl: './reservacomponent.css',
  templateUrl: './reservacomponent.html',
})
export class Reservacomponent {
  cotizacionesService: Cotizaciones = inject(Cotizaciones);
  reservasService: Reservas = inject(Reservas);
  notificador: Notificador = inject(Notificador);
  enrutador: Router = inject(Router);
  nombreHuesped: string = '';
  correo: string = '';
  mostrarErrores: boolean = false;

  // La reserva solo se puede hacer si existe una cotización válida generada previamente
  cotizacion(): CotizacionModel | null {
    return this.cotizacionesService.cotizacionActual();
  }
  fecha(texto: string): Date {
    return this.cotizacionesService.aFecha(texto);
  }

  errorNombre(): string {
    if (!this.mostrarErrores && this.nombreHuesped === '') {
      return '';
    }
    if (this.nombreHuesped.trim().length < 3) {
      return 'Ingresa el nombre del huésped (mínimo 3 caracteres).';
    }
    return '';
  }
  errorCorreo(): string {
    if (!this.mostrarErrores && this.correo === '') {
      return '';
    }
    const patron: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!patron.test(this.correo.trim())) {
      return 'Ingresa un correo electrónico válido.';
    }
    return '';
  }

  confirmarReserva(): void {
    const actual: CotizacionModel | null = this.cotizacion();
    if (actual === null) {
      this.notificador.error('Primero debes generar una cotización válida.');
      return;
    }
    this.mostrarErrores = true;
    if (this.errorNombre() !== '' || this.errorCorreo() !== '') {
      this.notificador.error('Revisa el nombre y el correo electrónico.', 'Datos incompletos');
      return;
    }
    // Se vuelve a validar la fecha por si la cotización quedó guardada de otro día
    const errorFecha: string = this.cotizacionesService.errorLlegada(actual.fechaLlegada);
    if (errorFecha !== '') {
      this.notificador.error(errorFecha + ' Genera una nueva cotización.', 'Cotización vencida');
      return;
    }

    const reserva: ReservaModel = this.reservasService.crear(actual, this.nombreHuesped, this.correo);
    this.cotizacionesService.limpiar();
    this.notificador.exito('Tu reserva ' + reserva.id + ' quedó en estado ' + reserva.estado + '.', '¡Reserva confirmada!');
    this.enrutador.navigate(['/mis-reservas']);
  }
}
