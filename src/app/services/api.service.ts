import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  PaginatedResponse,
  PessoaDesaparecida,
} from '../model/pessoasDesaparecidas';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://abitus-api.geia.vip/v1';

  constructor(private http: HttpClient) {}

  getMotivos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/ocorrencias/motivos`);
  }

  getPessoasDesaparecidas(): Observable<PessoaDesaparecida[]> {
    return this.http.get<PessoaDesaparecida[]>(
      `${this.apiUrl}/pessoas/aberto/dinamico`
    );
  }

  getDesaparecidos(
    params: HttpParams
  ): Observable<PaginatedResponse<PessoaDesaparecida>> {
    return this.http.get<PaginatedResponse<PessoaDesaparecida>>(
      `${this.apiUrl}/pessoas/aberto/filtro`,
      {
        params: params,
      }
    );
  }

  getOcorrencia(ocorrencia_id: number): Observable<PessoaDesaparecida[]> {
    return this.http.get<PessoaDesaparecida[]>(
      `${this.apiUrl}/ocorrencias/informacoes-desaparecido?ocorrenciald=${ocorrencia_id}`
    );
  }

  getDesaparecido(pessoa_id: number): Observable<PessoaDesaparecida> {
    return this.http.get<PessoaDesaparecida>(
      `${this.apiUrl}/pessoas/${pessoa_id}`
    );
  }

  salvaInfomacoesDesaparecido(informacoes: FormData): Observable<any> {
    const headers = { 'Content-Type': 'multipart/form-data' };
    return this.http.post<any>(
      `${this.apiUrl}/ocorrencias/informacoes-desaparecido`,
      informacoes,
      { headers }
    );
  }
}
