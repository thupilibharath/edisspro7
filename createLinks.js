/**
 * Created by Bharath on 11/30/15.
 */
/**
 * Created by Bharath on 10/20/15.
 */


/*
 lineReader will extract the records from amazon-meta.txt one at a time as
 file is too large to read all at once.  In order to add records to a database you need to add code below to insert records

 This code depnds on "line-reader"

 You need to install line-reader by using the following command:
 npm install line-reader

 */
var lineReader = require('line-reader');
var mongojs = require('mongojs');
var fs = require('fs');
var mongoURL = 'mongodb://54.152.184.110:27017/Project5';
db = mongojs(mongoURL, [], {
    authMechanism: 'ScramSHA1'
});
collection = db.collection('links');
var record = new Object();
record.categories = [];
var jsonRecord;
var already = false;
var categories = false;
var stop = 2;
var count = 0 ;
var data;
var query;

lineReader.eachLine('AlsoBuyData.csv', function(line, last) {
    if(count!=0) {
        var line1 = line.substring(0, line.indexOf("\r"));
        var arr = line1.split(',');

        collection.insert({id1:arr[0],id2:arr[1]}, function(err,rows){
            if(err)
                console.log(err);
            else
                console.log('----->Id is '+arr[0]);
        });

    }
    count++;
});