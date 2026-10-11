import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class Notificador {
  private toastr: ToastrService = inject(ToastrService);

  exito(mensaje: string, titulo: string = 'Éxito'): void {
    this.toastr.success(mensaje, titulo);
  }

  error(mensaje: string, titulo: string = 'Error'): void {
    this.toastr.error(mensaje, titulo);
  }

  info(mensaje: string, titulo: string = 'Información'): void {
    this.toastr.info(mensaje, titulo);
  }

  advertencia(mensaje: string, titulo: string = 'Atención'): void {
    this.toastr.warning(mensaje, titulo);
  }

  segunEstado(codigo: number, mensajeExito: string): void {
    if (codigo >= 200 && codigo < 300) {
      this.exito(mensajeExito + ' (código ' + codigo + ').');
    } else if (codigo >= 400 && codigo < 500) {
      this.error('La petición no es válida (código ' + codigo + ').');
    } else if (codigo >= 500) {
      this.error('Ocurrió un error en el servidor (código ' + codigo + ').');
    } else {
      this.info('Respuesta con código ' + codigo + '.');
    }
  }
}
