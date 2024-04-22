import { TestBed } from '@angular/core/testing';

import { OnHoverDialogService } from './on-hover-dialog.service';

describe('OnHoverDialogService', () => {
  let service: OnHoverDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnHoverDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
