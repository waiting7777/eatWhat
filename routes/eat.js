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

var kanpai = {
    "type": "template",
    "altText": "老乾杯",
    "template": {
        "type": "buttons",
        "thumbnailImageUrl": "https://datam.idv.tw/images/kanpai.png",
        "title": "老乾杯",
        "text": "老乾杯堅持提供最優質的食材及最頂級的澳洲和牛，全程冷藏熟成。",
        "actions": [
            // {
            //   "type": "postback",
            //   "label": "Buy",
            //   "data": "action=buy&itemid=123"
            // },
            {
              "type": "uri",
              "label": "餐廳網站",
              "uri": "http://www.kanpaiclassic.tw/"
            }
        ]
      }
  }

var wang = {
    "type": "template",
    "altText": "王品牛排",
    "template": {
        "type": "buttons",
        "thumbnailImageUrl": "https://datam.idv.tw/images/wang.jpg",
        "title": "王品牛排",
        "text": "王品獨具中式口味的牛排，以特殊佐料醃浸兩天兩夜，再250℃烤箱慢火烘烤一個半小時，以高溫瓷盤盛裝，保持牛排的香嫩風味。",
        "actions": [
            // {
            //   "type": "postback",
            //   "label": "Buy",
            //   "data": "action=buy&itemid=123"
            // },
            {
              "type": "uri",
              "label": "餐廳網站",
              "uri": "http://www.wangsteak.com.tw/index.html"
            }
        ]
    }
  }

  var bull = {
    "type": "imagemap",
    "baseUrl": "https://datam.idv.tw/images/bull",
    "altText": "五牛牛肉麵",
    "baseSize": {
        "height": 800,
        "width": 598
    },
    "actions": [
        {
            "type": "uri",
            "linkUri": "https://www.facebook.com/pages/%E4%BA%94%E7%89%9B%E7%89%9B%E8%82%89%E9%BA%B5%E9%A4%A8%E6%B1%90%E6%AD%A2%E5%BA%97/128301753913911",
            "area": {
                "x": 0,
                "y": 0,
                "width": 598,
                "height": 200
            }
        },
        {
            "type": "message",
            "text": "五牛牛肉麵",
            "area": {
                "x": 0,
                "y": 600,
                "width": 598,
                "height": 200
            }
        }
    ]
  }

var lunch = ['五牛', '越南', '古早味', '八方', '大呼過癮', '煲飯', '小廚房', '韋安']

router.post('/', function(req, res, next) {
  console.log(req.body.events[0]);
  var replycontent

  var text = req.body.events[0].message.text
  var type = req.body.events[0].message.type

  if(type == 'text'){

    if(text == '台北' || text == '新北' || text == '中午' || text == '@' || text == '吃什麼'){

      switch (text) {
        case '台北':
          replycontent = kanpai
          break;
        case '新北':
          replycontent = wang
          break
        case '中午':
        case '吃什麼':
          replycontent = {
              "type": "template",
              "altText": lunch[Math.floor(Math.random()*lunch.length)],
              "template": {
                  "type": "buttons",
                  "thumbnailImageUrl": "https://datam.idv.tw/images/lunch.jpg",
                  "title": lunch[Math.floor(Math.random()*lunch.length)],
                  "text": "GO GO GO。",
                  "actions": [
                      {
                        "type": "message",
                        "label": lunch[Math.floor(Math.random()*lunch.length)],
                        "text": lunch[Math.floor(Math.random()*lunch.length)]
                      },
                      // {
                      //   "type": "uri",
                      //   "label": "餐廳網站",
                      //   "uri": "http://www.wangsteak.com.tw/index.html"
                      // }
                  ]
              }
            }

          break
        case '@':
          replycontent = {
            "type": "text",
            "text": lunch.toString()
          }
          break
        default:

      }

      var data = {
        "replyToken":req.body.events[0].replyToken,
          "messages":[
            replycontent
          ]
      }

      console.log(data)



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

    }

  }

  res.send('respond with a resource');
});

module.exports = router;
