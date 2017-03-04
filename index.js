var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.set('view engine', 'html');

app.use('/src', express.static(__dirname + '/JUDGE/src'));
app.use('/assets', express.static(__dirname + '/JUDGE/assets'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/JUDGE/index.html')
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});