import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaTitularComponent } from './alta-titular.component';

describe('AltaTitularComponent', () => {
  let component: AltaTitularComponent;
  let fixture: ComponentFixture<AltaTitularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AltaTitularComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltaTitularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
