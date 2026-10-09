import { Component, inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { AlojamientoModel } from '../../models/alojamiento.model';
import { MarketplaceDataModel } from '../../models/marketplace-data.model';
import { FiltroModel } from '../../models/filtro.model';
import { Alojamientos } from '../../services/alojamientos';
import { Notificador } from '../../services/notificador';

@Component({
  selector: 'app-listadoalojamientoscomponent',
  standalone: false,
  styleUrl: './listadoalojamientoscomponent.css',
  templateUrl: './listadoalojamientoscomponent.html',
})
export class Listadoalojamientoscomponent implements OnInit {
  alojamientosService: Alojamientos = inject(Alojamientos);
  notificador: Notificador = inject(Notificador);
  ciudad: string = '';
  huespedes: number | null = null;
  tipo: string = '';
  precioMaximo: number | null = null;
  mensajeFiltro: string = '';

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

  errorHuespedes(): string {
    if (this.huespedes !== null && (this.huespedes <= 0 || !Number.isInteger(this.huespedes))) {
      return 'El número de huéspedes debe ser un número entero mayor que cero.';
    }
    return '';
  }
  errorPrecio(): string {
    if (this.precioMaximo !== null && this.precioMaximo <= 0) {
      return 'El precio máximo debe ser mayor que cero.';
    }
    return '';
  }

  construirFiltro(): FiltroModel {
    return {
      ciudad: this.ciudad,
      huespedes: this.errorHuespedes() === '' ? this.huespedes : null,
      tipo: this.tipo,
      precioMaximo: this.errorPrecio() === '' ? this.precioMaximo : null,
    };
  }
  hayFiltros(): boolean {
    return this.ciudad !== '' || this.tipo !== '' || this.huespedes !== null || this.precioMaximo !== null;
  }

  listar(): AlojamientoModel[] {
    return this.alojamientosService.filtrar(this.construirFiltro());
  }

  cambiarFiltro(): void {
    this.mensajeFiltro = '';
  }

  buscar(): void {
    if (!this.hayFiltros()) {
      this.mensajeFiltro = 'Selecciona al menos un filtro antes de buscar.';
      this.notificador.advertencia(this.mensajeFiltro);
      return;
    }
    if (this.errorHuespedes() !== '' || this.errorPrecio() !== '') {
      this.mensajeFiltro = 'Revisa los valores de los filtros.';
      this.notificador.error('Hay filtros con valores no válidos.');
      return;
    }
    this.mensajeFiltro = '';
    const cantidad: number = this.listar().length;
    if (cantidad === 0) {
      this.notificador.advertencia('No se encontraron alojamientos con esos filtros.');
    } else {
      this.notificador.info('Se encontraron ' + cantidad + ' alojamiento(s).', 'Búsqueda');
    }
  }

  limpiarFiltros(): void {
    this.ciudad = '';
    this.huespedes = null;
    this.tipo = '';
    this.precioMaximo = null;
    this.mensajeFiltro = '';
    this.notificador.info('Se limpiaron los filtros.', 'Filtros');
  }
}
