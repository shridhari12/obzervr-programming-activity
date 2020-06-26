import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MapComponent } from './components/map/map.component';
import { MapControlComponent } from './components/map-control/map-control.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { BigqueryService } from './services/bigquery/bigquery.service';

@NgModule({
  declarations: [
    MapComponent,
    MapControlComponent
  ],
  providers: [
    BigqueryService
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleMapsModule
  ]
})
export class MapModule { }
