var express = require('express');
var router = express.Router();
var https = require('https');
var request = require('request');

var options = {
    host : 'graph.facebook.com',
    port : 443,
    path : '/v2.6/me/messages?access_token=EAAXWlMg1DP0BAHDBq9ff7TaGYFalLLhtoKmL7DToyDZAO5zKbB8UPYDLRUt4O07gaLaZBfCRtlqUy5ZCDmfQmTTDDvxB2xc1oJHGTXkm6eKJu175A07VE7B5gkRH5qJGaUZCDCJGzFmSVrzn63vTfUZCOL73K3n4J9xKHDBZBYrgZDZD',
    method : 'POST',
    headers : {
        'Content-Type' : 'application/json',
    }
}

module.exports = router;

router.get('/', function(req, res, next) {
  if (req.query['hub.verify_token'] === 'EAAXWlMg1DP0BAHDBq9ff7TaGYFalLLhtoKmL7DToyDZAO5zKbB8UPYDLRUt4O07gaLaZBfCRtlqUy5ZCDmfQmTTDDvxB2xc1oJHGTXkm6eKJu175A07VE7B5gkRH5qJGaUZCDCJGzFmSVrzn63vTfUZCOL73K3n4J9xKHDBZBYrgZDZD') {
    res.send(req.query['hub.challenge']);
  }
    res.send('Error, wrong validation token');
});

router.post('/', function(req, res, next) {
  console.log(req)
  var data = {
    "recipient": {
      "id": req.body.entry[0].messaging.sender.id
    },
    "message": {
      "text": req.body.entry[0].messaging.message.text
    }
  }
  var request = https.request(options, function(response) {
        console.log('Status: ' + response.statusCode);
        console.log('Headers: ' + JSON.stringify(response.headers));
        console.log('Body: ' + JSON.stringify({data}));
        response.setEncoding('utf8');
        response.on('data', function(body) {
            console.log('456')
            console.log(body);
        });
    });
    request.on('error', function(e) {
        console.log('123')
        console.log('Request error: ' + e.message);
    });
    request.end(JSON.stringify(data))

})
