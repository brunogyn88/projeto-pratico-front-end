import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PessoaDesaparecida } from '../../model/pessoasDesaparecidas';
import { ApiService } from '../../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { PessoasInclusaoInformacoesComponent } from '../pessoas-inclusao-informacoes/pessoas-inclusao-informacoes.component';

@Component({
  selector: 'app-pessoas-detalhamento',
  imports: [MatCardModule, ReactiveFormsModule, CommonModule, NgxSpinnerModule],
  templateUrl: './pessoas-detalhamento.component.html',
  styleUrls: ['./pessoas-detalhamento.component.scss'],
})
export class PessoasDetalhamentoComponent implements OnInit {
  situacao = 'Desaparecido';
  pessoa: PessoaDesaparecida | null = null;
  informacoesDesaparecidos: any[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly apiService: ApiService,
    private readonly spinnerService: NgxSpinnerService,
    private readonly location: Location,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadPessoaDetalhes();
    this.getInformacoesPessoasDesaparecidas();
  }

  private loadPessoaDetalhes(): void {
    const id = this.getPessoaIdFromRoute();
    if (id) {
      this.fetchPessoaDetalhes(id);
    }
  }

  private getInformacoesPessoasDesaparecidas(): void {
    const ocoId = this.getPessoaOcoIdFromRoute();
    this.spinnerService.show();
    if (!ocoId) {
      this.spinnerService.hide();
      return;
    }
    this.apiService.getInformacoesDesaparecido(ocoId).subscribe({
      next: (response) => this.handleGetPessoasSuccess(response),
      error: (error) => this.handleGetPessoasError(error),
    });
  }

  private handleGetPessoasError(error: any): void {
    this.spinnerService.hide();
  }

  private handleGetPessoasSuccess(response: any): void {
    this.informacoesDesaparecidos = response || '';
    this.spinnerService.hide();
  }

  private getPessoaIdFromRoute(): number | null {
    const id = this.route.snapshot.queryParamMap.get('id');
    return id ? Number(id) : null;
  }

  private getPessoaOcoIdFromRoute(): number | null {
    const ocoId = this.route.snapshot.queryParamMap.get('ocoId');
    return ocoId ? Number(ocoId) : null;
  }

  private fetchPessoaDetalhes(id: number): void {
    this.spinnerService.show();
    this.apiService.getDesaparecido(id).subscribe({
      next: (response) => this.handlePessoaDetalhesSuccess(response),
      error: (error) => this.handlePessoaDetalhesError(error),
    });
  }

  private handlePessoaDetalhesSuccess(response: PessoaDesaparecida): void {
    this.pessoa = response;
    this.spinnerService.hide();
  }

  private handlePessoaDetalhesError(error: any): void {
    this.spinnerService.hide();
  }

  voltar(): void {
    this.location.back();
  }

  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/sem-imagem.png';
  }

  incluirMaisInformacoes(): void {
    const dialogRef = this.dialog.open(PessoasInclusaoInformacoesComponent, {
      width: '800px',
      data: {
        id: this.pessoa?.ultimaOcorrencia?.ocoId,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadPessoaDetalhes();
        this.getInformacoesPessoasDesaparecidas();
      }
    });
  }
}
