function selectCallBack(err, rows, fields) {
	if (!err)
		console.log('The solution is: ', rows);
	else
		console.log('Error while performing select Query.');
}

function select() {
	var mysql      = require('mysql');
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '123.123',
		database : 'dbnote'
	});

	connection.connect();

	connection.query('SELECT * from note', selectCallBack);

	connection.end();
}

function insertCallBack(err, rows, fields) {
	console.log('err: ', err);
	if (!err)
		console.log('The solution is: ', rows);
	else
		console.log('Error while performing insert Query.');
}
function insert(id, title, body) {
	var mysql      = require('mysql');
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '123.123',
		database : 'dbnote'
	});

	connection.connect();

	var post  = {idnote: id, title: title, body: body};
	var query = connection.query('INSERT INTO note SET ?', post, insertCallBack);
	console.log(query.sql); // INSERT INTO posts SET `id` = 1, `title` = 'Hello MySQL'

	connection.end();
}

function dropCallBack(err, rows, fields) {
	console.log('err: ', err);
	if (!err)
		console.log('The solution is: ', rows);
	else
		console.log('Error while performing delete Query.');
}
function drop(id) {
	var mysql      = require('mysql');
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '123.123',
		database : 'dbnote'
	});

	connection.connect();

	var post  = {idnote: id};
	var query = connection.query('delete from note where ?', post, dropCallBack);
	console.log(query.sql); // INSERT INTO posts SET `id` = 1, `title` = 'Hello MySQL'

	connection.end();
}

function updateCallBack(err, rows, fields) {
	console.log('err: ', err);
	if (!err)
		console.log('The solution is: ', rows);
	else
		console.log('Error while performing update Query.');
}
function update(id, title, body) {
	var mysql      = require('mysql');
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '123.123',
		database : 'dbnote'
	});

	connection.connect();

	var post  = [title, body, id];
	var query = connection.query('update note set title = ?, body = ? where idnote = ?', post, updateCallBack);
	console.log(query.sql); // INSERT INTO posts SET `id` = 1, `title` = 'Hello MySQL'

	connection.end();
}

//insert(53, 'Isso é outra nota', 'este é um outro corpo para outra nota');
update(2, 'tititi', 'bobo');
//drop(53);
select();
