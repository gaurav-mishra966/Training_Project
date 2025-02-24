import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadercomponentComponent } from './headercomponent.component';

describe('HeadercomponentComponent', () => {
  let component: HeadercomponentComponent;
  let fixture: ComponentFixture<HeadercomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeadercomponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeadercomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
