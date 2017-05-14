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

	//var q = 'insert into note values("'+id+'","'+title+'","'+body+'")';
	//console.log(q);
	//connection.query(q, insertCallBack);


	var post  = {idnote: id, title: title, body: body};
	var query = connection.query('INSERT INTO note SET ?', post, insertCallBack);
	console.log(query.sql); // INSERT INTO posts SET `id` = 1, `title` = 'Hello MySQL'
	//connection.query(query.sql, insertCallBack);



	connection.end();
}

insert(53, 'Isso é outra nota', 'este é um outro corpo para outra nota');
select();
