var express = require('express'),
    app = express(),
    engines = require('consolidate'),
    bodyParser = require('body-parser'),
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({extended: true}));

//Handling errors

function errorHandler(err, req, res, next){
  console.error(err.message);
  console.error(err.stack);
  res.status(500).render('error_template', {error: err});
}

//connect here to mongodb

MongoClient.connect('mongodb://localhost:27017/video', function(err, db){
  assert.equal(null, err);

  console.log('Successfully connected to MongoDB.');

  app.get('/', function(req, res, next){
    res.render('add_movie', {});
  });

  app.post('/add_movie', function(req, res, next){
    var title = req.body.title;
    var year = req.body.year;
    var imdb = req.body.imdb;

    db.collection('movies').insertOne({
      'title': title,
      'year': year,
      'imdb': imdb
    })
    console.log('Inserted: ', db.collection('movies').find({'title': title}));


  })

  app.use(errorHandler);

  var server = app.listen(3000, function(){
    var port = server.address().port;
    console.log("Express server listening on port %s", port);
  })


});
