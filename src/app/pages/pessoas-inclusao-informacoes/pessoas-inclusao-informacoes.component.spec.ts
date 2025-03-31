import { TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../../services/api.service';
import { PessoasInclusaoInformacoesComponent } from './pessoas-inclusao-informacoes.component';
import { of, throwError } from 'rxjs';

describe('PessoasInclusaoInformacoesComponent', () => {
  let component: PessoasInclusaoInformacoesComponent;
  let apiService: jest.Mocked<ApiService>;
  let dialogRef: jest.Mocked<MatDialogRef<PessoasInclusaoInformacoesComponent>>;
  let spinnerService: jest.Mocked<NgxSpinnerService>;

  beforeEach(() => {
    apiService = {
      salvaInfomacoesDesaparecido: jest.fn(),
    } as unknown as jest.Mocked<ApiService>;

    dialogRef = {
      close: jest.fn(),
    } as unknown as jest.Mocked<
      MatDialogRef<PessoasInclusaoInformacoesComponent>
    >;

    spinnerService = {
      show: jest.fn(),
      hide: jest.fn(),
    } as unknown as jest.Mocked<NgxSpinnerService>;

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: ApiService, useValue: apiService },
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: { id: 1 } },
        { provide: NgxSpinnerService, useValue: spinnerService },
      ],
    });

    const fb = TestBed.inject(FormBuilder);
    component = new PessoasInclusaoInformacoesComponent(
      fb,
      apiService,
      dialogRef,
      { id: 1 },
      spinnerService
    );
  });

  it('should create the form on initialization', () => {
    expect(component.form).toBeDefined();
    expect(component.form.controls['informacao']).toBeDefined();
    expect(component.form.controls['descricao']).toBeDefined();
    expect(component.form.controls['data']).toBeDefined();
    expect(component.form.controls['files']).toBeDefined();
  });

  it('should not submit the form if it is invalid', () => {
    component.form.patchValue({
      informacao: '',
      descricao: '',
      data: null,
      files: null,
    });

    component.onSubmit();

    expect(spinnerService.show).not.toHaveBeenCalled();
    expect(apiService.salvaInfomacoesDesaparecido).not.toHaveBeenCalled();
  });

  it('should submit the form if it is valid', () => {
    const mockResponse = { success: true };
    apiService.salvaInfomacoesDesaparecido.mockReturnValue(of(mockResponse));

    component.form.patchValue({
      informacao: 'Test Info',
      descricao: 'Test Description',
      data: new Date(),
      files: new File([''], 'test-file.txt'),
    });

    component.onSubmit();

    expect(spinnerService.show).toHaveBeenCalled();
    expect(apiService.salvaInfomacoesDesaparecido).toHaveBeenCalled();
    expect(dialogRef.close).toHaveBeenCalledWith(mockResponse);
    expect(spinnerService.hide).toHaveBeenCalled();
  });

  it('should handle API errors gracefully', () => {
    const mockError = { message: 'Error occurred' };
    apiService.salvaInfomacoesDesaparecido.mockReturnValue(
      throwError(mockError)
    );

    component.form.patchValue({
      informacao: 'Test Info',
      descricao: 'Test Description',
      data: new Date(),
      files: new File([''], 'test-file.txt'),
    });

    component.onSubmit();

    expect(spinnerService.show).toHaveBeenCalled();
    expect(apiService.salvaInfomacoesDesaparecido).toHaveBeenCalled();
    expect(spinnerService.hide).toHaveBeenCalled();
    expect(dialogRef.close).not.toHaveBeenCalled();
  });

  it('should format the date correctly', () => {
    const date = new Date('2023-01-01');
    const formattedDate = component['formatDate'](date);
    expect(formattedDate).toBe('2023-01-01');
  });

  it('should return null if no file is selected', () => {
    jest.spyOn(document, 'querySelector').mockReturnValue(null);
    const file = component['getSelectedFile']();
    expect(file).toBeNull();
  });
});
