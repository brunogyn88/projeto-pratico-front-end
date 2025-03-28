import { Component, OnInit } from '@angular/core';
import { PessoaDesaparecida } from '../../model/pessoasDesaparecidas';
import { ApiService } from '../../services/api.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-pessoas-desaparecidas',
  templateUrl: './pessoas-desaparecidas.component.html',
  styleUrl: './pessoas-desaparecidas.component.scss',
  imports: [MatCardModule, CommonModule, DatePipe],
})
export class PessoasDesaparecidasComponent implements OnInit {
  listaPessoasDesaparecidas: PessoaDesaparecida[] = [];
  constructor(private pessoasDesaparecidasService: ApiService) {}

  ngOnInit(): void {
    this.getPessoasDesaparecidas();
  }

  getPessoasDesaparecidas(): void {
    this.pessoasDesaparecidasService.getPessoasDesaparecidas().subscribe({
      next: (pessoas: PessoaDesaparecida[]) => {
        debugger;
        this.listaPessoasDesaparecidas = pessoas;
      },
      error: (err: any) => {
        console.error('Error fetching pessoas desaparecidas', err);
      },
    });
  }
}
