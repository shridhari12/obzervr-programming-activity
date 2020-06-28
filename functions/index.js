const functions = require('firebase-functions');
const cors = require('cors')({
    origin: true
});

// Imports the Google Cloud client library
const { BigQuery } = require('@google-cloud/bigquery');

// // Cors response to handle the result from BigQuery
function responseCors(req, res, data) {
    return cors(req, res, () => {
        res.json({
            result: data
        });
    });
}

// // Cors error when the function throw an error
function errorCors(req, res, error) {
    return cors(req, res, () => {
        res.status(500).send(error);
    });
}
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.bigQueryFetchData = functions.https.onRequest((request, response) => {
    console.info('[bigQueryFetchData] inside now ...');

    const bqClient = new BigQuery();
    let pickupDateTime, dropoffDateTime;
    if (request && request.body) {
        const reqBody = request.body;
        pickupDateTime = reqBody['pickupDt'];
        dropoffDateTime = reqBody['dropoffDt'];
        console.info('request [body] [pickupDt] ', pickupDateTime, ' [dropoffDt] ', dropoffDateTime);
    }
    
pickupDateTime = "2015-01-15 02:00:00+00"; //TO BE RETRIEVED FROM REQUEST BODY
dropoffDateTime = "2015-01-15 02:30:00+00"; //TO BE RETRIEVED FROM REQUEST BODY
    const sqlQuery = `SELECT 
    pickup_datetime,
    pickup_longitude,
    pickup_latitude,
    dropoff_datetime,
    dropoff_longitude,
    dropoff_latitude
  FROM \`bigquery-public-data.new_york.tlc_yellow_trips_2015\`
  WHERE 
    ((pickup_datetime BETWEEN TIMESTAMP("${pickupDateTime}") AND TIMESTAMP("${dropoffDateTime}"))
    AND (dropoff_datetime BETWEEN TIMESTAMP("${pickupDateTime}") AND TIMESTAMP("${dropoffDateTime}")))
  LIMIT 50`;

    const options = {
        query: sqlQuery,
        // Location must match that of the dataset(s) referenced in the query.
        location: 'US',
    };
    console.info('[bigQueryFetchData] about to run query now ...');

    let bqResponse = bqClient.query({
        query: sqlQuery,
        location: 'US'
    })
    .then(result => {
        let rows = result[0];
        console.debug('result [result] length ', rows.length, ' JSON ==> ', JSON.stringify(rows));
        return cors(request, response, () => {
            response.status(200).send(rows);
        });
    })
    .catch(err => {
        console.error('error encountered');
        console.log(err);
    })

});
