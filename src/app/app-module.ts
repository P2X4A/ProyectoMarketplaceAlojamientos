import { NgModule, provideBrowserGlobalErrorListeners, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeEsCo from '@angular/common/locales/es-CO';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Principalcomponent } from './components/principalcomponent/principalcomponent';
import { Navbarcomponent } from './components/navbarcomponent/navbarcomponent';
import { Footercomponent } from './components/footercomponent/footercomponent';
import { Listadoalojamientoscomponent } from './components/listadoalojamientoscomponent/listadoalojamientoscomponent';
import { Detallealojamientocomponent } from './components/detallealojamientocomponent/detallealojamientocomponent';
import { Cotizacioncomponent } from './components/cotizacioncomponent/cotizacioncomponent';
import { Reservacomponent } from './components/reservacomponent/reservacomponent';
import { Reservascomponent } from './components/misreservascomponent/reservascomponent';

registerLocaleData(localeEsCo, 'es-CO');

@NgModule({
  declarations: [
    App,
    Principalcomponent,
    Navbarcomponent,
    Footercomponent,
    Listadoalojamientoscomponent,
    Detallealojamientocomponent,
    Cotizacioncomponent,
    Reservacomponent,
    Reservascomponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-top-right',
      progressBar: true,
      preventDuplicates: true,
      closeButton: true,
    }),
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    { provide: LOCALE_ID, useValue: 'es-CO' },
  ],
  bootstrap: [App],
})
export class AppModule {}
