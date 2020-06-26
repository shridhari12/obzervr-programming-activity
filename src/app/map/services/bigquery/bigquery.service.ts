import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BigQuery } from '@google-cloud/bigquery';

// const QUERY_URL = 'YOUR_CLOUD_FUNCTIONS_URL';
// const bigquery = new BigQuery();

@Injectable({
  providedIn: 'root'
})
export class BigqueryService {
  constructor(private httpClient: HttpClient) { }

  // async onQuery(datasetName: string, q: string) {
  //   const postParams = {
  //     datasetName,
  //     query: q
  //   };

  //   const query =  `SELECT name
  //   FROM \`bigquery-public-data.usa_names.usa_1910_2013\`
  //   WHERE state = 'TX'
  //   LIMIT 5`;

  //   const options = {
  //     query,
  //     location: 'US'
  //   };

  //   const [job] = await bigquery.createQueryJob(options);
  //   console.log(`Job ${job.id} started.`);

  //   const [rows] = await job.getQueryResults();

  //   console.log('Rows:');
  //   rows.forEach(row => console.log(row));
  //   //return this.http.post(QUERY_URL, postParams);
  // }
}
