import {NgModule} from '@angular/core';
import {NgxCommandPaletteComponent} from './ngx-command-palette.component';
import {NgxCommandPaletteItemComponent} from './ngx-command-palette-item/ngx-command-palette-item.component';
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    NgxCommandPaletteComponent,
    NgxCommandPaletteItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NgxCommandPaletteComponent
  ]
})
export class NgxCommandPaletteModule {
}
