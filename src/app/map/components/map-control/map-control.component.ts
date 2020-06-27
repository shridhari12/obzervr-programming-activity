import { Component, OnInit, ViewChild, Input, AfterViewInit } from '@angular/core';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps';
import { YellowTrip } from '../../models/yellow-trip.model';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { MessageService } from 'src/app/shared/services/message/message.service';

@Component({
  selector: 'app-map-control',
  templateUrl: './map-control.component.html',
  styleUrls: ['./map-control.component.css']
})
export class MapControlComponent implements OnInit, AfterViewInit {
  @ViewChild(MapInfoWindow, { static: false}) infoWindow: MapInfoWindow;
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;

  @Input() mapPoints: Array<YellowTrip>;

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

  constructor(private messageService: MessageService) {
    this.messageService.add('[map-control] component initializing');
    //this.map.data.loadGeoJson('/')
   }

  ngOnInit(): void {
    this.messageService.add('[map-control][ngOnInit]');
    console.log('[ngOnInit] [mapPoints] ', this.mapPoints);
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
    this.mapPoints.map(mapPoint => {
      this.addMarker(mapPoint.pickupLatitude, mapPoint.pickupLongitude);
      this.addMarker(mapPoint.dropoffLatitude, mapPoint.dropoffLongitude);
    });
    // this.plotLines();
    // this.initMap();
  }

  ngAfterViewInit() {
    this.messageService.add('[map-control][ngAfterViewInit]');
    // this.initMap();
  }

  initMap() {
    const gMap = new google.maps.Map(document.getElementById('markerControlElem'), {
      center: this.center,
      ...this.options
    });
    this.plotLines(gMap);
  }

  plotLines(gMap: google.maps.Map): void {
    const tripCoordinates = [];
    this.mapPoints.map(mp => {
      tripCoordinates.push({ lat: mp.pickupLatitude, lng: mp.pickupLongitude });
      tripCoordinates.push({ lat: mp.dropoffLatitude, lng: mp.dropoffLongitude });
    });
    const tripPath = new google.maps.Polyline({
      path: tripCoordinates,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });
    tripPath.setMap(gMap);
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

  addSampleMarker() {
    this.markers.push({
      position: {
        lat: this.center.lat + ((Math.random() - 0.5) * 2) / 10,
        lng: this.center.lng + ((Math.random() - 0.5) * 2) / 10,
      },
      label: {
        color: 'red',
        text: 'Sample Marker label ' + (this.markers.length + 1),
      },
      title: 'Sample Marker title ' + (this.markers.length + 1),
      options: { animation: google.maps.Animation.BOUNCE },
    });
  }

  addMarker(markerLatitude: number, markerLongitude: number) {
    this.markers.push({
      position: {
        lat: markerLatitude,
        lng: markerLongitude
      },
      label: {
        color: 'red',
        text: 'Data point label'
      },
      title: 'Data Point title',
      options: { animation: google.maps.Animation.BOUNCE }
    });
  }

  openInfo(marker: MapMarker, content) {
    this.infoContent = content;
    this.infoWindow.open(marker);
  }

}
