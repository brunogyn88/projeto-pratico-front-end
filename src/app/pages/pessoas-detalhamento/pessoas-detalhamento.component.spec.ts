import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoasDetalhamentoComponent } from './pessoas-detalhamento.component';

describe('PessoasDetalhamentoComponent', () => {
  let component: PessoasDetalhamentoComponent;
  let fixture: ComponentFixture<PessoasDetalhamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PessoasDetalhamentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PessoasDetalhamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
