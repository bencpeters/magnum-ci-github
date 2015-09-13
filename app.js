'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var github = require('octonode');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post("/build_update/:githubToken", function(req, res) {
  var client = github.client(req.params.githubToken);
  var payload = JSON.parse(req.body.payload);
  var repo = client.repo(payload.commit_url.match(/github\.com\/(.+?\/.+?)\//)[1]);
  repo.status(payload.commit, {
    state: payload.status === "pass" ? "success" : "failure",
    target_url: payload.build_url,
    description: payload.title,
    context: "continuous-integration/magnum-ci"
  }, function() {
    res.end('');
  });
});

var server = app.listen(process.env.PORT || 3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);
});
