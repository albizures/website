const express = require('express');
const fs = require('fs');

const app = express();
const languages = fs.readdirSync(__dirname + '/../dist');

app.use(function (req, res, next) {
  // autodetect language
  let lang = req.subdomains[0] || req.acceptsLanguages(...languages) || 'en';
  if (!languages.includes(lang)) {
    lang = 'en';
  }

  req.url = '/' + lang + req.url;
  res.setHeader('Content-Language', lang);
  next();
});

app.use(express.static(__dirname + '/../dist', {
  maxAge: 60000
}));

app.listen(5000);
console.log('Listening on port 5000');
