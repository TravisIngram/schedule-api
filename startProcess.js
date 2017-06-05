
let env = require('dotenv');

env.config({path: '/Users/tingram/Dev_Workspace/Projects/JavaScript/scheduleAPIv2/.env'});

let spawn = require('child_process').spawn;

// Launch API, listen on StandardOut for messages.

const launchApi = spawn('node', ['build/index.js']);

launchApi.stdin.on('data', (data) => {
	console.log(`stdin of ${launchApi.pid}: ${data}`);
});

launchApi.stdout.on('data', (data) => {
	console.log(`stdout from process ${launchApi.pid}: ${data}`);
});

launchApi.stderr.on('data', (data) => {
	if (data !== null) {
		console.log(`spawn error from process ${launchApi.pid}: ${data.toString()}`);
	} else {
		console.log(`stderr: ${data}`);
	}
});

launchApi.on('close', (code) => {
	console.log(`child process exited with a code of ${code}`);
});

// Launch File import, listen on StandardOut for messages.

const fileImport = spawn('node', ['build/processScheduleData.js']);

fileImport.stdin.on('data', (data) => {
	console.log(`stdin of ${fileImport.pid}: ${data}`);
});

fileImport.stdout.on('data', (data) => {
	console.log(`stdout from process ${fileImport.pid}: ${data}`);
});

fileImport.stderr.on('data', (data) => {
	if (data !== null) {
		console.log(`spawn error from process ${fileImport.pid}: ${data.toString()}`);
	} else {
		console.log(`stderr: ${data}`);
	}
});

fileImport.on('close', (code) => {
	console.log(`child process exited with a code of ${code}`);
});
