const functions = require('firebase-functions');
const cors = require('cors')({
    origin: true
});

// Imports the Google Cloud client library
const { BigQuery } = require('@google-cloud/bigquery');
//const bigquery = require('@google-cloud/bigquery')();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// async function createDatasetIfNotExists(datasetName) {
//     // Creates a client
//     const bigqueryClient = new BigQuery();

//     // Lists all datasets in the specified project
//     const [datasets] = await bigqueryClient.getDatasets();
//     const isExist = datasets.find(dataset => dataset.id == datasetName);

//     if (isExist)
//         return Promise.resolve([isExist]);

//     // Create the dataset
//     return bigqueryClient.createDataset(datasetName);
// }

// async function executeQuery(query) {
//     // Creates a client
//     const bigqueryClient = new BigQuery();
//     const sqlQuery = query;

//     const options = {
//         query: sqlQuery,
//         timeoutMs: 100000, // Time out after 100 seconds.
//         useLegacySql: false, // Use standard SQL syntax for queries.
//     };

//     // Runs the query
//     return bigqueryClient.query(options);
// }

// // Cors response to handle the result from BigQuery
function responseCors(req, res, data) {
    return cors(req, res, () => {
        res.json({
            result: data
        });
    });
}

// // Cors error when the function throw an error
// function errorCors(req, res, error) {
//     return cors(req, res, () => {
//         res.status(500).send(error);
//     });
// }
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
    
    // // Creates a client
    // const bigqueryClient = new BigQuery();

     // Lists all datasets in the specified project
    //  const [datasets] =  bqClient.getDatasets();
    //  console.log('[datasets] ', datasets);

    // The SQL query to run
//     const sqlQuery = `SELECT
// CONCAT(
//   'https://stackoverflow.com/questions/',
//   CAST(id as STRING)) as url,
// view_count
// FROM \`bigquery-public-data.stackoverflow.posts_questions\`
// WHERE tags like '%google-bigquery%'
// ORDER BY view_count DESC
// LIMIT 10`;

//"2015-01-15 02:00:00+00" 2015-01-15 02:30:00+00
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

    //const [rows] = bqClient.query(sqlQuery).then(result =>  { console.info('then block'); return result[0] });
    let bqResponse = bqClient.query({
        query: sqlQuery,
        location: 'US'
    })
    .then(result => {
        let rows = result[0];
        console.debug('result [result] length ', rows.length, ' JSON ==> ', JSON.stringify(rows));
        
        //return result[0];
        //return responseCors(request, response, result[0]);
        //response.send("Hello from Firebase!");
        return cors(request, response, () => {
            response.status(200).send(rows);
        });
        //response.send(rows);
        //return result;
        //response.send("Hello from Firebase!");
    })
    .catch(err => {
        console.error('error encountered');
        console.log(err);
    })

    //console.log('[bqResponse] ', bqResponse);
    // Run the query
    //const [rows] = await bqClient.query(options);
    // console.info('[bigQueryFetchData] query complete [rows] ', rows);
    //response.send('Hello from Firebase');
});
