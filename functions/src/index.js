const functions = require('firebase-functions');
const admin = require('firebase-admin');
const bigquery = require('@google-cloud/bigquery');
const cors = require('cors')({
    origin: true
});

// Imports the Google Cloud client library

// async function executeQuery(query) {
//     // Create a client
//     const bigQueryClient = new BigQuery();
//     const sqlQuery = query;

//     const options = {
//         query: sqlQuery,
//         timeoutMs: 100000,
//         useLegacySql: false
//     };

//     // Runs the query
//     return bigQueryClient.query(options);
// }

// // Cors response to handle the result from BigQuery
// function responseCors(req: any, res: any, error: any) {
//     return cors(req, res, () => {
//       res.json({
//         result: data
//       });
//     });
//   }

// // Cors error when the function throw an error
// function errorCors(req: any, res: any, error: any) {
//     return cors(req, res, () => {
//       res.status(500).send(error);
//     });
// }

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const queryStackOverflow = async () => {
    const bigqueryClient = new bigquery.BigQuery();

    const sqlQuery = `SELECT
    CONCAT(
      'https://stackoverflow.com/questions/',
      CAST(id as STRING)) as url,
    view_count
    FROM \`bigquery-public-data.stackoverflow.posts_questions\`
    WHERE tags like '%google-bigquery%'
    ORDER BY view_count DESC
    LIMIT 10`;

    const options = {
        query: sqlQuery,
        // Location must match that of the dataset(s) referenced in the query.
        location: 'US',
    };
    console.info('going to run query now');
    // Run the query
    const [rows] = await bigqueryClient.query(options);
    console.info('query run over');
    console.log('Query Results:', rows);
    // rows.array.forEach(row: any => {
    //     const url = row['url'];
    // const viewCount = row.view_count;
    // console.log(`url: ${url}, ${viewCount} views`);
    // });
    // rows.forEach((row) => {

    // });
}

exports.bigQSqlQuery = functions.https.onRequest(async (req, res) => {
    try {
        // const projectId = '';
        // //const data = req.body;
        // const datasetName = functions.config().bigquery.datasetname;
        // const tableName = functions.config().bigquery.tablename;
        // const table = `${projectId}.${datasetName}.${tableName}`;
        // //const query = data.query;

        // const query = `SELECT
        // pickup_datetime,
        // pickup_longitude,
        // pickup_latitude,
        // dropoff_datetime,
        // dropoff_longitude,
        // dropoff_latitude
        // FROM ${table}
        // WHERE
        //     ((pickup_datetime BETWEEN TIMESTAMP("2015-01-15 02:00:00+00") AND TIMESTAMP("2015-01-15 02:30:00+00"))
        //     AND (dropoff_datetime BETWEEN TIMESTAMP("2015-01-15 02:00:00+00") AND TIMESTAMP("2015-01-15 02:30:00+00")))
        //     trip_distance > 0
        //     AND fare_amount/trip_distance BETWEEN 2
        //     AND 10
        //     AND dropoff_datetime > pickup_datetime
        //     GROUP BY
        //     1
        //     ORDER BY
        //     1`;
        console.info('running big query now ');
            const sqlQuery = `SELECT
    CONCAT(
      'https://stackoverflow.com/questions/',
      CAST(id as STRING)) as url,
    view_count
    FROM \`bigquery-public-data.stackoverflow.posts_questions\`
    WHERE tags like '%google-bigquery%'
    ORDER BY view_count DESC
    LIMIT 10`;
        console.info('new console stmt');
        const bigqueryClient = new bigquery.BigQuery();
        const [rows] = await bigqueryClient.query(sqlQuery);
        console.log('query is over ');
        console.info('[rows] ', rows);
        // return bigquery.query({
        //     query: sqlQuery,
        //     location: 'US'
        // }).then((result) => {
        //     //cors(req, res, () => {
        //         //res.json(result[0]);
        //         console.info('inside result');
        //         res.send(JSON.stringify(result[0]));
        //     //})
        // }).catch((error) => {
        //     console.error('error ', error);
        // }) 

        //const projectId = '';
        //const data = req.body;
        //const datasetName = functions.config().bigquery.datasetname;
        //const tableName = functions.config().bigquery.tablename;
        //const table = `${projectId}.${datasetName}.${tableName}`;
        //const query = data.query;

        // const query = `SELECT
        // pickup_datetime,
        // pickup_longitude,
        // pickup_latitude,
        // dropoff_datetime,
        // dropoff_longitude,
        // dropoff_latitude
        // FROM ${table}
        // WHERE
        //     ((pickup_datetime BETWEEN TIMESTAMP("2015-01-15 02:00:00+00") AND TIMESTAMP("2015-01-15 02:30:00+00"))
        //     AND (dropoff_datetime BETWEEN TIMESTAMP("2015-01-15 02:00:00+00") AND TIMESTAMP("2015-01-15 02:30:00+00")))
        //     trip_distance > 0
        //     AND fare_amount/trip_distance BETWEEN 2
        //     AND 10
        //     AND dropoff_datetime > pickup_datetime
        //     GROUP BY
        //     1
        //     ORDER BY
        //     1`;
    

        // return bigquery.query({
        //     query: sqlQuery,
        //     useLegacySql: false
        // }).then((result: any[]) => {
        //     cors(req, res, () => {
        //         res.json(result[0]);
        //     })
        // })
        //res.send("Hello from Firebase!");
        // if (!dataSetName) {
        //     return errorCors(req, res, 'Dataset name does not exists');
        // }

        // // If there is no query params from the App
        // if (!query) {
        //     return errorCors(req, res, 'Query does not exists');
        // }
        // const result = await executeQuery(query);
        // return responseCors(req, res, result);

    } catch (error) {
        // Otherwise throw an error
        // errorCors(req, res, error);
        return;
    }
})
