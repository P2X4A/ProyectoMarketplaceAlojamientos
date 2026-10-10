export interface CotizacionModel {
  alojamientoId: number;
  nombreAlojamiento: string;
  ciudad: string;
  tipo: string;
  precioNoche: number;
  fechaLlegada: string;
  fechaSalida: string;
  huespedes: number;
  noches: number;
  subtotal: number;
  tarifaLimpieza: number;
  tarifaServicio: number;
  total: number;
}
