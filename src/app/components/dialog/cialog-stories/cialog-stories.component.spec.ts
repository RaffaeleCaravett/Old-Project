import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CialogStoriesComponent } from './cialog-stories.component';

describe('CialogStoriesComponent', () => {
  let component: CialogStoriesComponent;
  let fixture: ComponentFixture<CialogStoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CialogStoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CialogStoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
