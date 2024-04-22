import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogForIterationsComponent } from './dialog-for-iterations.component';

describe('DialogForIterationsComponent', () => {
  let component: DialogForIterationsComponent;
  let fixture: ComponentFixture<DialogForIterationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogForIterationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogForIterationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
