var express = require('express');
var router = express.Router();
var https = require('https');
var request = require('request');

var options = {
    host : 'api.line.me',
    port : 443,
    path : '/v2/bot/message/reply',
    method : 'POST',
    headers : {
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer [cQipx+TESv6L2tqATNpmSgxLQina1q0dL4/B3HhsOkQ41K0Gm0dUo1BdRsHsljYObo7kluTsR5tMmtR9USvykMBGOoTAJu2urONEC1tdYFd0Pn3ahWmeHyYnHtDWkmIJg20WV2yrt5XURX3XzesD0AdB04t89/1O/w1cDnyilFU=]'
    }
}

router.get('/', function(req, res, next) {
  console.log(123)
  res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
  console.log(req.body.events[0]);

  var data = {
    "replyToken":req.body.events[0].replyToken,
      "messages":[
          {
              "type":"text",
              "text":"Hello, user"
          },
          {
              "type":"text",
              "text":"May I help you?"
          }
      ]
  }

  console.log(data)

  var request = https.request(options, function(response) {
        console.log('Status: ' + response.statusCode);
        console.log('Headers: ' + JSON.stringify(response.headers));
        console.log('Body: ' + data);
        response.setEncoding('utf8');
        response.on('data', function(body) {
            console.log(body);
        });
    });
    request.on('error', function(e) {
        console.log('123')
        console.log('Request error: ' + e.message);
    });
    request.end(JSON.stringify(data))

  res.send('respond with a resource');
});

module.exports = router;
