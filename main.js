const newman = require('newman'); 
const fs = require('fs');
let logs = [];

//const dataFile = process.env.DATA_FILE;
const resultsFileName = 'jokes' + '.csv';

newman.run({
    collection: require('./postman-writer.postman_collection.json'),
    //iterationData: `./${dataFile}`,
    //globals: './pw_postman_collection.json',
    //globalVar: [{ "key": "env", "value": `${test}` }],
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


/*
newman.run({
    collection: require('./postman-writer.postman_collection.json'),
    environment: './postman-writer.postman_environment.json',
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
        fs.writeFileSync('All_jokes_in_Spanish.json', allTranslatedJokes);
    }
});*/