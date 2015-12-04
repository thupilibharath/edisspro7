/**
 * Created by Bharath on 11/30/15.
 */
exports.alsoBought = function(req,res){

    console.log('*****ALSO BOUGHT------------');

    var id1 = req.body.productId1;
    var id2 = req.body.productId2;

    var collection = db.collection('links');

    collection.insert({id1:id1, id2:id2}, function(err,rows){
       if(err){
           console.log('there was a problem processing the request');
           res.json('there was a problem processing the request');
       }
        else{
           console.log('the request was successful');
           res.json('the request was successful');
       }
    });
};