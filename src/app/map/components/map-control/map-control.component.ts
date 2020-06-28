import { Component, OnInit, ViewChild, Input, AfterViewInit } from '@angular/core';
// import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps';
import * as MarkerClusterer from '@google/markerclusterer';
import { YellowTrip } from '../../models/yellow-trip.model';
import { MessageService } from 'src/app/shared/services/message/message.service';
import { MouseEvent, AgmMap, GoogleMapsAPIWrapper } from '@agm/core';
import { Marker } from '../../models/marker.model';
import { GoogleMap } from '@agm/core/services/google-maps-types';

declare var google: any;

@Component({
  selector: 'app-map-control',
  templateUrl: './map-control.component.html',
  styleUrls: ['./map-control.component.css']
})

export class MapControlComponent implements OnInit, AfterViewInit {
  @ViewChild(AgmMap) map: AgmMap;

  @Input() mapPoints: Array<YellowTrip>;

  labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  infoContent = '';
  mapTypeId = 'hybrid';
  markers: Array<Marker> = [];
  zoom = 12;
  // initial center position for map
  lat = 40.7305;
  lng = -73.9091;

  pickupDropffMark = [];
  latlng: number[][] = [];

  origin: any;
  destination: any;

  constructor(private messageService: MessageService) { //,
              // private mapsWrapper: GoogleMapsAPIWrapper) {
    this.messageService.add('[map-control] component initializing');
   }

  ngOnInit(): void {
    this.messageService.add('[map-control][ngOnInit]');
    console.log('[ngOnInit] [mapPoints] ', this.mapPoints.length);
    this.getDirection();
    this.mapPoints.map((mapPoint, i) => {
      this.addMapMarker(mapPoint.pickupLatitude, mapPoint.pickupLongitude, `P-${i}`);
      this.addMapMarker(mapPoint.dropoffLatitude, mapPoint.dropoffLongitude, `D-${i}`);
      const pickupDropoffCoords: number[][] =
      [
        [ mapPoint.pickupLatitude, mapPoint.pickupLongitude ],
        [ mapPoint.dropoffLatitude, mapPoint.dropoffLongitude ]
      ];
      this.latlng.push(...pickupDropoffCoords);
    });

  }

  ngAfterViewInit() {
    this.messageService.add('[map-control][ngAfterViewInit]');
  }

  getDirection() {
    this.origin = { lat: 40.74582290649414, lng: -73.98800659179688 };
    this.destination = { lat: 40.90926742553711, lng: -73.90066528320312 };
  }

  initMap() {
  }

  markerClickHandler(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

  mapClickHandler(event: MouseEvent) {
    console.log(event);
    this.markers.push({
      lat: event.coords.lat,
      lng: event.coords.lng,
      draggable: false
    });
  }

  // gMap: google.maps.Map
  // convertTripDataToLatLongArray(): Array<google.maps.LatLng> {
  //   const tripCoordinates: Array<google.maps.LatLng> = new Array<google.maps.LatLng>();
  //   this.mapPoints.map(mp => {
  //     tripCoordinates.push(new google.maps.LatLng({ lat: mp.pickupLatitude, lng: mp.pickupLongitude }));
  //     tripCoordinates.push(new google.maps.LatLng({ lat: mp.dropoffLatitude, lng: mp.dropoffLongitude }));
  //   });
  //   return tripCoordinates;
  //   // const tripPath = new google.maps.Polyline({
  //   //   map: this.gmap,
  //   //   path: tripCoordinates,
  //   //   geodesic: true,
  //   //   strokeColor: '#FF0000',
  //   //   strokeOpacity: 1.0,
  //   //   strokeWeight: 2
  //   // });
  //   // tripPath.setMap(gMap);
  // }

  // Naming convention:-  P - Pickup D - Dropff ie P-1 is the pickup 1st record D-1 is the dropoff 1st record
  addMapMarker(markerLatitude: number, markerLongitude: number, markerLabel: string) {
    const mapMarker: Marker = {
      label: markerLabel,
      lat: markerLatitude,
      lng: markerLongitude,
      draggable: false
    };
    this.markers.push(mapMarker);
  }

}
