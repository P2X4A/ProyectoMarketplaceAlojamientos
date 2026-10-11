# Accommodation Marketplace - Alojamientos LR

## Description

Frontend-only web application for **Inversiones LR**, a company that manages properties for short-term rentals. A guest can browse available accommodations, filter them, view details, get a quote for a stay, create a simulated reservation, and review the reservations made while the application is running.

Course project for **Desarrollo de Sistemas de Información 3** - Systems Engineering, Universidad El Bosque.

## Team members

- Laura Gabriela Díaz Amaya
- Vivian Sofía Sierra Rivera
- Sergio Alejandro Parra Rivera
- Jesús David Vega Malaver

## Technologies

- Angular 22 (non-standalone components with `NgModule`, `@if`, `@for`, `@empty` control flow syntax)
- TypeScript
- Bootstrap 5.3 (CDN)
- Font Awesome 6.5 (CDN)
- Animate.css 4.1 (CDN)
- ngx-toastr (notifications)
- Google Fonts: Outfit and Inter (prototype typography from Figma)
- `HttpClient` to load the JSON file and `localStorage` to persist reservations

## Requirements

| Requirement | Version | How to check |
| --- | --- | --- |
| Node.js | 20 or higher (tested with Node.js 24) | `node -v` |
| npm | 10 or higher | `npm -v` |
| Angular CLI | 22 | `npx ng version` |
| Internet connection | Required | Bootstrap, Font Awesome, Animate.css and fonts load from CDN |
| Git | Any recent version | `git --version` |

## Installation

Follow these steps exactly. The detailed explanation below is intentional so the application runs on the first try.

### 1. Clone the repository

```bash
git clone https://github.com/P2X4A/ProyectoMarketplaceAlojamientos.git
```

### 2. Enter the project folder

```bash
cd ProyectoMarketplaceAlojamientos
```

> On Windows, if your path contains spaces, always quote it, for example:
> `cd "C:\Users\Example\Documents\ProyectoMarketplaceAlojamientos"`.

### 3. Verify your environment

```bash
node -v
npm -v
npx ng version
```

Expected: Node.js 20+, npm 10+, Angular CLI 22. If any command fails, install or update that tool before continuing.

### 4. Install dependencies

```bash
npm install --legacy-peer-deps
```

Why `--legacy-peer-deps`? The `ngx-toastr` peer dependencies are not fully aligned with Angular 22, so a plain `npm install` fails with an `ERESOLVE` error. The flag above is the supported installation path for this project.

What success looks like:

- A `node_modules/` folder is created.
- The command finishes without `ERESOLVE` errors.
- No manual editing of `package.json` is needed.

If the installation fails:

- Delete `node_modules/` and `package-lock.json` only if they are incomplete, then run the same install command again.
- Make sure you have an active internet connection, because several packages and all UI libraries are downloaded from remote registries and CDNs.

### 5. Confirm the assets are present

After installation, verify that these paths exist:

- `src/assets/data/marketplace-data.json`
- `src/assets/images/`
- `src/app/app-module.ts`
- `src/app/app-routing-module.ts`

If any of them is missing, you cloned an incomplete copy. Clone again from the URL above.

## Running the application

Start the development server:

```bash
npm start
```

Then open `http://localhost:4200/` in your browser.

To build the production version:

```bash
npm run build
```

To run the unit tests:

```bash
npm test
```

Troubleshooting:

- `Port 4200 is already in use`: stop the other process or run `npx ng serve --port 4201`.
- Blank styles or missing icons: check your internet connection, since Bootstrap, Font Awesome, Animate.css and Google Fonts load from CDN.
- `ERESOLVE` during install: you skipped `--legacy-peer-deps`. Run the install command exactly as documented.

## Main features

- **Home page:** platform name, short description, featured accommodations and access to search.
- **Accommodation listing:** image, name, city, type, capacity, price per night, rating and services.
- **Search and filtering:** by city, number of guests, type and maximum price. Filters update the list dynamically, there is a **Clear filters** option and an empty-state message when nothing matches.
- **Accommodation details:** description, location, type, capacity, rooms, beds, bathrooms, price, cleaning fee, services, rules, rating, reviews and images.
- **Quotation:** arrival date, departure date and number of guests. It calculates nights, subtotal (nights x price per night), cleaning fee, service fee (10% of the subtotal) and total.
- **Simulated reservation:** asks for guest name and email, then creates the reservation with status `CONFIRMADA`.
- **My reservations:** shows accommodation, city, dates, guests, total amount and status; an appropriate message is shown when there are no reservations.
- Notifications with **ngx-toastr** and inline form error messages.

