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
    const httpData = [
      {
        pickup_datetime: {
            value: '2015-01-15T02:00:23.000Z'
        },
        pickup_longitude: -73.98800659179688,
        pickup_latitude: 40.74582290649414,
        dropoff_datetime: {
            value: '2015-01-15T02:28:59.000Z'
        },
        dropoff_longitude: -73.90066528320312,
        dropoff_latitude: 40.90926742553711
    },
    {
        pickup_datetime: {
            value: '2015-01-15T02:00:33.000Z'
        },
        pickup_longitude: -73.97054290771484,
        pickup_latitude: 40.751976013183594,
        dropoff_datetime: {
            value: '2015-01-15T02:02:31.000Z'
        },
        dropoff_longitude: -73.9760513305664,
        dropoff_latitude: 40.7415657043457
    },
    {
        pickup_datetime: {
            value: '2015-01-15T02:10:25.000Z'
        },
        pickup_longitude: -73.86963653564453,
        pickup_latitude: 40.7494010925293,
        dropoff_datetime: {
            value: '2015-01-15T02:13:17.000Z'
        },
        dropoff_longitude: -73.85859680175781,
        dropoff_latitude: 40.750274658203125
    },
    {
        pickup_datetime: {
            value: '2015-01-15T02:19:50.000Z'
        },
        pickup_longitude: -73.9902572631836,
        pickup_latitude: 40.76068115234375,
        dropoff_datetime: {
            value: '2015-01-15T02:23:11.000Z'
        },
        dropoff_longitude: -73.98365783691406,
        dropoff_latitude: 40.767059326171875
    },
    {
        pickup_datetime: {
            value: '2015-01-15T02:24:08.000Z'
        },
        pickup_longitude: -73.93638610839844,
        pickup_latitude: 40.849674224853516,
        dropoff_datetime: {
            value: '2015-01-15T02:28:48.000Z'
        },
        dropoff_longitude: -73.93762969970703,
        dropoff_latitude: 40.84157943725586
    },
    {
        pickup_datetime: {
            value: '2015-01-15T02:18:06.000Z'
        },
        pickup_longitude: -73.97476959228516,
        pickup_latitude: 40.75330352783203,
        dropoff_datetime: {
            value: '2015-01-15T02:21:36.000Z'
        },
        dropoff_longitude: -73.99103546142578,
        dropoff_latitude: 40.75046920776367
    },
    {
        pickup_datetime: {
            value: '2015-01-15T02:06:00.000Z'
        },
        pickup_longitude: -73.99882507324219,
        pickup_latitude: 40.73320388793945,
        dropoff_datetime: {
            value: '2015-01-15T02:10:21.000Z'
        },
        dropoff_longitude: -73.99287414550781,
        dropoff_latitude: 40.7420654296875
    },
    {
        pickup_datetime: {
            value: '2015-01-15T02:19:04.000Z'
        },
        pickup_longitude: -74.00263214111328,
        pickup_latitude: 40.74998092651367,
        dropoff_datetime: {
            value: '2015-01-15T02:24:11.000Z'
        },
        dropoff_longitude: -73.98048400878906,
        dropoff_latitude: 40.76260757446289
    },
    {
        pickup_datetime: {
            value: '2015-01-15T02:20:11.000Z'
        },
        pickup_longitude: -74.00352478027344,
        pickup_latitude: 40.741790771484375,
        dropoff_datetime: {
            value: '2015-01-15T02:27:59.000Z'
        },
        dropoff_longitude: -73.9783935546875,
        dropoff_latitude: 40.72955322265625
    },
    {
        pickup_datetime: {
            value: '2015-01-15T02:19:54.000Z'
        },
        pickup_longitude: -73.9832534790039,
        pickup_latitude: 40.76131057739258,
        dropoff_datetime: {
            value: '2015-01-15T02:29:44.000Z'
        },
        dropoff_longitude: -73.98980712890625,
        dropoff_latitude: 40.735687255859375
    },
    {
        pickup_datetime: {
            value: '2015-01-15T02:11:50.000Z'
        },
        pickup_longitude: -73.99234771728516,
        pickup_latitude: 40.68989944458008,
        dropoff_datetime: {
            value: '2015-01-15T02:20:41.000Z'
        },
        dropoff_longitude: -73.960693359375,
        dropoff_latitude: 40.660160064697266
    },
    {
        pickup_datetime: {
            value: '2015-01-15T02:11:29.000Z'
        },
        pickup_longitude: -73.98179626464844,
        pickup_latitude: 40.74068832397461,
        dropoff_datetime: {
            value: '2015-01-15T02:21:08.000Z'
        },
        dropoff_longitude: -73.98059844970703,
        dropoff_latitude: 40.77034378051758
    },
    {
        pickup_datetime: {
            value: '2015-01-15T02:15:47.000Z'
        },
        pickup_longitude: -73.99308776855469,
        pickup_latitude: 40.719444274902344,
        dropoff_datetime: {
            value: '2015-01-15T02:24:45.000Z'
        },
        dropoff_longitude: -73.93888854980469,
        dropoff_latitude: 40.72566223144531
    },
    {
        pickup_datetime: {
            value: '2015-01-15T02:09:06.000Z'
        },
        pickup_longitude: -73.9876708984375,
        pickup_latitude: 40.72133255004883,
        dropoff_datetime: {
            value: '2015-01-15T02:23:41.000Z'
        },
        dropoff_longitude: -73.98457336425781,
        dropoff_latitude: 40.75764465332031
    },
    {
        pickup_datetime: {
            value: '2015-01-15T02:10:56.000Z'
        },
        pickup_longitude: -73.86280822753906,
        pickup_latitude: 40.729408264160156,
        dropoff_datetime: {
            value: '2015-01-15T02:26:17.000Z'
        },
        dropoff_longitude: -73.79373168945312,
        dropoff_latitude: 40.75123977661133
    },
    {
        pickup_datetime: {
            value: '2015-01-15T02:00:43.000Z'
        },
        pickup_longitude: -73.9710464477539,
        pickup_latitude: 40.763893127441406,
        dropoff_datetime: {
            value: '2015-01-15T02:17:05.000Z'
        },
        dropoff_longitude: -73.9423599243164,
        dropoff_latitude: 40.72437286376953
    },
    {
        pickup_datetime: {
            value: '2015-01-15T02:00:14.000Z'
        },
        pickup_longitude: -73.97573852539062,
        pickup_latitude: 40.749698638916016,
        dropoff_datetime: {
            value: '2015-01-15T02:01:30.000Z'
        },
        dropoff_longitude: -73.97174835205078,
        dropoff_latitude: 40.754615783691406
    },
    {
        pickup_datetime: {
            value: '2015-01-15T02:16:38.000Z'
        },
        pickup_longitude: -73.995849609375,
        pickup_latitude: 40.73873519897461,
        dropoff_datetime: {
            value: '2015-01-15T02:20:59.000Z'
        },
        dropoff_longitude: -73.9844970703125,
        dropoff_latitude: 40.75885009765625
    },
    {
        pickup_datetime: {
            value: '2015-01-15T02:05:10.000Z'
        },
        pickup_longitude: -73.96235656738281,
        pickup_latitude: 40.76054000854492,
        dropoff_datetime: {
            value: '2015-01-15T02:13:59.000Z'
        },
        dropoff_longitude: -73.97840881347656,
        dropoff_latitude: 40.763248443603516
    },
    {
        pickup_datetime: {
            value: '2015-01-15T02:17:37.000Z'
        },
        pickup_longitude: -74.0010986328125,
        pickup_latitude: 40.73161315917969,
        dropoff_datetime: {
            value: '2015-01-15T02:26:41.000Z'
        },
        dropoff_longitude: -73.98394012451172,
        dropoff_latitude: 40.72140121459961
    },
    {
        pickup_datetime: {
            value: '2015-01-15T02:09:22.000Z'
        },
        pickup_longitude: -73.98233032226562,
        pickup_latitude: 40.773155212402344,
        dropoff_datetime: {
            value: '2015-01-15T02:18:03.000Z'
        },
        dropoff_longitude: -73.98746490478516,
        dropoff_latitude: 40.74814224243164
    },
    {
        pickup_datetime: {
            value: '2015-01-15T02:19:44.000Z'
        },
        pickup_longitude: -74.00270080566406,
        pickup_latitude: 40.733421325683594,
        dropoff_datetime: {
            value: '2015-01-15T02:26:25.000Z'
        },
        dropoff_longitude: -74.01475524902344,
        dropoff_latitude: 40.70466613769531
    },
    {
        pickup_datetime: {
            value: '2015-01-15T02:18:24.000Z'
        },
        pickup_longitude: -74.00182342529297,
        pickup_latitude: 40.741050720214844,
        dropoff_datetime: {
            value: '2015-01-15T02:27:43.000Z'
        },
        dropoff_longitude: -73.97328186035156,
        dropoff_latitude: 40.74360275268555
    },
    {
        pickup_datetime: {
            value: '2015-01-15T02:08:16.000Z'
        },
        pickup_longitude: -74.00634765625,
        pickup_latitude: 40.7332878112793,
        dropoff_datetime: {
            value: '2015-01-15T02:18:47.000Z'
        },
        dropoff_longitude: -73.99998474121094,
        dropoff_latitude: 40.761409759521484
    },
    {
        pickup_datetime: {
            value: '2015-01-15T02:12:56.000Z'
        },
        pickup_longitude: -74.00342559814453,
        pickup_latitude: 40.73354721069336,
        dropoff_datetime: {
            value: '2015-01-15T02:27:45.000Z'
        },
        dropoff_longitude: -73.98774719238281,
        dropoff_latitude: 40.78013229370117
    },
    {
        pickup_datetime: {
            value: '2015-01-15T02:15:02.000Z'
        },
        pickup_longitude: -73.99500274658203,
        pickup_latitude: 40.76039123535156,
        dropoff_datetime: {
            value: '2015-01-15T02:24:36.000Z'
        },
        dropoff_longitude: -73.9521713256836,
        dropoff_latitude: 40.8231315612793
    },
    {
        pickup_datetime: {
            value: '2015-01-15T02:05:13.000Z'
        },
        pickup_longitude: -73.95455169677734,
        pickup_latitude: 40.68649673461914,
        dropoff_datetime: {
            value: '2015-01-15T02:21:06.000Z'
        },
        dropoff_longitude: -74.0080337524414,
        dropoff_latitude: 40.736968994140625
    },
    {
        pickup_datetime: {
            value: '2015-01-15T02:05:21.000Z'
        },
        pickup_longitude: -73.9920425415039,
        pickup_latitude: 40.72612762451172,
        dropoff_datetime: {
            value: '2015-01-15T02:20:02.000Z'
        },
        dropoff_longitude: -73.92903137207031,
        dropoff_latitude: 40.73866653442383
    },
    {
        pickup_datetime: {
            value: '2015-01-15T02:05:41.000Z'
        },
        pickup_longitude: -73.98519897460938,
        pickup_latitude: 40.74971389770508,
        dropoff_datetime: {
            value: '2015-01-15T02:08:34.000Z'
        },
        dropoff_longitude: -73.97976684570312,
        dropoff_latitude: 40.74955368041992
    },
    {
        pickup_datetime: {
            value: '2015-01-15T02:03:16.000Z'
        },
        pickup_longitude: -73.98278045654297,
        pickup_latitude: 40.73533630371094,
        dropoff_datetime: {
            value: '2015-01-15T02:07:06.000Z'
        },
        dropoff_longitude: -73.97366333007812,
        dropoff_latitude: 40.743682861328125
    },
    {
        pickup_datetime: {
            value: '2015-01-15T02:18:45.000Z'
        },
        pickup_longitude: -73.98432922363281,
        pickup_latitude: 40.75899124145508,
        dropoff_datetime: {
            value: '2015-01-15T02:25:12.000Z'
        },
        dropoff_longitude: -73.98438262939453,
        dropoff_latitude: 40.767818450927734
    },
    {
        pickup_datetime: {
            value: '2015-01-15T02:16:12.000Z'
        },
        pickup_longitude: -73.98918151855469,
        pickup_latitude: 40.76121139526367,
        dropoff_datetime: {
            value: '2015-01-15T02:21:24.000Z'
        },
        dropoff_longitude: -73.98529815673828,
        dropoff_latitude: 40.74955749511719
    },
    {
        pickup_datetime: {
            value: '2015-01-15T02:17:10.000Z'
        },
        pickup_longitude: -73.95278930664062,
        pickup_latitude: 40.80308151245117,
        dropoff_datetime: {
            value: '2015-01-15T02:23:07.000Z'
        },
        dropoff_longitude: -73.96929168701172,
        dropoff_latitude: 40.79030990600586
    },
    {
        pickup_datetime: {
            value: '2015-01-15T02:15:02.000Z'
        },
        pickup_longitude: -74.00421905517578,
        pickup_latitude: 40.75205993652344,
        dropoff_datetime: {
            value: '2015-01-15T02:20:17.000Z'
        },
        dropoff_longitude: -73.98832702636719,
        dropoff_latitude: 40.76435852050781
    },
    {
        pickup_datetime: {
            value: '2015-01-15T02:19:38.000Z'
        },
        pickup_longitude: -73.98240661621094,
        pickup_latitude: 40.7540397644043,
        dropoff_datetime: {
            value: '2015-01-15T02:26:12.000Z'
        },
        dropoff_longitude: -74.00460052490234,
        dropoff_latitude: 40.73419952392578
    },
    {
        pickup_datetime: {
            value: '2015-01-15T02:14:37.000Z'
        },
        pickup_longitude: -73.98220825195312,
        pickup_latitude: 40.768707275390625,
        dropoff_datetime: {
            value: '2015-01-15T02:22:53.000Z'
        },
        dropoff_longitude: -73.99209594726562,
        dropoff_latitude: 40.735267639160156
    },
    {
        pickup_datetime: {
            value: '2015-01-15T02:08:12.000Z'
        },
        pickup_longitude: -73.9910888671875,
        pickup_latitude: 40.73487854003906,
        dropoff_datetime: {
            value: '2015-01-15T02:27:11.000Z'
        },
        dropoff_longitude: -74.00089263916016,
        dropoff_latitude: 40.73997116088867
    },
    {
        pickup_datetime: {
            value: '2015-01-15T02:11:53.000Z'
        },
        pickup_longitude: -73.9532699584961,
        pickup_latitude: 40.80217742919922,
        dropoff_datetime: {
            value: '2015-01-15T02:24:25.000Z'
        },
        dropoff_longitude: -73.92882537841797,
        dropoff_latitude: 40.85136413574219
    },
    {
        pickup_datetime: {
            value: '2015-01-15T02:09:05.000Z'
        },
        pickup_longitude: -73.99264526367188,
        pickup_latitude: 40.731292724609375,
        dropoff_datetime: {
            value: '2015-01-15T02:24:47.000Z'
        },
        dropoff_longitude: -73.9808578491211,
        dropoff_latitude: 40.78843307495117
    },
    {
        pickup_datetime: {
            value: '2015-01-15T02:00:09.000Z'
        },
        pickup_longitude: -74.0072021484375,
        pickup_latitude: 40.70928955078125,
        dropoff_datetime: {
            value: '2015-01-15T02:17:15.000Z'
        },
        dropoff_longitude: -73.93392181396484,
        dropoff_latitude: 40.6956672668457
    },
    {
        pickup_datetime: {
            value: '2015-01-15T02:10:53.000Z'
        },
        pickup_longitude: -74.00690460205078,
        pickup_latitude: 40.70973587036133,
        dropoff_datetime: {
            value: '2015-01-15T02:26:39.000Z'
        },
        dropoff_longitude: -73.94597625732422,
        dropoff_latitude: 40.78158950805664
    },
    {
        pickup_datetime: {
            value: '2015-01-15T02:16:16.000Z'
        },
        pickup_longitude: -74.00550842285156,
        pickup_latitude: 40.74846649169922,
        dropoff_datetime: {
            value: '2015-01-15T02:19:01.000Z'
        },
        dropoff_longitude: -73.99862670898438,
        dropoff_latitude: 40.75554275512695
    },
    {
        pickup_datetime: {
            value: '2015-01-15T02:19:09.000Z'
        },
        pickup_longitude: -73.98578643798828,
        pickup_latitude: 40.73811340332031,
        dropoff_datetime: {
            value: '2015-01-15T02:23:50.000Z'
        },
        dropoff_longitude: -73.99395751953125,
        dropoff_latitude: 40.72888946533203
    },
    {
        pickup_datetime: {
            value: '2015-01-15T02:09:46.000Z'
        },
        pickup_longitude: -73.9798355102539,
        pickup_latitude: 40.752140045166016,
        dropoff_datetime: {
            value: '2015-01-15T02:14:56.000Z'
        },
        dropoff_longitude: -73.9684066772461,
        dropoff_latitude: 40.75498962402344
    },
    {
        pickup_datetime: {
            value: '2015-01-15T02:09:15.000Z'
        },
        pickup_longitude: -73.98241424560547,
        pickup_latitude: 40.74274826049805,
        dropoff_datetime: {
            value: '2015-01-15T02:14:26.000Z'
        },
        dropoff_longitude: -73.99026489257812,
        dropoff_latitude: 40.7563362121582
    },
    {
        pickup_datetime: {
            value: '2015-01-15T02:07:43.000Z'
        },
        pickup_longitude: -73.9794692993164,
        pickup_latitude: 40.75104904174805,
        dropoff_datetime: {
            value: '2015-01-15T02:13:40.000Z'
        },
        dropoff_longitude: -73.9611587524414,
        dropoff_latitude: 40.758975982666016
    },
    {
        pickup_datetime: {
            value: '2015-01-15T02:19:34.000Z'
        },
        pickup_longitude: -73.9884033203125,
        pickup_latitude: 40.72339630126953,
        dropoff_datetime: {
            value: '2015-01-15T02:27:09.000Z'
        },
        dropoff_longitude: -73.97307586669922,
        dropoff_latitude: 40.75147247314453
    },
    {
        pickup_datetime: {
            value: '2015-01-15T02:11:27.000Z'
        },
        pickup_longitude: -73.99085235595703,
        pickup_latitude: 40.76580047607422,
        dropoff_datetime: {
            value: '2015-01-15T02:13:00.000Z'
        },
        dropoff_longitude: -73.99368286132812,
        dropoff_latitude: 40.76737976074219
    },
    {
        pickup_datetime: {
            value: '2015-01-15T02:16:13.000Z'
        },
        pickup_longitude: -73.96353912353516,
        pickup_latitude: 40.757320404052734,
        dropoff_datetime: {
            value: '2015-01-15T02:18:02.000Z'
        },
        dropoff_longitude: -73.95571899414062,
        dropoff_latitude: 40.76436996459961
    },
    {
        pickup_datetime: {
            value: '2015-01-15T02:04:58.000Z'
        },
        pickup_longitude: -74.00540924072266,
        pickup_latitude: 40.73896026611328,
        dropoff_datetime: {
            value: '2015-01-15T02:08:18.000Z'
        },
        dropoff_longitude: -74.00137329101562,
        dropoff_latitude: 40.729331970214844
    }
    ];
    this.mapToYellowTrip(httpData);
    this.showMapComponent();
    // const bqResponse =
    // this.http.post(
    //   QUERY_URL, null)
    //   .subscribe(httpData => {
    //     console.log('[httpData] ', httpData);
    //     this.mapToYellowTrip(httpData as Array<any>);
    //     this.showMapComponent();
    //   });
    // this.bgSrv.onQuery(
    //   this.bqDatasetName)
    // // this.mapToYellowTrip(bqResponse)
    //     .subscribe(res => {
    //       console.log('[bq][res] ', res);
    //       this.mapToYellowTrip(res);
    //     });
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
