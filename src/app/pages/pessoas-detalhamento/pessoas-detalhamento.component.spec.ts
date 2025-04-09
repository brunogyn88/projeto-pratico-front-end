import { TestBed } from '@angular/core/testing';
import { PessoasDetalhamentoComponent } from './pessoas-detalhamento.component';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { PessoasInclusaoInformacoesComponent } from '../pessoas-inclusao-informacoes/pessoas-inclusao-informacoes.component';

describe('PessoasDetalhamentoComponent', () => {
  let component: PessoasDetalhamentoComponent;
  let apiServiceMock: any;
  let spinnerServiceMock: any;
  let locationMock: any;
  let dialogMock: any;

  beforeEach(async () => {
    apiServiceMock = {
      getInformacoesDesaparecido: jest.fn().mockReturnValue(of({})),
      getDesaparecido: jest.fn().mockReturnValue(of({})),
      salvarInformacoesDesaparecido: jest.fn(),
      getDesaparecidos: jest.fn(),
    };
    spinnerServiceMock = {
      show: jest.fn(),
      hide: jest.fn(),
    };
    locationMock = {
      back: jest.fn(),
    };
    dialogMock = {
      open: jest.fn().mockReturnValue({
        afterClosed: jest.fn().mockReturnValue(of(true)),
      }),
    };

    await TestBed.configureTestingModule({
      imports: [PessoasDetalhamentoComponent], // Move here
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: { get: jest.fn().mockReturnValue('1') },
              queryParamMap: { get: jest.fn().mockReturnValue('1') },
            },
          },
        },
        { provide: ApiService, useValue: apiServiceMock },
        { provide: NgxSpinnerService, useValue: spinnerServiceMock },
        { provide: Location, useValue: locationMock },
        { provide: MatDialog, useValue: dialogMock },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(PessoasDetalhamentoComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load pessoa details on init', () => {
    const pessoaMock = { id: 1, nome: 'Test' };
    apiServiceMock.getInformacoesDesaparecido.mockReturnValue(of(pessoaMock));

    component.ngOnInit();

    expect(spinnerServiceMock.show).toHaveBeenCalled();
    expect(apiServiceMock.getInformacoesDesaparecido).toHaveBeenCalledWith(1);
    expect(spinnerServiceMock.hide).toHaveBeenCalled();
  });

  it('should handle error when fetching pessoa details', () => {
    const errorMock = new Error('Error fetching details');
    apiServiceMock.getInformacoesDesaparecido.mockReturnValue(
      throwError(() => errorMock)
    );

    component.ngOnInit();

    expect(spinnerServiceMock.show).toHaveBeenCalled();
    expect(apiServiceMock.getInformacoesDesaparecido).toHaveBeenCalledWith(1);
    expect(spinnerServiceMock.hide).toHaveBeenCalled();
  });

  it('should navigate back when voltar is called', () => {
    component.voltar();
    expect(locationMock.back).toHaveBeenCalled();
  });

  it('should handle image error and set default image', () => {
    const eventMock = { target: { src: '' } } as unknown as Event;
    component.onImageError(eventMock);
    expect((eventMock.target as HTMLImageElement).src).toBe(
      'assets/sem-imagem.png'
    );
  });

  it('should open dialog and reload pessoa details when incluirMaisInformacoes is called', () => {
    const pessoaMock = {
      id: 1,
      nome: 'Test',
      idade: 30,
      sexo: 'M',
      ultimaOcorrencia: {
        ocoId: 123,
        dtDesaparecimento: '2023-01-01',
        dataLocalizacao: '2023-01-02',
        encontradoVivo: true,
        localDesaparecimentoConcat: 'City, State',
        descricao: 'Description of the occurrence',
        ocorrenciaEntrevDesapDTO: {} as any,
        listaCartaz: [],
      },
      vivo: true,
      urlFoto: 'https://example.com/foto.jpg',
    };
    component.pessoa = pessoaMock;

    component.incluirMaisInformacoes();

    expect(dialogMock.open).toHaveBeenCalledWith(
      PessoasInclusaoInformacoesComponent,
      {
        width: '800px',
        data: { id: 123 },
      }
    );
    expect(dialogMock.open().afterClosed).toHaveBeenCalled();
  });
});
