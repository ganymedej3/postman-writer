const newman = require('newman'); 
const fs = require('fs');

// Initialize an empty array to store log messages
let logs = [];
const resultsFileName = 'jokes.csv';

// Run a Postman collection using Newman
newman.run({
    // Specify the Postman collection file to run
    collection: require('./postman-writer.postman_collection.json'),
    // Define the reporters to generate output in multiple formats
    reporters: ['junitfull','csv','json'],
    // Specify the folder within the collection to run
    folder: 'GetJokes',
    // Configure the reporter options for each format
    reporter: { junitfull: { export: './reports/junitResults.xml' }, csv: { export: './reports/csvresults.csv' }, json: { export: './reports/jsonresults.json'} }
}, function (err) {
    // Handle any errors that occur during the collection run
	if (err) { throw err; }
    console.log('Collection run complete!');
})
.on('start', function(err, args){
    // Handle the event when the collection run start
    console.log('Collection run started');
})
.on('console', function (err, args) {
    // Handle console log messages during the collection run
    if (err) { return; }
    logs.push(args.messages); // Store log messages in the 'logs' array
})
.on('done', function(err, summary){
    // Handle the event when the collection run completes
    if (err || summary.error) {
        // Check if there was an error during the collection run
        console.error('collection run encountered an error.');
    }
    else {
        console.log('collection run completed.');
    }
    // Write the collected log messages to the specified CSV file
    fs.writeFileSync(resultsFileName, logs.join("\r\n"));
});