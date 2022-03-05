import {ApplicationRef, ComponentFactoryResolver, ComponentRef, Inject, Injectable, Injector} from '@angular/core';
import {Observable, ReplaySubject, Subject} from "rxjs";
import {NgxCommandPaletteOption} from "./ngx-command-palette-option";
import {CONFIG, NgxCommandPaletteComponent} from "./ngx-command-palette.component";
import {DOCUMENT} from "@angular/common";
import {DefaultNgxCommandPaletteConfig, NgxCommandPaletteConfig} from "./ngx-command-palette-config";

@Injectable({
  providedIn: 'root'
})
export class NgxCommandPaletteService {

  private readonly onSearch$: Subject<string> = new Subject<string>();
  private readonly options$: ReplaySubject<Array<NgxCommandPaletteOption>> = new ReplaySubject<Array<NgxCommandPaletteOption>>(1);
  private componentRef: ComponentRef<NgxCommandPaletteComponent> | undefined;

  constructor(
    private readonly componentFactoryResolver: ComponentFactoryResolver,
    private readonly ref: ApplicationRef,
    private readonly injector: Injector,
    @Inject(DOCUMENT) private readonly document: Document
  ) {
  }

  open(config?: NgxCommandPaletteConfig, injector?: Injector): void {
    const factory = this.componentFactoryResolver.resolveComponentFactory(NgxCommandPaletteComponent);
    this.componentRef = factory.create(
      Injector.create({
        parent: injector || this.injector,
        providers: [
          {provide: CONFIG, useValue: {...DefaultNgxCommandPaletteConfig, ...config}}
        ]
      })
    );
    this.ref.attachView(this.componentRef.hostView);
    this.componentRef.changeDetectorRef.detectChanges();
    this.document.body.appendChild(this.componentRef.location.nativeElement);
  }

  close(): void {
    if (!this.componentRef) {
      throw new Error('Command palette not opened');
    }

    this.componentRef.destroy();
  }

  setOptions(options: Array<NgxCommandPaletteOption>): void {
    this.options$.next(options);
  }

  getOptions(): Observable<Array<NgxCommandPaletteOption>> {
    return this.options$.asObservable();
  }

  onSearch(): Observable<string> {
    return this.onSearch$.asObservable();
  }

  searchStart(filterText: string): void {
    this.onSearch$.next(filterText);
  }
}
