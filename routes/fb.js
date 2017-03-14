var express = require('express');
var router = express.Router();
var https = require('https');
var request = require('request');

var options = {
    host : 'graph.facebook.com',
    port : 443,
    path : '/v2.6/me/messages?access_token=EAAXWlMg1DP0BABZB8WHaVJWFQMZBc0HTzzVinXTJSFOQsDsoCTViNL0HtrawPHluJEi9OBnOxPNpKuNHdaf7Q4qbYg5mN1vVJVui2bUBuVnnZBmOIpgDwjrVKtjZAYycS3NP3422EbgvZBQZCLkOYazcDdosMhYaSBdmCNz61iigZDZD',
    method : 'POST',
    headers : {
        'Content-Type' : 'application/json',
    }
}

module.exports = router;

router.get('/', function(req, res, next) {
  if (req.query['hub.verify_token'] === 'EAAXWlMg1DP0BABZB8WHaVJWFQMZBc0HTzzVinXTJSFOQsDsoCTViNL0HtrawPHluJEi9OBnOxPNpKuNHdaf7Q4qbYg5mN1vVJVui2bUBuVnnZBmOIpgDwjrVKtjZAYycS3NP3422EbgvZBQZCLkOYazcDdosMhYaSBdmCNz61iigZDZD') {
    res.send(req.query['hub.challenge']);
  } else {
    res.send('Error, wrong validation token');
  }
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
