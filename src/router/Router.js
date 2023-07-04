const fs = require('fs');
const { nanoid } = require('nanoid');

module.exports = (app) => {
	// we are using data.json as a datbase
	const dbFilePath = './src/data/data.json';
	// using nanoid for the random id generation because we dont have the database
	const _randomId = nanoid(20);

	// get todos or your own api endpoint
	app.get('/todos', (req, res) => {
		try {
			const todoObj = fs.readFileSync(dbFilePath, 'utf-8');
			const data = JSON.parse(todoObj);
			data.message = 'Todo fetched successfully!';

			res.json(data);
		} catch (e) {
			res.json({
				message: 'There are no data to fetch',
			});
		}
	});

	// delete a todo
	app.delete('/todo/:id', (req, res) => {
		try {
			const _id = req.params.id; // get id from parameters

			// access file
			const objectData = fs.readFileSync(dbFilePath, 'utf8');

			// convert to the object
			const myObj = JSON.parse(objectData);

			// check if the item exists in the array by id
			const selectedData = myObj.todos.find((item) => item.id === _id);

			// if exists delete
			if (selectedData) {
				// exclude the selected item
				const afterRemovedTodos = myObj.todos.filter((item, index) => item.id !== _id);
				// set to the todos array with deleted item
				myObj.todos = afterRemovedTodos;

				// and update the file again
				fs.writeFile(dbFilePath, JSON.stringify(myObj, null, 4), (err, data) => {
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
			});
		}
	});

	// create a todo
	app.post('/todo', (req, res) => {
		try {
			if (!req.body.todo) {
				return res.json({
					message: 'Todo is required',
				});
			}
			// prepare data based on the requriments
			const _newDoc = {
				id: _randomId,
				todo: req.body.todo,
				isCompleted: req.body.isCompleted || false,
				created_at: new Date(),
			};

			let objectData = { todos: _newDoc };

			fs.readFile(dbFilePath, 'utf8', function readFileCallback(err, data) {
				if (err) {
					console.log(err);
				} else {
					// if file has data
					if (data) {
						objectData = JSON.parse(data); //now it an object

						objectData.todos.push(_newDoc); // add some data

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
		} catch (e) {
			res.json({
				message: 'Something went wrong',
				info: e.message,
			});
		}
	});
};
