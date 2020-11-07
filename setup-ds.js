'use strict';
console.log('hola');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const fs = require('fs');

require('dotenv').config();

const params = {
	protocol: process.env.DATABASE_PROTOCOL,
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	cluster: process.env.DATABASE_CLUSTER,
	db: process.env.CORE_DATABASE
};

console.log(params);

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true
};

const DataSourceSchema = new Schema({
	name: String,
	user: String,
	password: String,
	protocol: String,
	cluster: String,
	isAtlas: Boolean
});

function start () {
	return new Promise(async resolve => {
		console.log(`${params.protocol}://${params.user}:${params.password}@${params.cluster}/${params.db}`);
		mongoose.connect(`${params.protocol}://${params.user}:${params.password}@${params.cluster}/${params.db}`, options);

		const DataSource = mongoose.model('datasource', DataSourceSchema);

		const ds = await DataSource.find();
		resolve(ds);
	});
}

start().then(json => {
	const jsonContent = JSON.stringify(json, null, 4);
	 
	fs.writeFile('datasources.json', jsonContent, 'utf8', function (err) {
	    if (err) {
	        console.log("An error occured while writing JSON Object to File.");
	        return console.log(err);
	    }
	 
	    mongoose.connection.close();
	});
});