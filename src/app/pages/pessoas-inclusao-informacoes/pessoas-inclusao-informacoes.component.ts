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
  MAT_NATIVE_DATE_FORMATS,
  MatNativeDateModule,
  NativeDateAdapter,
} from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { ApiService } from '../../services/api.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';

const MY_DATE_FORMAT = {
  parse: {
    dateInput: 'DD/MM/YYYY', // this is how your date will be parsed from Input
  },
  display: {
    dateInput: 'DD/MM/YYYY', // this is how your date will get displayed on the Input
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
  styleUrl: './pessoas-inclusao-informacoes.component.scss',
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT },
  ],
})
export class PessoasInclusaoInformacoesComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private dialog: MatDialogRef<PessoasInclusaoInformacoesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private spinnerService: NgxSpinnerService
  ) {
    this.form = this.fb.group({
      informacao: ['', Validators.required],
      descricao: ['', Validators.required],
      data: [null, Validators.required],
      files: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    console.log('Dialog Data:', this.data);
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.spinnerService.show();
      const formData = new FormData();
      formData.append('informacao', this.form.get('informacao')?.value);
      formData.append('descricao', this.form.get('descricao')?.value);
      const dataValue = this.form.get('data')?.value;
      if (dataValue) {
        const dataFormatada = new Date(dataValue).toISOString().split('T')[0];
        formData.append('data', dataFormatada);
      }

      formData.append('ocoId', this.data?.id.toString());

      const fileInput = document.querySelector(
        'input[type="file"]'
      ) as HTMLInputElement;
      if (fileInput?.files?.length) {
        formData.append('files', fileInput.files[0]);
      }

      this.apiService.salvaInfomacoesDesaparecido(formData).subscribe({
        next: (response) => {
          this.spinnerService.hide();
          this.dialog.close(response);
        },
        error: (error) => {
          this.spinnerService.hide();
          console.error('Erro ao salvar informações', error);
        },
      });
    }
  }
}
