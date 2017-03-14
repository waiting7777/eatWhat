var express = require('express');
var router = express.Router();
var https = require('https');
var request = require('request');

module.exports = router;

router.get('/', function(req, res, next) {
  if (req.query['hub.verify_token'] === 'EAAXWlMg1DP0BABZB8WHaVJWFQMZBc0HTzzVinXTJSFOQsDsoCTViNL0HtrawPHluJEi9OBnOxPNpKuNHdaf7Q4qbYg5mN1vVJVui2bUBuVnnZBmOIpgDwjrVKtjZAYycS3NP3422EbgvZBQZCLkOYazcDdosMhYaSBdmCNz61iigZDZD') {
    res.send(req.query['hub.challenge']);
  } else {
    res.send('Error, wrong validation token');
  }
});
