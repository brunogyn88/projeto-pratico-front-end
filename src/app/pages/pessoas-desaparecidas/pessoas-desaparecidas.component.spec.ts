import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoasDesaparecidasComponent } from './pessoas-desaparecidas.component';

describe('PessoasDesaparecidasComponent', () => {
  let component: PessoasDesaparecidasComponent;
  let fixture: ComponentFixture<PessoasDesaparecidasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PessoasDesaparecidasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PessoasDesaparecidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
