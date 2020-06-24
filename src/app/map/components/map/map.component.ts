import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Input() showMap = false;
  mapButtonText: string = null;

  constructor() {
    this.mapButtonText = 'Load Component';
   }

  ngOnInit(): void {
  }

  showMapComponent() {
    this.showMap = !this.showMap;
    if (this.showMap) {
      this.mapButtonText = 'Hide Component';
    }
    else {
      this.mapButtonText = 'Show Component';
    }
  }

}
