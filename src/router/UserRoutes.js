const fs = require('fs');
const { nanoid } = require('nanoid');
const { getData } = require('../utils');

const entity = 'User';

module.exports = (app) => {
	// we are using data.json as a datbase
	const dbFilePath = './src/data/users.json';
	// using nanoid for the random id generation because we dont have the database
	const _randomId = nanoid(20);

	// get users or your own api endpoint
	app.get('/users', (req, res) => {
		try {
			const data = getData('user');
			data.message = `${entity} fetched successfully!`;

			res.json(data);
		} catch (e) {
			res.json({
				message: 'There are no data to fetch',
				info: e.message,
			});
		}
	});

	// delete a user
	app.delete('/user/:id', (req, res) => {
		try {
			const _id = req.params.id; // get id from parameters

			// get data from file
			const _fileData = getData('user');

			// check if the item exists in the array by id
			const selectedData = _fileData.users.find((item) => item.id === _id);

			// if exists delete
			if (selectedData) {
				// exclude the selected item
				const filteredData = _fileData.users.filter((item, index) => item.id !== _id);
				// set to the users array with deleted item
				_fileData.users = filteredData;

				// and update the file again
				fs.writeFile(dbFilePath, JSON.stringify(_fileData, null, 4), (err, data) => {
					if (err) throw err;

					res.json({
						message: 'Deleted Successfully!',
					});
				});
			} else {
				res.json({
					message: "Data doesn't exist or please check the id",
				});
			}
		} catch (e) {
			res.json({
				message: 'Something went wrong',
				info: e.message,
			});
		}
	});

	// create a user
	app.post('/user', (req, res) => {
		try {
			if (!req.body.username) {
				return res.json({
					message: 'username is required',
				});
			}

			// prepare data based on the requriments
			const _newDoc = {
				id: _randomId,
				name: req.body.name,
				username: req.body.username,
				gender: req.body.gender,
				role: req.body.role,
				isActive: false,
				created_at: new Date(),
			};

			let objectData = { users: _newDoc };

			// get data from file
			const _fileData = getData('user');

			// check if the item exists in the array by id
			const selectedData = _fileData.users.find((item) => item.username === req.body.username);

			if (selectedData) {
				res.json({
					message: `${req.body.username} is already exists`,
				});
			} else {
				fs.readFile(dbFilePath, 'utf8', function readFileCallback(err, data) {
					if (err) {
						console.log(err);
					} else {
						// if file has data
						if (data) {
							objectData = JSON.parse(data); //now it an object

							objectData.users.push(_newDoc); // add some data

							const json = JSON.stringify(objectData, null, 4); // convert it back to json

							fs.writeFile(dbFilePath, json, 'utf8', (err, data) => {
								if (err) {
									console.log(err);
									return;
								} else {
									console.log('data added');
									res.json({
										data: _newDoc,
										message: 'Data has been added successfully!!!',
									});
								}
							});
						} else {
							const json = JSON.stringify(objectData, null, 4);

							fs.writeFile(dbFilePath, json, 'utf8', (err, data) => {
								if (err) {
									console.log(err);
									return;
								} else {
									console.log('data added');
									return res.json({
										data: _newDoc,
										message: 'Data has been added successfully!!!',
									});
								}
							});

							res.json({
								message: 'No data',
							});
						}
					}
				});
			}
		} catch (e) {
			res.json({
				message: 'Something went wrong',
				info: e.message,
			});
		}
	});
};
