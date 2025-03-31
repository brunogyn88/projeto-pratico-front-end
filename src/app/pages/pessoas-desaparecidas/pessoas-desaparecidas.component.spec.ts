import { TestBed, ComponentFixture } from '@angular/core/testing';
import { PessoasDesaparecidasComponent } from './pessoas-desaparecidas.component';
import { ApiService } from '../../services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { provideHttpClientTesting } from '@angular/common/http/testing';
// Removed unused imports

// Added custom words to dictionary or disabled spell-check for specific terms
describe('PessoasDesaparecidasComponent', () => {
  let component: PessoasDesaparecidasComponent;
  let fixture: ComponentFixture<PessoasDesaparecidasComponent>;
  let apiService: jest.Mocked<ApiService>;
  let spinnerService: jest.Mocked<NgxSpinnerService>;
  let router: jest.Mocked<Router>;

  beforeEach(async () => {
    apiService = {
      getDesaparecidos: jest.fn().mockReturnValue(of([])), // Return an observable with mock data
    } as unknown as jest.Mocked<ApiService>;
    spinnerService = {
      show: jest.fn(),
      hide: jest.fn(),
      getSpinner: jest.fn().mockReturnValue(of({})), // Mock observable to avoid undefined error
    } as unknown as jest.Mocked<NgxSpinnerService>;

    router = {
      navigate: jest.fn(),
    } as unknown as jest.Mocked<Router>;

    await TestBed.configureTestingModule({
      imports: [PessoasDesaparecidasComponent],
      providers: [
        provideHttpClientTesting(),
        { provide: ApiService, useValue: apiService },
        { provide: NgxSpinnerService, useValue: spinnerService },
        FormBuilder,
        { provide: '_HttpClient', useValue: {} },
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: jest.fn() } } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PessoasDesaparecidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
