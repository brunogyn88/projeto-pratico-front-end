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
import { FormBuilder } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-pessoas-desaparecidas',
  templateUrl: './pessoas-desaparecidas.component.html',
  styleUrl: './pessoas-desaparecidas.component.scss',
  imports: [
    MatCardModule,
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
  paginaAtual: number = 1;
  totalPaginas: number = 0;
  itensPorPagina: number = 5;
  totalRegistros: number = 0;

  constructor(
    private pessoasDesaparecidasService: ApiService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    // this.getPessoasDesaparecidas();
    this.initialFormGroup();
    this.pesquisar(this.paginaAtual);
  }

  initialFormGroup(): void {
    this.formGroup = this.fb.group({
      nome: [''],
      faixaIdadeInicial: [null],
      faixaIdadeFinal: [null],
      sexo: [''],
      status: [''],
    });
  }

  getPessoasDesaparecidas(): void {
    this.pessoasDesaparecidasService.getPessoasDesaparecidas().subscribe({
      next: (pessoas: PessoaDesaparecida[]) => {
        this.listaPessoasDesaparecidas = pessoas;
      },
      error: (err: any) => {
        console.error('Error fetching pessoas desaparecidas', err);
      },
    });
  }
  async pesquisar(pagina: number): Promise<void> {
    this.spinner.show();
    if (this.formGroup.valid) {
      const params = new HttpParams()
        .set('nome', this.formGroup.get('nome')?.value || '')
        .set(
          'faixaIdadeInicial',
          this.formGroup.get('faixaIdadeInicial')?.value || ''
        )
        .set(
          'faixaIdadeFinal',
          this.formGroup.get('faixaIdadeFinal')?.value || ''
        )
        .set('porPagina', this.itensPorPagina.toString() || '5')
        .set('pagina', this.paginaAtual.toString() || '0');
      this.paginaAtual = pagina;
      this.itensPorPagina = 5;
      this.totalPaginas = 0;
      this.totalRegistros = 0;
      await this.pessoasDesaparecidasService
        .getDesaparecidos(params)
        .subscribe({
          next: (response: PaginatedResponse<PessoaDesaparecida>) => {
            this.spinner.hide();
            this.listaPessoasDesaparecidas = response.content;
            this.totalPaginas = response.totalPages;
            this.totalRegistros = response.totalElements;
            this.paginaAtual = response.number;
            this.itensPorPagina = response.size;
          },
          error: (err: any) => {
            this.spinner.hide();
            this.listaPessoasDesaparecidas = [];
            this.totalPaginas = 0;
            this.totalRegistros = 0;
            this.paginaAtual = 0;
            this.itensPorPagina = 0;
            this.formGroup.reset();
            this.initialFormGroup();
            console.error('Error fetching pessoas desaparecidas', err);
          },
        });
    }
  }

  onPageChange(event: any): void {
    this.paginaAtual = event.pageIndex + 1; // pageIndex is zero-based
    this.itensPorPagina = event.pageSize;
    this.totalPaginas = event.length;
    this.totalRegistros = event.length;
    this.pesquisar(this.paginaAtual);
  }
}
