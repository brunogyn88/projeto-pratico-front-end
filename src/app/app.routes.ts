import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import(
        './pages/pessoas-desaparecidas/pessoas-desaparecidas.component'
      ).then((m) => m.PessoasDesaparecidasComponent),
  },
  {
    path: 'pessoas-detalhamento',
    loadComponent: () =>
      import(
        './pages/pessoas-detalhamento/pessoas-detalhamento.component'
      ).then((m) => m.PessoasDetalhamentoComponent),
  },
];
