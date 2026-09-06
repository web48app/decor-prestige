import { Ruler, Layers, FileText, Scissors, Hammer } from 'lucide-react';

export const steps = [
  {
    id:    'pomiar',
    num:   '01',
    title: 'Pomiar',
    sub:   'u klienta',
    icon:  Ruler,
  },
  {
    id:    'wybor',
    num:   '02',
    title: 'Wybór',
    sub:   'materiału',
    icon:  Layers,
  },
  {
    id:    'wycena',
    num:   '03',
    title: 'Indywidualna',
    sub:   'wycena',
    icon:  FileText,
  },
  {
    id:    'szycie',
    num:   '04',
    title: 'Szycie',
    sub:   'dekoracji',
    icon:  Scissors,
  },
  {
    id:    'montaz',
    num:   '05',
    title: 'Montaż',
    sub:   'u klienta',
    icon:  Hammer,
  },
];