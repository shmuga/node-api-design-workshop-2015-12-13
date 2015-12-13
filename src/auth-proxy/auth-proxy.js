const express = require('express'),
  bodyParser = require('body-parser'),
  oauthserver = require('oauth2-server'),
  proxy = require('proxy-middleware'),
  http = require('http');

const model = require('./auth-model');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.oauth = oauthserver({
  model,
  grants: ['password'],
  debug: true
});

app.all('/oauth/token',  app.oauth.grant());

app.all('*', proxy('http://localhost:5000'));


module.exports = http.createServer(app);
