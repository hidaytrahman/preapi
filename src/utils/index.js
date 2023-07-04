const fs = require('fs');
// we are using data.json as a datbase
const dbFilePath = './src/data/data.json';

function getData() {
	// access file
	const objectData = fs.readFileSync(dbFilePath, 'utf8');

	// convert to the object
	return JSON.parse(objectData);
}

module.exports = {
	getData,
};
