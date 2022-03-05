import {Component, OnInit} from '@angular/core';
import {NgxCommandPaletteService} from "../../projects/ngx-command-palette/src/lib/ngx-command-palette.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private mockData = [
    {
      "email": "sed.sem@hotmail.couk",
      "name": "Ashton Mcmahon",
      "address": "Ap #853-6164 Donec Ave",
      "country": "United Kingdom",
      "postalZip": "12704"
    },
    {
      "email": "nisi.cum@outlook.couk",
      "name": "Adrian Smith",
      "address": "P.O. Box 211, 5962 Mi. St.",
      "country": "Italy",
      "postalZip": "10606"
    },
    {
      "email": "pede@outlook.org",
      "name": "Todd Harding",
      "address": "2934 Adipiscing Avenue",
      "country": "United States",
      "postalZip": "8114"
    },
    {
      "email": "lobortis.nisi@outlook.ca",
      "name": "Jasmine Long",
      "address": "6970 Turpis Rd.",
      "country": "France",
      "postalZip": "284982"
    },
    {
      "email": "aliquam.auctor.velit@icloud.couk",
      "name": "Ocean Booker",
      "address": "P.O. Box 474, 286 Lorem Ave",
      "country": "Indonesia",
      "postalZip": "5152"
    }
  ];


  constructor(
    private readonly commandPaletteService: NgxCommandPaletteService
  ) {
  }

  ngOnInit() {
    this.commandPaletteService.setOptions(
      this.mockData.map(d => ({
        iconClass: 'fa-solid fa-user-astronaut',
        label: `${d.name} (${d.email})`,
        description: `${d.address}, ${d.postalZip} ${d.country}`,
        callback: () => { alert(`${d.name} (${d.email}) clicked!`); }
      }))
    )
  }

  open(): void {
    this.commandPaletteService.open();
  }

}
