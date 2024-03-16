import { TestBed } from '@angular/core/testing';

import { ForgetpaswordService } from './forgetpasword.service';

describe('ForgetpaswordService', () => {
  let service: ForgetpaswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForgetpaswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
