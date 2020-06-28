# obzervr-programming-activity
# This is a README to maintain a record of decisions taken for project implementation

Please NOTE: This project is getting records from the Google BigQuery dataset "bigquery-public-data.new_york.tlc_yellow_trips_2015"
for the purposes of this submission

Project Plan
============
1. Choose maps component (@angular/google-maps) 
2. Design components and services
3. Write Google bigquery data service to fetch data
4. Stream to map component
5. Authentication to show data region-wise/location-wise using Firebase

Decisions
=========
Used Firebase functions to invoke GCP BigQuery NYC datasets
Called the firebase function from Angular service
Using Marker Clustering for zoomed out data representation
Authentication using Firebase

Steps
=====
npm install --save @agm/core [Had to discard this @angular/google-maps]
npm install -g firebase-tools
