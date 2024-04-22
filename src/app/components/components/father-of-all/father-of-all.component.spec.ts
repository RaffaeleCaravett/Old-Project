import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FatherOfAllComponent } from './father-of-all.component';

describe('FatherOfAllComponent', () => {
  let component: FatherOfAllComponent;
  let fixture: ComponentFixture<FatherOfAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FatherOfAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FatherOfAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
