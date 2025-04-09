import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
} from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { ApiService } from '../../services/api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

const MY_DATE_FORMAT = {
  parse: { dateInput: 'DD/MM/YYYY' },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-pessoas-inclusao-informacoes',
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxSpinnerModule,
  ],
  templateUrl: './pessoas-inclusao-informacoes.component.html',
  styleUrls: ['./pessoas-inclusao-informacoes.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PessoasInclusaoInformacoesComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private dialogRef: MatDialogRef<PessoasInclusaoInformacoesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private spinnerService: NgxSpinnerService
  ) {
    this.form = this.initializeForm();
  }

  ngOnInit(): void {}

  private initializeForm(): FormGroup {
    return this.fb.group({
      informacao: ['', Validators.required],
      descricao: ['', Validators.required],
      data: [null, Validators.required],
      files: [null, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.spinnerService.show();
    const formData = this.createFormData();

    this.apiService.salvarInformacoesDesaparecido(formData).subscribe({
      next: (response) => this.onSuccess(response),
      error: (error) => this.onError(error),
    });
  }

  private createFormData(): FormData {
    const formData = new FormData();
    const { informacao, descricao, data } = this.form.value;

    formData.append('informacao', informacao);
    formData.append('descricao', descricao);

    const formattedDate = this.formatDate(data);
    if (formattedDate) {
      formData.append('data', formattedDate);
    }

    formData.append('ocoId', this.data?.id.toString());

    const file = this.getSelectedFile();
    if (file) {
      formData.append('files', file);
    }

    return formData;
  }

  private formatDate(date: any): string | null {
    return date ? new Date(date).toISOString().split('T')[0] : null;
  }

  private getSelectedFile(): File | null {
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    return fileInput?.files?.[0] || null;
  }

  private onSuccess(response: any): void {
    this.spinnerService.hide();
    this.dialogRef.close(response);
  }

  private onError(error: any): void {
    this.spinnerService.hide();
  }
}