### Business rules

- Departure date must be after arrival date.
- Arrival date cannot be before the current date.
- Guest count must be greater than zero and cannot exceed the accommodation capacity.
- Accommodations marked as inactive or with a nightly price less than or equal to zero are not shown.
- A quotation is generated only when dates and guests are valid.
- A reservation can only be created after a valid quotation.
- The service fee is 10% of the subtotal.

## Application routes

| Route | Component | Description |
| --- | --- | --- |
| `/principal` | `Principalcomponent` | Home page |
| `/alojamientos` | `Listadoalojamientoscomponent` | Listing and filters |
| `/alojamiento/:id` | `Detallealojamientocomponent` | Accommodation details |
| `/cotizacion/:id` | `Cotizacioncomponent` | Stay quotation |
| `/reserva` | `Reservacomponent` | Reservation form |
| `/mis-reservas` | `Reservascomponent` | Created reservations |

## Project structure

```text
src/
├── assets/
│   ├── data/marketplace-data.json      # Accommodation and review data
│   └── images/                         # Accommodation images
├── app/
│   ├── components/
│   │   ├── navbarcomponent/            # Navigation
│   │   ├── footercomponent/            # Footer
│   │   ├── principalcomponent/         # Home page
│   │   ├── listadoalojamientoscomponent/  # Listing and filters
│   │   ├── detallealojamientocomponent/   # Accommodation details
│   │   ├── cotizacioncomponent/        # Quotation form
│   │   ├── reservacomponent/           # Reservation form
│   │   └── misreservascomponent/       # Reservation lookup
│   ├── models/                         # TypeScript interfaces
│   │   ├── alojamiento.model.ts
│   │   ├── resena.model.ts
│   │   ├── marketplace-data.model.ts
│   │   ├── filtro.model.ts
│   │   ├── cotizacion.model.ts
│   │   └── reserva.model.ts
│   ├── services/
│   │   ├── alojamientos.ts             # Data access (reads JSON with HttpClient)
│   │   ├── cotizaciones.ts             # Quotation rules and calculation
│   │   ├── reservas.ts                 # Reservation handling (localStorage)
│   │   └── notificador.ts              # Notifications with ngx-toastr
│   ├── app-module.ts
│   └── app-routing-module.ts
├── index.html
└── styles.css                          # Shared prototype colors and styles
```

## Application data

Data lives in `src/assets/data/marketplace-data.json` and is only read through the `Alojamientos` service. The supplied structure was preserved and extended with four additional accommodations (Apartaestudio in Bogotá, Duplex Apartment in Cali, House in Chía and Apartment in Cajicá), extra reviews and the image paths available in `src/assets/images`.

The reference dataset used by the application is shown below in plain text:

