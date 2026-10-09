import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { AlojamientoModel } from '../../models/alojamiento.model';
import { MarketplaceDataModel } from '../../models/marketplace-data.model';
import { Alojamientos } from '../../services/alojamientos';
import { Notificador } from '../../services/notificador';

@Component({
  selector: 'app-principalcomponent',
  standalone: false,
  styleUrl: './principalcomponent.css',
  templateUrl: './principalcomponent.html',
})
export class Principalcomponent implements OnInit {
  alojamientosService: Alojamientos = inject(Alojamientos);
  notificador: Notificador = inject(Notificador);

  readonly cantidadDestacados: number = 6;

  ngOnInit(): void {
    this.cargarAlojamientos();
  }
  cargarAlojamientos(): void {
    if (this.alojamientosService.estanCargados()) {
      return;
    }
    this.alojamientosService.getDatos().subscribe({
      next: (respuesta: HttpResponse<MarketplaceDataModel>) => {
        this.alojamientosService.guardarDatos(respuesta.body);
        this.notificador.segunEstado(respuesta.status, 'Alojamientos cargados');
      },
      error: (error: HttpResponse<unknown>) => {
        this.alojamientosService.cargaFallida.set(true);
        this.notificador.error('No se pudieron cargar los alojamientos.', 'Error ' + error.status);
      },
    });
  }
  destacados(): AlojamientoModel[] {
    return this.alojamientosService.destacados(this.cantidadDestacados);
  }
}
