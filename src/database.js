import mongoose from 'mongoose';
// import mongodb from 'mongodb';

const mongoURI = 'mongodb://localhost:27017/scheduleData';
const mongoDB = mongoose.connect(mongoURI).connection;

/**
 * Event listener for error when conneting to the database.
 * @ member {Function} scheduleCollection - links to mongoDB collection
 */
function databaseConnectionError() {
	mongoDB.on('error', function(error, db) {
		console.log('mongoDB connection error.', error);
	});
}

/**
 * Open connection to the database
 * @ member {Function} mongoDB - link to collection
 */
function databaseConnection() {
	mongoDB.once('open', function() {
		console.log('mongoDB connection established.');
	});
}

/**
 * Inssert a single object into the database
 * @ param {String} mongoDB - the connection to the database
 * @ param {Object} data - the object being inserted into the database
 * @ param (Function) callback - Do something with the results
 * @ member {Function} scheduleCollection - links to mongoDB collection
 */
function singleInsert(mongoDB, data, callback) {
	let scheduleCollection = mongoDB.collection('scheduleData');

	scheduleCollection.insertOne(data,
		function(error, result) {
			console.log('Inserted data.');
			callback(result);
	});
}

/**
 * Insert N number of objects into the database
 * @ param {String} mongoDB - the connection to the database
 * @ param {Object} data - the objects being inserted into the database
 * @ param (Function) callback - Do something with the results
 * @ member {Function} scheduleCollection - links to mongoDB collection
 */
function multipleInsert(mongoDB, data, callback) {
	let scheduleCollection = mongoDB.collection('scheduleData');

	scheduleCollection.insertMany(data,
		function(error, result) {
			console.log('Inserted all documents.');
			callback(result);
	});
}

/**
 * Remove all of the objects in the current collection before inserting more
 * @ param {String} mongoDB - the connection to the database
 * @ param {Object} data - the objects being inserted into the database
 * @ param (Function) callback - Do something with the results
 * @ member {Function} scheduleCollection - links to mongoDB collection
 */
function removeAllInsert(mongoDB, data, callback) {
	let scheduleCollection = mongoDB.collection('scheduleData');

	scheduleCollection.remove({}, function(){
		scheduleCollection.insertMany(data,
			function(error, result) {
				if(error) {
					console.log(error);
				}
				console.log('Inserted documents.');
				callback(result);
		});
	});
}

/**
 * Remove all of the objects in the current collection
 * @ param {String} mongoDB - the connection to the database
 * @ param {Object} data - the emplty object being inserted into the database
 * @ param (Function) callback - Do something with the results
 * @ member {Function} scheduleCollection - links to mongoDB collection
 */
function removeAll(mongoDB, data, callback) {
	let scheduleCollection = mongoDB.collection('scheudleData');

	scheduleCollection.remove({}, function(error) {
		if (error) {
			console.log(error);
		}
	});
}

/**
 * Find all of the objects in the current collection
 * @ param {String} mongoDB - the connection to the database
 * @ param {Object} data - the objects being inserted into the database
 * @ param (Function) callback - Do something with the results
 * @ member {Function} scheduleCollection - links to mongoDB collection
 */
function findAll(fn) {
	let scheduleCollection = mongoDB.collection('scheduleData');

	scheduleCollection.find({}).toArray(function(error, docs) {
		if (error) {
			console.log(error);
		}
		console.log('finding');
	})
}

export {
	mongoURI,
	mongoDB,
	databaseConnectionError,
	databaseConnection,
	singleInsert,
	multipleInsert,
	removeAllInsert,
	removeAll,
	findAll
};
