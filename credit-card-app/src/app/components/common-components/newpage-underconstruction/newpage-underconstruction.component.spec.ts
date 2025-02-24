import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewpageUnderconstructionComponent } from './newpage-underconstruction.component';

describe('NewpageUnderconstructionComponent', () => {
  let component: NewpageUnderconstructionComponent;
  let fixture: ComponentFixture<NewpageUnderconstructionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewpageUnderconstructionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewpageUnderconstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
