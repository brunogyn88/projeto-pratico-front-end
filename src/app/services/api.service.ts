import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  PaginatedResponse,
  PessoaDesaparecida,
} from '../model/pessoasDesaparecidas';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly API_URL = 'https://abitus-api.geia.vip/v1';
  private readonly DEFAULT_HEADERS = new HttpHeaders({ Accept: '*/*' });

  constructor(private readonly http: HttpClient) {}

  getDesaparecidos(
    params: HttpParams
  ): Observable<PaginatedResponse<PessoaDesaparecida>> {
    return this.http.get<PaginatedResponse<PessoaDesaparecida>>(
      `${this.API_URL}/pessoas/aberto/filtro`,
      { params }
    );
  }

  getDesaparecido(pessoaId: number): Observable<PessoaDesaparecida> {
    return this.http.get<PessoaDesaparecida>(
      `${this.API_URL}/pessoas/${pessoaId}`
    );
  }

  salvarInformacoesDesaparecido(informacoes: FormData): Observable<any> {
    return this.http.post<any>(
      `${this.API_URL}/ocorrencias/informacoes-desaparecido`,
      informacoes,
      { headers: this.DEFAULT_HEADERS }
    );
  }

  getInformacoesDesaparecido(
    ocorrenciaId: number
  ): Observable<PessoaDesaparecida> {
    return this.http.get<PessoaDesaparecida>(
      `${this.API_URL}/ocorrencias/informacoes-desaparecido?ocorrenciaId=${ocorrenciaId}`
    );
  }
}
