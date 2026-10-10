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
