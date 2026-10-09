import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Principalcomponent } from './components/principalcomponent/principalcomponent';
import { Listadoalojamientoscomponent } from './components/listadoalojamientoscomponent/listadoalojamientoscomponent';
import { Detallealojamientocomponent } from './components/detallealojamientocomponent/detallealojamientocomponent';
import { Cotizacioncomponent } from './components/cotizacioncomponent/cotizacioncomponent';
import { Reservacomponent } from './components/reservacomponent/reservacomponent';
import { Reservascomponent } from './components/misreservascomponent/reservascomponent';

const routes: Routes = [

  { path: '', redirectTo: 'principal', pathMatch: 'full' },
  { path: 'principal', component: Principalcomponent },
  { path: 'alojamientos', component: Listadoalojamientoscomponent },
  { path: 'alojamiento/:id', component: Detallealojamientocomponent },
  { path: 'cotizacion/:id', component: Cotizacioncomponent },
  { path: 'reserva', component: Reservacomponent },
  { path: 'mis-reservas', component: Reservascomponent },
  { path: '**', redirectTo: 'principal' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
