import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogToViewWhoViesStoriesComponent } from './dialog-to-view-who-vies-stories.component';

describe('DialogToViewWhoViesStoriesComponent', () => {
  let component: DialogToViewWhoViesStoriesComponent;
  let fixture: ComponentFixture<DialogToViewWhoViesStoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogToViewWhoViesStoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogToViewWhoViesStoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
