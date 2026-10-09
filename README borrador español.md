# Marketplace de Alojamientos - Alojamientos LR

## Descripción

Aplicación web (solo frontend) para **Inversiones LR**, empresa que administra propiedades destinadas a
alojamientos temporales. Permite que un huésped explore los alojamientos disponibles, los filtre, consulte
su detalle, obtenga una cotización de su estadía, registre una reserva simulada y consulte las reservas
realizadas durante la ejecución de la aplicación.

Proyecto del curso **Desarrollo de Sistemas de Información 3** - Ingeniería de Sistemas, Universidad El Bosque.

## Integrantes

- Laura Gabriela Díaz Amaya
- Vivian Sofía Sierra Rivera
- Sergio Alejandro Parra Rivera
- Jesús David Vega Malaver

## Tecnologías utilizadas

- Angular 22 (componentes no standalone con `NgModule`, sintaxis de control de flujo `@if`, `@for`, `@empty`)
- TypeScript
- Bootstrap 5.3 (CDN)
- Font Awesome 6.5 (CDN)
- Animate.css 4.1 (CDN)
- ngx-toastr (notificaciones)
- Google Fonts: Outfit e Inter (tipografías del prototipo en Figma)
- `HttpClient` para leer el archivo JSON y `localStorage` para guardar las reservas

## Requisitos para ejecutar la aplicación

- Node.js 20 o superior (probado con Node.js 24)
- npm 10 o superior
- Angular CLI 22 
- Conexión a internet (Bootstrap, Font Awesome, Animate.css y las fuentes se cargan por CDN)
- Instalación del --legacy-peer-deps

## Instrucciones de instalación

```bash
git clone <URL-del-repositorio>
cd ProyectoMarketplaceAlojamientos
npm install --legacy-peer-deps
```

## Instrucciones de ejecución

```bash
npm start
```

Luego abrir `http://localhost:4200/` en el navegador.

Para generar la versión de producción:

```bash
npm run build
```

## Principales funcionalidades

- **Página inicial:** nombre de la plataforma, breve descripción, alojamientos destacados y acceso a la búsqueda.
- **Listado de alojamientos:** imagen, nombre, ciudad, tipo, capacidad, precio por noche, calificación y servicios.
- **Búsqueda y filtrado:** por ciudad, número de huéspedes, tipo y precio máximo. Los filtros cambian el listado
  dinámicamente, existe la opción **Limpiar Filtro** y se informa cuando no hay resultados.
- **Detalle del alojamiento:** descripción, ubicación, tipo, capacidad, habitaciones, camas, baños, precio,
  tarifa de limpieza, servicios, reglas, calificación, reseñas e imágenes.
- **Cotización:** fecha de llegada, fecha de salida y número de huéspedes. Calcula noches, subtotal
  (noches × precio por noche), tarifa de limpieza, tarifa de servicio (10 % del subtotal) y total.
- **Simulación de reserva:** solicita nombre y correo del huésped y registra la reserva con estado `CONFIRMADA`.
- **Mis reservas:** muestra alojamiento, ciudad, fechas, huéspedes, valor total y estado; si no hay reservas
  se muestra un mensaje.
- Notificaciones con **ngx-toastr** y mensajes de error en los formularios.

### Reglas de negocio implementadas

- La fecha de salida debe ser posterior a la fecha de llegada.
- La fecha de llegada no puede ser anterior a la fecha actual.
- El número de huéspedes debe ser mayor que cero y no puede superar la capacidad del alojamiento.
- No se muestran alojamientos inactivos ni con precio por noche menor o igual a cero.
- La cotización solo se genera cuando las fechas y los huéspedes son válidos.
- La reserva solo se puede realizar después de generar una cotización válida.
- La tarifa de servicio corresponde al 10 % del subtotal.

## Rutas de la aplicación

| Ruta | Componente | Descripción |
| --- | --- | --- |
| `/principal` | `Principalcomponent` | Página inicial |
| `/alojamientos` | `Listadoalojamientoscomponent` | Listado y filtros |
| `/alojamiento/:id` | `Detallealojamientocomponent` | Detalle de un alojamiento |
| `/cotizacion/:id` | `Cotizacioncomponent` | Cotización de la estadía |
| `/reserva` | `Reservacomponent` | Formulario de reserva |
| `/mis-reservas` | `Reservascomponent` | Reservas realizadas |

## Estructura general del proyecto

```
src/
├── assets/
│   ├── data/marketplace-data.json      # Datos de alojamientos y reseñas
│   └── images/                         # Imágenes de los alojamientos
├── app/
│   ├── components/
│   │   ├── navbarcomponent/            # Navegación
│   │   ├── footercomponent/            # Pie de página
│   │   ├── principalcomponent/         # Página inicial
│   │   ├── listadoalojamientoscomponent/  # Listado y filtros
│   │   ├── detallealojamientocomponent/   # Detalle del alojamiento
│   │   ├── cotizacioncomponent/        # Formulario de cotización
│   │   ├── reservacomponent/           # Formulario de reserva
│   │   └── misreservascomponent/       # Consulta de reservas
│   ├── models/                         # Interfaces TypeScript
│   │   ├── alojamiento.model.ts
│   │   ├── resena.model.ts
│   │   ├── marketplace-data.model.ts
│   │   ├── filtro.model.ts
│   │   ├── cotizacion.model.ts
│   │   └── reserva.model.ts
│   ├── services/
│   │   ├── alojamientos.ts             # Acceso a datos (lee el JSON con HttpClient)
│   │   ├── cotizaciones.ts             # Reglas y cálculo de la cotización
│   │   ├── reservas.ts                 # Manejo de reservas (localStorage)
│   │   └── notificador.ts              # Notificaciones con ngx-toastr
│   ├── app-module.ts
│   └── app-routing-module.ts
├── index.html
└── styles.css                          # Colores y estilos compartidos del prototipo
```

## Datos de la aplicación

Los datos se encuentran en `src/assets/data/marketplace-data.json` y solo se consultan a través del servicio
`Alojamientos`. Se conservó la estructura del archivo suministrado y se complementó con cuatro alojamientos
adicionales (Apartaestudio en Bogotá, Apartamento Duplex en Cali, Casa en Chía y Apartamento en Cajicá), algunas
reseñas y las rutas de las imágenes disponibles en `src/assets/images`.
