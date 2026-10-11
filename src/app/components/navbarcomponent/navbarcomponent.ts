import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbarcomponent',
  standalone: false,
  styleUrl: './navbarcomponent.css',
  templateUrl: './navbarcomponent.html',
})
export class Navbarcomponent implements OnInit {
  enrutador: Router = inject(Router);

  urlActual: WritableSignal<string> = signal('');

  ngOnInit(): void {
    this.urlActual.set(this.enrutador.url);
    this.enrutador.events.subscribe((evento: Event) => {
      if (evento instanceof NavigationEnd) {
        this.urlActual.set(evento.urlAfterRedirects);
      }
    });
  }

  seccionActiva(): string {
    const url: string = this.urlActual();
    if (url.startsWith('/mis-reservas') || url.startsWith('/reserva')) {
      return 'reservas';
    }
    if (url.startsWith('/alojamiento') || url.startsWith('/cotizacion')) {
      return 'alojamientos';
    }
    return 'inicio';
  }
}
