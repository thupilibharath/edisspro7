/**
 * Created by Bharath on 12/2/15.
 */

exports.getRecommendations = function(req,res){

    console.log('*****RECOMMENDATIONS------------');

    var sess = req.session;

    if(sess.username){
    var collection = db.collection('links');
    var id = req.body.productId;
    var arr1=[];var arr2=[];var temp;var temp1;var result = [];
    collection.find({id1:id}).toArray(function(err, rows){
        if(!err) {
            var map = require('hashmap');
            var mymap = new map();

            for (var i = 0; i < rows.length; i++) {
                if (typeof mymap.get(rows[i].id2) == 'undefined') {
                    mymap.set(rows[i].id2, 1);
                } else {
                    mymap.set(rows[i].id2, (mymap.get(rows[i].id2) + 1));
                }
            }

            //console.log(mymap);

            for (var i = 0; i < mymap.count(); i++) {
                arr1[i] = rows[i].id2;
                arr2[i] = mymap.get(rows[i].id2);

                //console.log(arr1[i]+'------>'+arr2[i]);
            }

            for (var i = 0; i < arr2.length; i++) {
                for (var j = (i + 1); j < arr2.length; j++) {
                    if (arr2[i] < arr2[j]) {
                        temp = arr2[i];
                        arr2[i] = arr2[j];
                        arr2[j] = temp;

                        temp1 = arr1[i];
                        arr1[i] = arr1[j];
                        arr1[j] = temp1;
                    }
                }
            }


            console.log(arr1[0] + ' --' + arr1[1] + ' --' + arr1[2] + ' --' + arr1[3] + ' --' + arr1[4]);
            result[0] = arr1[0];
            result[1] = arr1[1];
            result[2] = arr1[2];
            result[3] = arr1[3];
            result[4] = arr1[4]


            res.json({message: 'the request was successful', relatedProducts: result, data:'relatedProducts:'});
        }
        else{
            res.json('there was a problem processing the request');
        }

    });
    }
    else {
        res.json('there was a problem processing the request');
    }


};