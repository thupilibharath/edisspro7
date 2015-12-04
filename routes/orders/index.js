/**
 * Created by Bharath on 10/27/15.
 */
exports.getOrders = function(req,res){

    console.log('*****GET ORDERS------------');
    var sess = req.session;

    if(sess.username&&sess.role=='admin') {
        var map = require('hashmap');
        var mymap = new map();
        var orders = db.collection('order_details');
        orders.find().toArray(function (err, rows) {
            if (!err) {
                var n = rows.length;
                for (var i = 0; i < n; i++) {
                    //console.log(mymap.has(rows[i].productId));
                    if (typeof mymap.get(parseInt(rows[i].productId)) == 'undefined') {
                        mymap.set(parseInt(rows[i].productId), 1);
                    } else {
                        mymap.set(parseInt(rows[i].productId), (mymap.get(parseInt(rows[i].productId)) + 1));
                    }
                }

                var arr = new Array();

                mymap.forEach(function (value, key) {
                    var record = new Object();
                    record["productId"] = key;
                    record["quantitySold"] = value;
                    arr.push(record);
                });

                var report = new Object();
                report["report"] = arr;
                report["message"] = 'the request was successful';
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(report), null, 3);

            }
        });
    }else {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({message: 'you need to login as an admin prior to making the request'}, null, 3));

    }
};
