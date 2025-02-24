import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminsettingsComponent } from './adminsettings.component';

describe('AdminsettingsComponent', () => {
  let component: AdminsettingsComponent;
  let fixture: ComponentFixture<AdminsettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminsettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
