import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddservicesofferedComponent } from './addservicesoffered.component';

describe('AddservicesofferedComponent', () => {
  let component: AddservicesofferedComponent;
  let fixture: ComponentFixture<AddservicesofferedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddservicesofferedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddservicesofferedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
