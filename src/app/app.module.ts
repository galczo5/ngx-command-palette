import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {NgxCommandPaletteModule} from "../../projects/ngx-command-palette/src/lib/ngx-command-palette.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxCommandPaletteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
