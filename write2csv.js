const newman = require('newman'); 
const fs = require('fs');
let logs = [];

const resultsFileName = 'jokes.csv';
const rapidApiKey = process.env.RAPIDAPI_KEY;

newman.run({
    collection: require('./postman-writer.postman_collection.json'),
    reporters: ['junitfull','csv','json'],
    folder: 'GetJokes',
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
    }
    fs.writeFileSync(resultsFileName, logs.join("\r\n"));
});