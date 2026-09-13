export const products = [
  {
    id:          'zaslony',
    title:       'Zasłony',
    image:       '/zaslony.png',
    alt:         'Zasłony — DECOR-PRESTIGE',
    shortDesc:   'Eleganckie tkaniny, które nadają wnętrzu charakter i ciepło.',
    description: 'Zasłony to ponadczasowe rozwiązanie, które decyduje o klimacie całego wnętrza. Szyjemy je wyłącznie na miarę — z precyzyjnie dobranych tkanin, w idealnie dopasowanych wymiarach. Efekt? Okna wyglądające jak ze stron projektowych magazynów.',
    features: [
      'Szycie na miarę do każdego okna',
      'Bogaty wybór tkanin i kolorów',
      'Efektowne fałdowania i plisy',
      'Montaż w cenie usługi',
    ],
  },
  {
    id:          'tkaniny',
    title:       'Tkaniny',
    image:       '/tkaniny.png',
    alt:         'Tkaniny — DECOR-PRESTIGE',
    shortDesc:   'Starannie dobrane materiały o wyjątkowej jakości i fakturze.',
    description: 'Podstawą każdej dekoracji okna jest jakość tkaniny. Oferujemy szeroki dobór materiałów — od lekkich woali i organzy, przez gęste welury, po nowoczesne tkaniny techniczne. Pomagamy dobrać fakturę, gramaturę i kolor idealnie pasujący do Twojego wnętrza.',
    features: [
      'Tkaniny od sprawdzonych dostawców',
      'Próbki dostępne podczas wizyty domowej',
      'Szeroki wybór gramatur i faktur',
      'Materiały łatwe w pielęgnacji',
    ],
  },
  {
    id:          'plisy',
    title:       'Plisy',
    image:       '/plisy.png',
    alt:         'Plisy — DECOR-PRESTIGE',
    shortDesc:   'Nowoczesna regulacja światła — minimalizm w najczystszej formie.',
    description: 'Plisy łączą funkcjonalność z estetyką minimalizmu. Doskonałe do nowoczesnych wnętrz, biur i przestrzeni, gdzie liczy się precyzyjna kontrola nasłonecznienia. Dostępne w wersjach dzień/noc, z regulacją od góry, od dołu lub z obu stron.',
    features: [
      'Precyzyjna kontrola światła',
      'Wersja dzień/noc',
      'Regulacja od góry i od dołu',
      'Idealne do okien niestandardowych',
    ],
  },
  {
    id:          'rolety',
    title:       'Rolety',
    image:       '/rolety.png',
    alt:         'Rolety — DECOR-PRESTIGE',
    shortDesc:   'Praktyczne i eleganckie — od blackout po transparentne.',
    description: 'Rolety to jedno z najbardziej wszechstronnych rozwiązań okiennych. Oferujemy rolety zaciemniające (blackout), transparentne, screen i wiele innych typów. Idealnie wpasowują się zarówno w klasyczne, jak i nowoczesne aranżacje.',
    features: [
      'Rolety blackout, screen i transparentne',
      'Kasety ozdobne i prowadnice',
      'Napędy elektryczne na zamówienie',
      'Dobór pod kąt padania światła',
    ],
  },
  {
    id:          'karnisze',
    title:       'Karnisze',
    image:       '/karnisze.png',
    alt:         'Karnisze — DECOR-PRESTIGE',
    shortDesc:   'Dekoracyjne wsporniki, które dopełniają każdą aranżację.',
    description: 'Karnisz to nie tylko element techniczny — to wykończenie, które nadaje oknu finalny charakter. Oferujemy karnisze dekoracyjne, sufitowe i ścienne w różnych materiałach i wykończeniach. Dopasowujemy model do stylu wnętrza i ciężaru tkaniny.',
    features: [
      'Modele dekoracyjne i sufitowe',
      'Wykończenia: złoto, srebro, czerń, drewno',
      'Karnisze pojedyncze i podwójne',
      'Montaż i regulacja w cenie',
    ],
  },
];

/* Kategorie dla strony Realizacje */
export const realizacjeCategories = [
  { id: 'wszystkie', label: 'Wszystkie' },
  { id: 'zaslony',   label: 'Zasłony'  },
  { id: 'tkaniny',   label: 'Tkaniny'  },
  { id: 'plisy',     label: 'Plisy'    },
  { id: 'rolety',    label: 'Rolety'   },
  { id: 'karnisze',  label: 'Karnisze' },
];

/* Placeholder realizacje — zastąpić prawdziwymi zdjęciami klientki */
export const realizacje = [
  { id: 'r01', category: 'zaslony',  image: '/zaslony.png',  alt: 'Zasłony — realizacja 1',  title: 'Salon, Tarnów'         },
  { id: 'r02', category: 'rolety',   image: '/rolety.png',   alt: 'Rolety — realizacja 1',   title: 'Biuro, Tarnów'         },
  { id: 'r03', category: 'plisy',    image: '/plisy.png',    alt: 'Plisy — realizacja 1',    title: 'Sypialnia, Kraków'     },
  { id: 'r04', category: 'zaslony',  image: '/zaslony.png',  alt: 'Zasłony — realizacja 2',  title: 'Salon, Nowy Sącz'      },
  { id: 'r05', category: 'karnisze', image: '/karnisze.png', alt: 'Karnisze — realizacja 1', title: 'Korytarz, Tarnów'      },
  { id: 'r06', category: 'tkaniny',  image: '/tkaniny.png',  alt: 'Tkaniny — realizacja 1',  title: 'Jadalnia, Tarnów'      },
  { id: 'r07', category: 'rolety',   image: '/rolety.png',   alt: 'Rolety — realizacja 2',   title: 'Gabinet, Bochnia'      },
  { id: 'r08', category: 'zaslony',  image: '/zaslony.png',  alt: 'Zasłony — realizacja 3',  title: 'Sypialnia, Tarnów'     },
  { id: 'r09', category: 'plisy',    image: '/plisy.png',    alt: 'Plisy — realizacja 2',    title: 'Kuchnia, Rzeszów'      },
  { id: 'r10', category: 'tkaniny',  image: '/tkaniny.png',  alt: 'Tkaniny — realizacja 2',  title: 'Salon, Tarnów'         },
  { id: 'r11', category: 'karnisze', image: '/karnisze.png', alt: 'Karnisze — realizacja 2', title: 'Salon, Dębica'         },
  { id: 'r12', category: 'zaslony',  image: '/zaslony.png',  alt: 'Zasłony — realizacja 4',  title: 'Pokój dziecięcy, Tarnów' },
];
