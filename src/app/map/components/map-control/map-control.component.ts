import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-map-control',
  templateUrl: './map-control.component.html',
  styleUrls: ['./map-control.component.css']
})
export class MapControlComponent implements OnInit {
  @ViewChild(MapInfoWindow, { static: false}) infoWindow: MapInfoWindow;
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;

  infoContent = '';
  markers = [];
  zoom = 12;
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8
  };

  constructor() {
    this.map.data.loadGeoJson('/')
   }

  ngOnInit(): void {
    // navigator.geolocation.getCurrentPosition(pos => {
    //   this.center = {
    //     lat: pos.coords.latitude,
    //     lng: pos.coords.longitude
    //   };
    // });
    this.center = {
      lat: 40.7305,
      lng: -73.9091
    };
  }

  zoomIn() {
    if (this.zoom < this.options.maxZoom) { this.zoom++; }
  }

  zoomOut() {
    if (this.zoom > this.options.minZoom) { this.zoom--; }
  }

  googleMapClickHandler(event: google.maps.MouseEvent) {
    console.log(event);
  }

  logCenter() {
    console.log(JSON.stringify(this.map.getCenter()));
  }

  addMarker() {
    this.markers.push({
      position: {
        lat: this.center.lat + ((Math.random() - 0.5) * 2) / 10,
        lng: this.center.lng + ((Math.random() - 0.5) * 2) / 10,
      },
      label: {
        color: 'red',
        text: 'Marker label ' + (this.markers.length + 1),
      },
      title: 'Marker title ' + (this.markers.length + 1),
      options: { animation: google.maps.Animation.BOUNCE },
    });
  }

  openInfo(marker: MapMarker, content) {
    this.infoContent = content;
    this.infoWindow.open(marker);
  }

}
