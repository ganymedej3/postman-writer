const newman = require('newman'); 
const fs = require('fs');
let logs = [];

// Retrieve the RapidAPI key and data file path from environment variables
const rapidApiKey = process.env.RAPIDAPI_KEY;
const dataFile = process.env.DATA_FILE;

// Check if both environment variables are provided
if (!rapidApiKey || !dataFile) {
    console.error('Please provide both RAPIDAPI_KEY and DATA_FILE environment variables.');
    process.exit(1);
}

// Run a Postman collection using Newman
newman.run({
    // Specify the Postman collection file to run
    collection: require('./postman-writer.postman_collection.json'),
    // Specify the data file for iterations (likely containing test data)
    iterationData: `./${dataFile}`,
    // Specify the Postman environment file
    environment: './postman-writer.postman_environment.json',
    // Set environment variable for the RapidAPI key
    envVar: [{ "key": "rapidApiKey_evar", "value": `${rapidApiKey}` }],
    reporters: ['junit','junitfull','csv','json'],
    folder: 'TranslateJokes',
    reporter: { junit: {export: './reports/junitReport.xml'}, junitfull: { export: './reports/junitFullReport.xml' }, csv: { export: './reports/csvresults.csv' }, json: { export: './reports/jsonresults.json'} }
}, function (err) {
	if (err) { throw err; }
    console.log('Collection run complete!');
})
.on('start', function(err, args){
    console.log('Collection run started');
})
.on('console', function (err, args) {
    if (err) { return; }
    logs.push(args.messages);
})
.on('done', function(err, summary){
    if (err || summary.error) {
        console.error('collection run encountered an error.');
    }
    else {
        console.log('collection run completed.');
        // Extract and save translated jokes to a JSON file
        const allTranslatedJokes = summary.environment.values.reference.allTranslatedJokes_evar.value;
        fs.writeFileSync('all_jokes_in_Spanish.json', allTranslatedJokes);
    }
});