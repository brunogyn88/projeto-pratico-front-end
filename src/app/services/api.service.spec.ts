import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  PaginatedResponse,
  PessoaDesaparecida,
} from '../model/pessoasDesaparecidas';
import { HttpParams } from '@angular/common/http';

describe('ApiService', () => {
  let service: ApiService;

  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });

  it('should fetch a specific desaparecido by ID', () => {
    const mockPessoa: PessoaDesaparecida = {
      id: 1,
      nome: 'John Doe',
      idade: 30,
      sexo: 'Masculino',
      vivo: false,
      urlFoto: 'https://example.com/foto.jpg',
      ultimaOcorrencia: {} as any,
    };

    service.getDesaparecido(1).subscribe((pessoa) => {
      expect(pessoa).toEqual(mockPessoa);
    });

    const req = httpMock.expectOne('https://abitus-api.geia.vip/v1/pessoas/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockPessoa);
  });

  it('should fetch a paginated list of desaparecidos with filters', () => {
    const mockResponse: PaginatedResponse<PessoaDesaparecida> = {
      totalPages: 1,
      totalElements: 2,
      size: 2,
      number: 0,
      first: true,
      last: true,
      numberOfElements: 2,
      pageable: {
        pageNumber: 0,
        pageSize: 2,
        sort: {
          sorted: false,
          unsorted: true,
          empty: false,
        },
        offset: 0,
        paged: true,
        unpaged: false,
      },
      content: [
        {
          id: 1,
          nome: 'John Doe',
          idade: 30,
          sexo: 'Masculino',
          vivo: false,
          urlFoto: 'https://example.com/foto1.jpg',
          ultimaOcorrencia: {} as any,
        },
        {
          id: 2,
          nome: 'Jane Doe',
          idade: 25,
          sexo: 'Feminino',
          vivo: true,
          urlFoto: 'https://example.com/foto2.jpg',
          ultimaOcorrencia: {} as any,
        },
      ],
      sort: {
        sorted: false,
        unsorted: true,
        empty: false,
      },
      empty: false,
    };

    const params = new HttpParams().set('idade', '30').set('sexo', 'Masculino');

    service.getDesaparecidos(params).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      (request) =>
        request.url ===
          'https://abitus-api.geia.vip/v1/pessoas/aberto/filtro' &&
        request.params.get('idade') === '30' &&
        request.params.get('sexo') === 'Masculino'
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
