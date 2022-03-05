import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxCommandPaletteComponent } from './ngx-command-palette.component';

describe('NgxCommandPaletteComponent', () => {
  let component: NgxCommandPaletteComponent;
  let fixture: ComponentFixture<NgxCommandPaletteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxCommandPaletteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxCommandPaletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
