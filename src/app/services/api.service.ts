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
  private apiUrl = 'https://abitus-api.geia.vip/v1';

  constructor(private http: HttpClient) {}

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

  getDesaparecido(pessoa_id: number): Observable<PessoaDesaparecida> {
    return this.http.get<PessoaDesaparecida>(
      `${this.apiUrl}/pessoas/${pessoa_id}`
    );
  }

  salvaInfomacoesDesaparecido(informacoes: FormData): Observable<any> {
    const headers = new HttpHeaders({
      Accept: '*/*',
    });
    return this.http.post<any>(
      `${this.apiUrl}/ocorrencias/informacoes-desaparecido`,
      informacoes,
      { headers }
    );
  }
}
