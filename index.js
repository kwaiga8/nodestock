const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const request = require('request');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;

//use body parser middleware
app.use(bodyParser.urlencoded({extended: false}));


//Set Handlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// API key pk_eccb295f06ba47e0af17723716cf5089
//create call_api function

function call_apis(finishedAPI, ticker){
    request('https://cloud.iexapis.com/stable/stock/'+ ticker +'/quote?token=pk_eccb295f06ba47e0af17723716cf5089', {json: true}, (err, res, body) =>{
    if (err) {return alert(err);}
    if (res.statusCode === 200){
        finishedAPI(body);
    }

});
}
// set handlebars index GET routes
app.get('/', function (req, res) {
      call_apis(function(doneAPI){
         res.render('home', {
        stuff: doneAPI
        });
      }, 'fb');
});

// set handlebars index POST routes
app.post('/', function (req, res) {
      call_apis(function(doneAPI){
          posted_stuff =req.body.stock_ticker;
         res.render('home', {
        stuff: doneAPI,
             posted_stuff: posted_stuff
        });
      }, req.body.stock_ticker);
});

// create Boeing page route
app.get('/boeing.html', function (req, res) {
      call_apis(function(doneAPI){
         res.render('boeing', {
        stuff: doneAPI
        });
      }, 'ba');
});

//Set static folder
app.use( express.static(path.join(__dirname, 'public')));

//port listener
app.listen(PORT, () => console.log('Server Listening on port: ' + PORT));