```json
{
  "alojamientos": [
    {
      "id": 1,
      "nombre": "Loft moderno en Chapinero",
      "descripcion": "Loft moderno ubicado cerca de restaurantes, cafés y zonas comerciales de Bogotá.",
      "ciudad": "Bogotá",
      "ubicacion": "Chapinero, Bogotá",
      "tipo": "Apartamento",
      "capacidad": 2,
      "habitaciones": 1,
      "camas": 1,
      "banos": 1,
      "precioNoche": 180000,
      "tarifaLimpieza": 45000,
      "calificacion": 4.8,
      "activo": true,
      "imagenPrincipal": "assets/images/loft-bogota.jpg",
      "imagenes": [
        "assets/images/loft-bogota.jpg",
        "assets/images/loft-bogota-2.jpg"
      ],
      "servicios": [
        "Wi-Fi",
        "Cocina",
        "Televisión",
        "Lavadora"
      ],
      "reglas": [
        "No fumar",
        "No se permiten fiestas"
      ]
    },
    {
      "id": 2,
      "nombre": "Apartamento frente al mar",
      "descripcion": "Apartamento con vista al mar ubicado en una zona turística de Cartagena.",
      "ciudad": "Cartagena",
      "ubicacion": "Bocagrande, Cartagena",
      "tipo": "Apartamento",
      "capacidad": 5,
      "habitaciones": 2,
      "camas": 3,
      "banos": 2,
      "precioNoche": 420000,
      "tarifaLimpieza": 70000,
      "calificacion": 4.9,
      "activo": true,
      "imagenPrincipal": "assets/images/cartagena.jpg",
      "imagenes": [
        "assets/images/cartagena.jpg",
        "assets/images/cartagena-2.jpg"
      ],
      "servicios": [
        "Wi-Fi",
        "Piscina",
        "Aire acondicionado",
        "Cocina",
        "Parqueadero"
      ],
      "reglas": [
        "No fumar",
        "No mascotas"
      ]
    },
    {
      "id": 3,
      "nombre": "Cabaña en Guatapé",
      "descripcion": "Cabaña rodeada de naturaleza con vista al embalse de Guatapé.",
      "ciudad": "Guatapé",
      "ubicacion": "Guatapé, Antioquia",
      "tipo": "Cabaña",
      "capacidad": 6,
      "habitaciones": 3,
      "camas": 4,
      "banos": 2,
      "precioNoche": 350000,
      "tarifaLimpieza": 60000,
      "calificacion": 4.7,
      "activo": true,
      "imagenPrincipal": "assets/images/guatape.jpg",
      "imagenes": [
        "assets/images/guatape.jpg",
        "assets/images/guatape-2.jpg"
      ],
      "servicios": [
        "Wi-Fi",
        "Cocina",
        "Parqueadero",
        "BBQ"
      ],
      "reglas": [
        "No fumar",
        "Silencio después de las 10 PM"
      ]
    },
    {
      "id": 4,
      "nombre": "Casa colonial en Villa de Leyva",
      "descripcion": "Casa de estilo colonial localizada cerca de la plaza principal.",
      "ciudad": "Villa de Leyva",
      "ubicacion": "Centro histórico",
      "tipo": "Casa",
      "capacidad": 8,
      "habitaciones": 4,
      "camas": 5,
      "banos": 3,
      "precioNoche": 520000,
      "tarifaLimpieza": 90000,
      "calificacion": 4.6,
      "activo": true,
      "imagenPrincipal": "assets/images/villa-leyva.jpg",
      "imagenes": [
        "assets/images/villa-leyva.jpg",
        "assets/images/villa-leyva-2.jpg"
      ],
      "servicios": [
        "Wi-Fi",
        "Cocina",
        "Chimenea",
        "Parqueadero"
      ],
      "reglas": [
        "No fiestas",
        "Máximo 8 huéspedes"
      ]
    },
    {
      "id": 5,
      "nombre": "Apartamento ejecutivo Medellín",
      "descripcion": "Apartamento moderno cercano a zonas comerciales y empresariales.",
      "ciudad": "Medellín",
      "ubicacion": "El Poblado, Medellín",
      "tipo": "Apartamento",
      "capacidad": 3,
      "habitaciones": 1,
      "camas": 2,
      "banos": 1,
      "precioNoche": 230000,
      "tarifaLimpieza": 50000,
      "calificacion": 4.5,
      "activo": true,
      "imagenPrincipal": "assets/images/medellin.jpg",
      "imagenes": [
        "assets/images/medellin.jpg"
      ],
      "servicios": [
        "Wi-Fi",
        "Cocina",
        "Gimnasio",
        "Parqueadero"
      ],
      "reglas": [
        "No fumar"
      ]
    },
    {
      "id": 6,
      "nombre": "Casa campestre",
      "descripcion": "Casa campestre actualmente fuera de servicio.",
      "ciudad": "Armenia",
      "ubicacion": "Zona rural",
      "tipo": "Casa",
      "capacidad": 10,
      "habitaciones": 5,
      "camas": 7,
      "banos": 4,
      "precioNoche": 650000,
      "tarifaLimpieza": 120000,
      "calificacion": 4.4,
      "activo": false,
      "imagenPrincipal": "assets/images/armenia.jpg",
      "imagenes": [
        "assets/images/armenia.jpg"
      ],
      "servicios": [
        "Piscina",
        "Parqueadero",
        "BBQ"
      ],
      "reglas": [
        "No fiestas"
      ]
    }
  ],
  "resenas": [
    {
      "id": 1,
      "alojamientoId": 1,
      "usuario": "Laura Gómez",
      "calificacion": 5,
      "comentario": "Excelente ubicación y apartamento muy cómodo."
    },
    {
      "id": 2,
      "alojamientoId": 1,
      "usuario": "Carlos Ruiz",
      "calificacion": 4,
      "comentario": "Muy buena experiencia."
    },
    {
      "id": 3,
      "alojamientoId": 2,
      "usuario": "Andrea López",
      "calificacion": 5,
      "comentario": "La vista es excelente y la ubicación muy conveniente."
    },
    {
      "id": 4,
      "alojamientoId": 3,
      "usuario": "Miguel Torres",
      "calificacion": 5,
      "comentario": "Excelente lugar para descansar."
    },
    {
      "id": 5,
      "alojamientoId": 4,
      "usuario": "Natalia Pérez",
      "calificacion": 4,
      "comentario": "La casa es amplia y está muy bien ubicada."
    }
  ]
}
```
