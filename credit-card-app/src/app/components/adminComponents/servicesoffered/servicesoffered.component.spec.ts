import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesofferedComponent } from './servicesoffered.component';

describe('ServicesofferedComponent', () => {
  let component: ServicesofferedComponent;
  let fixture: ComponentFixture<ServicesofferedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesofferedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesofferedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
