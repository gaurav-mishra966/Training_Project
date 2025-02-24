import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertcomponentComponent } from './alertcomponent.component';

describe('AlertcomponentComponent', () => {
  let component: AlertcomponentComponent;
  let fixture: ComponentFixture<AlertcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertcomponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
