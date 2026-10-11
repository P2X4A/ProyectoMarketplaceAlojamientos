export interface AlojamientoReservaModel {
  id: number;
  nombre: string;
  ciudad: string;
  tipo: string;
}

// Reserva simulada que se almacena en localStorage
export interface ReservaModel {
  id: string;
  alojamiento: AlojamientoReservaModel;
  fechaLlegada: string;
  fechaSalida: string;
  huespedes: number;
  noches: number;
  total: number;
  nombreHuesped: string;
  correo: string;
  estado: string;
}
