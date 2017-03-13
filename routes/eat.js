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
          "type": "template",
          "altText": "this is a buttons template",
          "template": {
              "type": "buttons",
              "thumbnailImageUrl": "https://datam.idv.tw/images/kanpai.png",
              "title": "老乾杯",
              "text": "老乾杯堅持提供最優質的食材及最頂級的澳洲和牛，全程冷藏熟成。採和牛一頭燒，於老乾杯可以品味薄切、厚切、角切及現切肋眼牛排之美味，享受澳洲和牛的各式吃法。由老乾杯總料理長研發出多樣前菜及釜飯等精緻料理；甜點師傅精心開發特製甜點及獨家代理的滿壽泉日本酒，讓蒞臨老乾杯的貴賓皆能享用層次豐富的美食饗宴。",
              "actions": [
                  {
                    "type": "postback",
                    "label": "Buy",
                    "data": "action=buy&itemid=123"
                  },
                  {
                    "type": "uri",
                    "label": "餐廳網站",
                    "uri": "http://www.kanpaiclassic.tw/"
                  }
              ]
          }
          }
      ]
  }

  console.log(data)

  var request = https.request(options, function(response) {
        console.log('Status: ' + response.statusCode);
        console.log('Headers: ' + JSON.stringify(response.headers));
        console.log('Body: ' + JSON.stringify(data));
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

  res.send('respond with a resource');
});

module.exports = router;
