import { Component, OnInit } from '@angular/core';
import {
  PaginatedResponse,
  PessoaDesaparecida,
} from '../../model/pessoasDesaparecidas';
import { ApiService } from '../../services/api.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule, DatePipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormControl } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-pessoas-desaparecidas',
  templateUrl: './pessoas-desaparecidas.component.html',
  styleUrl: './pessoas-desaparecidas.component.scss',
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    CommonModule,
    DatePipe,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    NgxSpinnerModule,
  ],
})
export class PessoasDesaparecidasComponent implements OnInit {
  listaPessoasDesaparecidas: PessoaDesaparecida[] = [];
  formGroup: any;
  paginaAtual: number = 0;
  totalPaginas: number = 0;
  itensPorPagina: number = 10;
  totalRegistros: number = 0;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private spinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.fetchPessoasDesaparecidas(this.paginaAtual);
  }

  private initializeForm(): void {
    this.formGroup = this.formBuilder.group({
      nome: [''],
      faixaIdadeInicial: [null],
      faixaIdadeFinal: [null],
      sexo: [''],
      status: [''],
    });
  }

  async fetchPessoasDesaparecidas(pagina: number): Promise<void> {
    if (!this.formGroup.valid) {
      return;
    }

    this.spinnerService.show();
    try {
      const params = this.createHttpParams(pagina);
      const response = await this.apiService
        .getDesaparecidos(params)
        .toPromise();

      if (response) {
        this.updatePagination(response);
        this.listaPessoasDesaparecidas = response.content || [];
      }
    } catch (error) {
      this.handleFetchError(error);
    } finally {
      this.spinnerService.hide();
    }
  }

  private createHttpParams(pagina: number): HttpParams {
    const { nome, faixaIdadeInicial, faixaIdadeFinal, sexo, status } =
      this.formGroup.value;

    return new HttpParams()
      .set('nome', nome || '')
      .set('faixaIdadeInicial', faixaIdadeInicial || '')
      .set('faixaIdadeFinal', faixaIdadeFinal || '')
      .set('sexo', sexo || '')
      .set('status', status || '')
      .set('porPagina', this.itensPorPagina.toString())
      .set('pagina', pagina.toString());
  }

  private updatePagination(
    response: PaginatedResponse<PessoaDesaparecida>
  ): void {
    this.listaPessoasDesaparecidas = response.content;
    this.totalPaginas = response.totalPages;
    this.totalRegistros = response.totalElements;
    this.paginaAtual = response.number;
    this.itensPorPagina = response.size;
  }

  private handleFetchError(error: any): void {
    console.error('Error fetching pessoas desaparecidas:', error);
    this.resetPagination();
    this.resetForm();
  }

  private resetPagination(): void {
    this.listaPessoasDesaparecidas = [];
    this.totalPaginas = 0;
    this.totalRegistros = 0;
    this.paginaAtual = 0;
    this.itensPorPagina = 0;
  }

  private resetForm(): void {
    this.formGroup.reset();
    this.initializeForm();
  }

  onPageChange(event: any): void {
    this.paginaAtual = event.pageIndex;
    this.itensPorPagina = event.pageSize;
    this.fetchPessoasDesaparecidas(this.paginaAtual);
  }

  redirectToDetalhamento(id: number): void {}
}
