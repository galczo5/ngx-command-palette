import {Component, Input, OnInit} from '@angular/core';
import {NgxCommandPaletteOption} from "../ngx-command-palette-option";

@Component({
  selector: 'ngx-command-palette-item',
  templateUrl: './ngx-command-palette-item.component.html',
  styleUrls: ['./ngx-command-palette-item.component.css']
})
export class NgxCommandPaletteItemComponent implements OnInit {

  @Input()
  item!: NgxCommandPaletteOption;

  @Input()
  selected: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    if (this.item.callback) {
      this.item.callback();
    }
  }
}
