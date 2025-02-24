import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarcomponentComponent } from './sidebarcomponent.component';

describe('SidebarcomponentComponent', () => {
  let component: SidebarcomponentComponent;
  let fixture: ComponentFixture<SidebarcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarcomponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
