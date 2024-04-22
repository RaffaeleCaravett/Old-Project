import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnHoverDialogComponent } from './on-hover-dialog.component';

describe('OnHoverDialogComponent', () => {
  let component: OnHoverDialogComponent;
  let fixture: ComponentFixture<OnHoverDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnHoverDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnHoverDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
