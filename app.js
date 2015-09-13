'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var github = require('octonode');

app.use(bodyParser.json({ type: 'application/*+json' }));

app.post("/build_update/:githubToken", function(req, res) {
  var client = github.client(req.params.githubToken);
  var repo = client.repo(req.params.payload.commit_url.match(/github\.com\/(.+?\/.+?)\//)[1]);
  repo.status(req.params.payload.commit, {
    state: req.params.payload.status === "pass" ? "success" : "failure",
    target_url: req.params.payload.build_url,
    description: req.params.payload.title,
    context: "continuous-integration/magnum-ci"
  }, function() {
    res.end('');
  });
});

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);
});
