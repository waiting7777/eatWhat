var express = require('express');
var router = express.Router();
var linebot = require('linebot');

var bot = linebot({
    channelId: 1505430044,
    channelSecret: '9db9664a13704b75aee5798cb25a339c',
    channelAccessToken: 'cQipx+TESv6L2tqATNpmSgxLQina1q0dL4/B3HhsOkQ41K0Gm0dUo1BdRsHsljYObo7kluTsR5tMmtR9USvykMBGOoTAJu2urONEC1tdYFd0Pn3ahWmeHyYnHtDWkmIJg20WV2yrt5XURX3XzesD0AdB04t89/1O/w1cDnyilFU='
});

router.get('/', function(req, res, next) {
  console.log(123)
  res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
  console.log(456);
  res.send('respond with a resource');
});
