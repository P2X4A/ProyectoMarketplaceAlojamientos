import { Component } from '@angular/core';

@Component({
  selector: 'app-footercomponent',
  standalone: false,
  styleUrl: './footercomponent.css',
  templateUrl: './footercomponent.html',
})
export class Footercomponent {
  integrantes: string[] = [
    'Laura Gabriela Díaz Amaya',
    'Vivian Sofía Sierra Rivera',
    'Sergio Alejandro Parra Rivera',
    'Jesús David Vega Malaver',
  ];
}
