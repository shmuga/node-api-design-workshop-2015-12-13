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

app.get('/', app.oauth.authorise(), function (req, res) {
  res.send('Secret area');
});
app.all('*', proxy('http://localhost:5000'));

app.use(function(){
  console.log(arguments);
});

module.exports = http.createServer(app);
