import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { AlojamientoModel } from '../../models/alojamiento.model';
import { ResenaModel } from '../../models/resena.model';
import { MarketplaceDataModel } from '../../models/marketplace-data.model';
import { Alojamientos } from '../../services/alojamientos';
import { Notificador } from '../../services/notificador';

@Component({
  selector: 'app-detallealojamientocomponent',
  standalone: false,
  styleUrl: './detallealojamientocomponent.css',
  templateUrl: './detallealojamientocomponent.html',
})
export class Detallealojamientocomponent implements OnInit {
  alojamientosService: Alojamientos = inject(Alojamientos);
  notificador: Notificador = inject(Notificador);
  ruta: ActivatedRoute = inject(ActivatedRoute);

  id: WritableSignal<number> = signal(0);

  ngOnInit(): void {
    this.cargarAlojamientos();
    this.ruta.paramMap.subscribe((parametros: ParamMap) => {
      this.id.set(Number(parametros.get('id') ?? 0));
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

  alojamiento(): AlojamientoModel | undefined {
    return this.alojamientosService.obtenerPorId(this.id());
  }
  resenas(): ResenaModel[] {
    return this.alojamientosService.resenasDe(this.id());
  }

  ubicacionCompleta(alojamiento: AlojamientoModel): string {
    if (alojamiento.ubicacion.includes(alojamiento.ciudad)) {
      return alojamiento.ubicacion;
    }
    return alojamiento.ubicacion + ', ' + alojamiento.ciudad;
  }
  imagenesSecundarias(alojamiento: AlojamientoModel): string[] {
    return alojamiento.imagenes
      .filter((imagen: string) => imagen !== alojamiento.imagenPrincipal)
      .slice(0, 2);
  }
  estrellas(cantidad: number): number[] {
    return Array.from({ length: Math.round(cantidad) }, (_valor: unknown, indice: number) => indice);
  }
}
