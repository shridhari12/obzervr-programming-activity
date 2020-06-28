import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from 'src/app/shared/services/message/message.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { BigqueryService } from '../../services/bigquery/bigquery.service';
import { YellowTrip } from '../../models/yellow-trip.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Input() showMap = false;
  mapButtonText: string = null;
  showInMapForm: FormGroup;
  bqDatasetName = 'bigquery-public-data';
  bqTableName = 'new_york.tlc_yellow_trips_2015';
  mapDataPoints: Array<YellowTrip>;

  constructor(private messageService: MessageService,
              private formBuilder: FormBuilder,
              private bgSrv: BigqueryService,
              private http: HttpClient) {
    this.messageService.add('[map] component initialising ...');
    this.mapButtonText = 'Load Component';
  }

  ngOnInit(): void {
    this.messageService.add('[map][ngOnInit]');
    this.buildShowInMapForm();
  }

  buildShowInMapForm() {
    this.showInMapForm = this.formBuilder.group({
      pickupDt: new FormControl(''),
      dropoffDt: new FormControl('')
    });
  }

  onSubmit() {
    console.log('Form Data: ', this.showInMapForm.value);
    const pickupDt: string = this.showInMapForm.get('pickupDt').value;
    const dropoffDt: string = this.showInMapForm.get('dropoffDt').value;
    console.log('[pickupDt] ', pickupDt);
    console.log('[dropoffDt] ', dropoffDt);
    this.getBigQueryData(pickupDt, dropoffDt);
    // this.showMapComponent();
  }

  getBigQueryData(pickupDatetime: string, dropoffDatetime: string) {
    // const q = `SELECT
    //   pickup_datetime,
    //   pickup_longitude,
    //   pickup_latitude,
    //   dropoff_datetime,
    //   dropoff_longitude,
    //   dropoff_latitude
    //   FROM ${this.bqDatasetName}.${this.bqTableName}
    //   WHERE
    //     ((pickup_datetime BETWEEN TIMESTAMP('2015-01-15 02:00:00+00') AND TIMESTAMP('2015-01-15 02:30:00+00'))
    //     AND (dropoff_datetime BETWEEN TIMESTAMP('2015-01-15 02:00:00+00') AND TIMESTAMP('2015-01-15 02:30:00+00')))
    //     trip_distance > 0
    //     AND fare_amount/trip_distance BETWEEN 2
    //     AND 10
    //     AND dropoff_datetime > pickup_datetime
    //   GROUP BY
    //     1
    //   ORDER BY
    //     1`;
    
    // this.bgSrv..queryStackOverflow();
    
    // const q = `SELECT name
    // FROM \`bigquery-public-data.usa_names.usa_1910_2013\`
    // WHERE state = 'TX'
    // LIMIT 100`;
    const QUERY_URL = 'https://us-central1-obzervr-prog-activity.cloudfunctions.net/bigQueryFetchData';
    const postParams = {
      pickupDt: pickupDatetime,
      dropoffDt: dropoffDatetime
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true'
      })
    };
    const bqResponse =
    this.http.post(
      QUERY_URL, null)
      .subscribe(httpData => {
        // console.log('[httpData] ', httpData);
        this.mapToYellowTrip(httpData as Array<any>);
        this.showMapComponent();
      });
    this.bgSrv.onQuery(
      this.bqDatasetName)
        .subscribe(res => {
          console.log('[bq][res] ', res);
          this.mapToYellowTrip(res);
        });
  }

  mapToYellowTrip(data: Array<any>) {
    const yellowTripData = [];
    data.forEach((d) => {
      yellowTripData.push({
        pickupDatetime: d.pickup_datetime,
        pickupLongitude: d.pickup_longitude,
        pickupLatitude: d.pickup_latitude,
        tripDistance: d.trip_distance,
        passengerCount: d.passenger_count,
        dropoffDatetime: d.dropoff_datetime,
        dropoffLongitude: d.dropoff_longitude,
        dropoffLatitude: d.dropoff_latitude});
    });
    this.mapDataPoints = yellowTripData;
    console.log('[mapDataPoints] ', this.mapDataPoints);
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
