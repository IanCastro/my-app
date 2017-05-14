/*var React = require('react'),
    Router = require('react-router'),
    Route = Router.Route,
    RouteHandler = Router.RouteHandler,
    ContentPage = require('./App'),
    routes;

console.log(Router)
/*App = React.createClass({
    render: function(){
         return (
              <div className="App">
                  <RouteHandler />
              </div>
         );
    }
});*/
/*class App extends React.Component {
  render() {
    return (
              <div className="App">
                  <RouteHandler />
              </div>
         );
  }
}

routes = (
    <Route name="app" path="/" handler={App}>
        <Route handler={ContentPage}/>
    </Route>
);

module.exports = {
    run: function () {
  console.log("bbbbb");
        Router.run(routes, function (Handler) {
            React.render(<Handler/>, document.body)
        });
    }
};*/
//*/
import React from 'react';
//console.log('React ' + React);
import ReactDOM from 'react-dom';
import App from './App';
//import App2 from './App2';
//import './index.css';

/*var React   = require ('react')
var mysql   = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123.123',
  degug    : 'true',
});

connection.connect(function(err) { if ( !err ) { 
    console.log("Connected to MySQL"); 
    } else { console.log("Error : ",err) }
});
    console.log("Connected to "); 
*/


ReactDOM.render(
  <App />,
  document.getElementById('root')
);
//*/
/*var express = require('express');
var mysql = require('mysql');
var connection  = require('express-myconnection');

var app = express();
app.use(
   connection(mysql,{
     host: 'localhost',
     user: 'root',
     password : '123.123',
     port : 3306, //port mysql
     database:'dbnote'
   },'request')
);

var routes = express.Router();
routes.get('/lembretes', function(req, res) {
  req.getConnection(function(err,connection){
    console.log('res.query: ' + res.query);
        //{idnote: 97, title: 'title', body: 'body'}
        connection.query('SELECT title FROM note', [], function(err,result) {
            console.log(result);
            if(err) return res.status(400).json(err);
            return res.status(200).json(result);
        });
  });
});
app.use('/', routes);



app.set('port', process.env.PORT || 3002);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});
//*/

/*//import Router from 'react-router';  
var Router = require('react-router');
console.log('Router ' + Router);
//import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';
import { Route } from 'react-router';


let routes = (  
  <Route name="app" path="/" handler={App}>
    <Route name="login" path="/login" handler={App2}/>
  </Route>
);

console.log('Router ' + Router);
console.log('Router ' + Router.run);
Router.run(routes, function (Handler) {
  console.log('Handler');
  //console.log(Handler);
  ReactDOM.render(<app/>, document.getElementById('root'));
});
//*/

/*
var mysql      = require('mysql');
var connection = mysql.createConnection({
   host     : 'localhost',
   user     : 'root',
   password : '123.123',
   database : 'new_schema'
});

connection.connect(function(err) { if ( !err ) { 
    console.log("Connected to MySQL"); 
    } else { console.log("Error : ",err) }
});
*/
/*
 connection.query('SELECT * from new_table', 
 		function(err, rows, fields) {
   if (!err)
     console.log('The solution is: ', rows);
   else
     console.log('Error while performing Query.');
 });
 
 connection.end();*/