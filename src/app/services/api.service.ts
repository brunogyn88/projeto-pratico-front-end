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

  salvaInfomacoesDesaparecido(
    file: File,
    informacao: string,
    descricao: string,
    data: string,
    ocoId: number
  ): Observable<any> {
    const headers = new HttpHeaders({
      Accept: '*/*',
    });
    const formData = new FormData();
    formData.append('files', file, file.name);

    // Monta os parâmetros da URL
    let params = new HttpParams()
      .set('informacao', informacao)
      .set('descricao', descricao)
      .set('data', data)
      .set('ocoId', ocoId.toString());

    return this.http.post<any>(
      `${this.apiUrl}/ocorrencias/informacoes-desaparecido`,
      formData,
      { headers, params }
    );
  }
}
