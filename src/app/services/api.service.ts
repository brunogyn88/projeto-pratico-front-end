import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PessoaDesaparecida } from '../model/pessoasDesaparecidas';

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
}
