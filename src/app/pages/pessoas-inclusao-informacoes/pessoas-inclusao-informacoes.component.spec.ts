import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoasInclusaoInformacoesComponent } from './pessoas-inclusao-informacoes.component';

describe('PessoasInclusaoInformacoesComponent', () => {
  let component: PessoasInclusaoInformacoesComponent;
  let fixture: ComponentFixture<PessoasInclusaoInformacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PessoasInclusaoInformacoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PessoasInclusaoInformacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
