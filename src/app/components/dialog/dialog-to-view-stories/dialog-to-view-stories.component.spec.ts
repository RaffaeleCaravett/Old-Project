import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogToViewStoriesComponent } from './dialog-to-view-stories.component';

describe('DialogToViewStoriesComponent', () => {
  let component: DialogToViewStoriesComponent;
  let fixture: ComponentFixture<DialogToViewStoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogToViewStoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogToViewStoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
