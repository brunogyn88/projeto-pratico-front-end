import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PessoaDesaparecida } from '../../model/pessoasDesaparecidas';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pessoas-detalhamento',
  imports: [MatCardModule, ReactiveFormsModule, CommonModule, NgxSpinnerModule],
  templateUrl: './pessoas-detalhamento.component.html',
  styleUrl: './pessoas-detalhamento.component.scss',
})
export class PessoasDetalhamentoComponent implements OnInit {
  situacao: string = 'Desaparecido';
  pessoa: PessoaDesaparecida | null = null;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private spinnerService: NgxSpinnerService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.getPessoa(Number(id));
  }

  getPessoa(id: number) {
    this.spinnerService.show();
    this.apiService.getDesaparecido(id).subscribe(
      (response) => {
        this.pessoa = response;
        this.spinnerService.hide();
      },
      (error) => {
        console.error('Erro ao buscar ocorrência:', error);
        this.spinnerService.hide();
      }
    );
  }

  voltar() {
    this.location.back();
  }

  incluirMaisInformacoes() {}
}
