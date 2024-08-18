const fs = require('fs');

/**
 * 
 * @param {*} type 
 * @returns returns data from the respective files
 */
function getData(type) {
	// we are using data.json as a datbase by default
	let dbFilePath = './src/data/data.json';

	if (type === 'user') {
		// select user specific data
		dbFilePath = './src/data/users.json';
	} else if (type === 'nav') {
		// select user specific data
		dbFilePath = './src/data/nav.json';
	} else {
		dbFilePath = './src/data/data.json';
	}
	// access file
	const objectData = fs.readFileSync(dbFilePath, 'utf8');

	// convert to the object
	return JSON.parse(objectData);
}

module.exports = {
	getData,
};
