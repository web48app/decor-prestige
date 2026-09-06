# DECOR-PRESTIGE

Strona internetowa dla DECOR-PRESTIGE — dekoracje okien, Barbara Charchut, Tarnów.

## Stack

- React + Vite
- JavaScript (JSX)
- CSS Modules + globalne zmienne CSS
- Vercel (hosting)

## Struktura projektu

```
src/
├── assets/          # zdjęcia, ikony, logo
├── components/
│   ├── layout/      # Navbar, Footer
│   ├── sections/    # Hero, Services, Products...
│   └── ui/          # Container, Button, SectionHeading
├── data/            # site.js, services.js, products.js
└── styles/          # globals, variables, typography, utilities
```

## Uruchomienie lokalne

```bash
npm install
npm run dev
```

Otwórz [http://localhost:5173](http://localhost:5173)

## Build

```bash
npm run build
```

Pliki wyjściowe trafią do folderu `dist/`.

## Preview buildu

```bash
npm run preview
```

## Deploy

Projekt jest skonfigurowany pod Vercel. Wystarczy połączyć repozytorium z projektem w Vercel — każdy push do `main` uruchomi automatyczny deploy.

## Kontakt klientki

Barbara Charchut  
ul. Brama Pilzneńska 5, 33-100 Tarnów  
tel. 660 69 478  
kontakt@decor-prestige.pl
