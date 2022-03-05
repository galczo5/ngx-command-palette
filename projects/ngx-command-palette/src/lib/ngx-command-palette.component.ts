import {
  AfterViewInit,
  Component,
  ElementRef, Inject,
  InjectionToken,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {debounceTime, Subject, takeUntil, timer} from "rxjs";
import {NgxCommandPaletteService} from "./ngx-command-palette.service";
import Fuse from 'fuse.js';
import {NgxCommandPaletteOption} from "./ngx-command-palette-option";
import {NgxCommandPaletteConfig} from "./ngx-command-palette-config";

export const CONFIG = new InjectionToken('CONFIG');

@Component({
  selector: 'ngx-command-palette',
  templateUrl: './ngx-command-palette.component.html',
  styleUrls: ['./ngx-command-palette.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NgxCommandPaletteComponent implements OnInit, AfterViewInit, OnDestroy {

  filteredOptions: Array<NgxCommandPaletteOption> = []
  selectedIndex: number = 0;

  @ViewChild('input', { read: ElementRef })
  private readonly inputEl!: ElementRef;

  private readonly onDestroy$: Subject<void> = new Subject<void>();
  private readonly onSearch$: Subject<void> = new Subject<void>();
  private options: Array<NgxCommandPaletteOption> = [];

  constructor(
    private readonly commandPaletteService: NgxCommandPaletteService,
    @Inject(CONFIG) public readonly config: NgxCommandPaletteConfig
  ) { }

  ngOnInit() {
    this.commandPaletteService.getOptions()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(options => {
        this.options = options;
      });

    this.onSearch$
      .pipe(
        debounceTime(200),
        takeUntil(this.onDestroy$)
      )
      .subscribe(() => this.search());
  }

  ngAfterViewInit() {
    timer(0)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(() => {
        this.getInput().focus();
      });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  triggerSearch(): void {
    this.onSearch$.next();
  }

  selectNext(event: Event): void {
    this.selectedIndex = Math.min(this.selectedIndex + 1, this.filteredOptions.length - 1);
    event.preventDefault();
    event.stopPropagation();
  }

  selectPrev(event: Event): void {
    this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
    event.preventDefault();
    event.stopPropagation();
  }

  callCallback(event: Event): void {
    const selectedItem = this.filteredOptions[this.selectedIndex];
    if (selectedItem.callback) {
      selectedItem.callback();
      event.preventDefault();
      event.stopPropagation();
    }
  }

  clearInput(event: Event) {
    this.getInput().value = '';
    event.preventDefault();
    event.stopPropagation();
  }

  private search(): void {
    const filterText = this.getInput().value;
    if (!filterText || !filterText.trim()) {
      this.filteredOptions = [];
    }

    const fuse = new Fuse(this.options, {
      keys: ['label', 'description']
    });

    this.filteredOptions = fuse.search(filterText)
      .map(x => x.item);
  }

  private getInput(): HTMLInputElement {
    return this.inputEl.nativeElement;
  }
}
