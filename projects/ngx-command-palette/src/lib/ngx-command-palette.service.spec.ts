import { TestBed } from '@angular/core/testing';

import { NgxCommandPaletteService } from './ngx-command-palette.service';

describe('NgxCommandPaletteService', () => {
  let service: NgxCommandPaletteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxCommandPaletteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
