import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlojamientoModel } from '../models/alojamiento.model';
import { ResenaModel } from '../models/resena.model';
import { MarketplaceDataModel } from '../models/marketplace-data.model';
import { FiltroModel } from '../models/filtro.model';


@Injectable({ providedIn: 'root' })
export class Alojamientos {
  private cliente: HttpClient = inject(HttpClient);
  private readonly urlBase: string = 'assets/data/marketplace-data.json';

  alojamientos: WritableSignal<AlojamientoModel[]> = signal([]);
  resenas: WritableSignal<ResenaModel[]> = signal([]);
  cargaFallida: WritableSignal<boolean> = signal(false);

  getDatos() {
    return this.cliente.get<MarketplaceDataModel>(this.urlBase, { observe: 'response' });
  }
  estanCargados(): boolean {
    return this.alojamientos().length > 0;
  }
  guardarDatos(datos: MarketplaceDataModel | null): void {
    this.alojamientos.set(datos?.alojamientos ?? []);
    this.resenas.set(datos?.resenas ?? []);
    this.cargaFallida.set(false);
  }

  activos(): AlojamientoModel[] {
    return this.alojamientos().filter(
      (alojamiento: AlojamientoModel) => alojamiento.activo && alojamiento.precioNoche > 0,
    );
  }
  destacados(cantidad: number): AlojamientoModel[] {
    return this.activos().slice(0, cantidad);
  }
  obtenerPorId(id: number): AlojamientoModel | undefined {
    return this.activos().find((alojamiento: AlojamientoModel) => alojamiento.id === id);
  }
  resenasDe(alojamientoId: number): ResenaModel[] {
    return this.resenas().filter((resena: ResenaModel) => resena.alojamientoId === alojamientoId);
  }

  ciudades(): string[] {
    const lista: string[] = this.activos().map((alojamiento: AlojamientoModel) => alojamiento.ciudad);
    return [...new Set(lista)].sort((a: string, b: string) => a.localeCompare(b));
  }
  tipos(): string[] {
    const lista: string[] = this.activos().map((alojamiento: AlojamientoModel) => alojamiento.tipo);
    return [...new Set(lista)].sort((a: string, b: string) => a.localeCompare(b));
  }

  filtrar(filtro: FiltroModel): AlojamientoModel[] {
    return this.activos().filter((alojamiento: AlojamientoModel) => {
      if (filtro.ciudad !== '' && alojamiento.ciudad !== filtro.ciudad) {
        return false;
      }
      if (filtro.tipo !== '' && alojamiento.tipo !== filtro.tipo) {
        return false;
      }
      if (filtro.huespedes !== null && alojamiento.capacidad < filtro.huespedes) {
        return false;
      }
      if (filtro.precioMaximo !== null && alojamiento.precioNoche > filtro.precioMaximo) {
        return false;
      }
      return true;
    });
  }

  iconoPorTipo(tipo: string): string {
    const texto: string = tipo.toLowerCase();
    if (texto.includes('casa') || texto.includes('cabaña')) {
      return 'fa-solid fa-house-chimney';
    }
    return 'fa-solid fa-building';
  }
}
