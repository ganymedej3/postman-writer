const newman = require('newman'); 
const fs = require('fs');
let logs = [];

const rapidApiKey = process.env.RAPIDAPI_KEY;
const dataFile = process.env.DATA_FILE;

if (!rapidApiKey || !dataFile) {
    console.error('Please provide both RAPIDAPI_KEY and DATA_FILE environment variables.');
    process.exit(1);
}

newman.run({
    collection: require('./postman-writer.postman_collection.json'),
    iterationData: `./${dataFile}`,
    environment: './postman-writer.postman_environment.json',
    envVar: [{ "key": "rapidApiKey_evar", "value": `${rapidApiKey}` }],
    reporters: ['junitfull','csv','json'],
    folder: 'TranslateJokes',
    reporter: { junitfull: { export: './reports/junitResults.xml' }, csv: { export: './reports/csvresults.csv' }, json: { export: './reports/jsonresults.json'} }
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
        const allTranslatedJokes = summary.environment.values.reference.allTranslatedJokes_evar.value;
        fs.writeFileSync('all_jokes_in_Spanish.json', allTranslatedJokes);
    }
});