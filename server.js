const express = require("express"); // Gestión de las peticiones HTTP
const mysql = require('mysql'); // Gestión de la base de datos
const bodyParser = require('body-parser'); // Transformaciones de JSON
const util = require('util'); // Callbacks.

// - Inicio Configuración del servidor web

var app = express();

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));


app.listen(3000);
console.log('Server running at http://127.0.0.1:3000/');

// - Fin Configuración servidor web

// 
function crearConexion() {
	connection = mysql.createConnection({
		host: 'localhost',
		port: '3306',
		user: 'root',
		password: '',
		database: 'test'
	});
	return {
		query(sql, args) {
			return util.promisify(connection.query)
				.call(connection, sql, args);
		},
		close() {
			return util.promisify(connection.end).call(connection);
		}
	};
}


app.get("/getVehiculos", async function (req, res) {

	console.log("en GetVehiculos");
	const connectionDB = crearConexion();
	var mensaje = "OK";
	try {
		console.log(0)
		const rows = await connectionDB.query('SELECT * from vehiculo');
		console.log('the solution is: ', rows);
		res.json(rows);

	} catch (err) {
		console.log('Error while performing Query');
		console.log(err);
		mensaje = "NO_OK";
		res.send(mensaje);
	} finally {
		await connectionDB.close();
	}
});



app.post("/insertUser", async function (req, res) {
	var mensaje = "OK";
	const user = {
		nombre: req.body.nombre,
		apellidos: req.body.apellidos,
		correo: req.body.correo,
		username: req.body.username,
		password: req.body.password,
	}
	console.log(user);

	const connectionDB = crearConexion();

	try {
		const results = await connectionDB.query("INSERT INTO usuario SET ?", user);
		console.log("insertado");
	} catch (err) {
		console.log('Error al insertar usuario');
		console.log(err);
		mensaje = "NO_OK";
	} finally {
		res.send(mensaje);
	}
});

app.post("/insertMsg", async function (req, res) {
	var mensaje = "OK";
	var contact = {
		nombre1: req.body.nombre1,
		correo1: req.body.correo1,
		asunto: req.body.asunto,
		mensaje: req.body.mensaje
	}
	const connectionDB = crearConexion();

	try {
		const results = await connectionDB.query("INSERT INTO contact SET ?", contact);
		console.log("insertado");
	} catch (err) {
		console.log('Error while performing Query 2');
		console.log(err);
		mensaje = "NO_OK";
	} finally {
		res.send(mensaje);
	}
});


app.post("/login", async function (req, res) {
	var data = {
		username: req.body.username,
		password: req.body.password,
	}
	const connectionDB = crearConexion();
	console.log(data);
	message = "BAD";
	try {
		const rows = await connectionDB.query("SELECT * from usuario where username='" + data.username + "' and password='" + data.password + "';");
		console.log(rows.length);
		if (rows.length > 0) {
			message = "OK";
		}
	} catch (err) {
		console.log('Error while performing Query');
		console.log(err);
		message = "BAD";
	} finally {
		res.send(message);
		await connectionDB.close();
	}
});


