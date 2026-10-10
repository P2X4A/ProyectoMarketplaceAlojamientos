import { AlojamientoModel } from './alojamiento.model';
import { ResenaModel } from './resena.model';

export interface MarketplaceDataModel {
  alojamientos: AlojamientoModel[];
  resenas: ResenaModel[];
}
