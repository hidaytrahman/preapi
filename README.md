# Pre API

## File Based Databse REST API

A very simple prototype file based database REST API developed using <code>Nodejs</code>, `ExpressJS`, its easy to use to any type of project

### Usecases

- Dont wait for BE you can use till BE is ready
- Learn CRUD operations without having API dependencies
- No real database required
- Build Prototype based apps and more

## Docs

### How to use?

1. [Download](https://github.com/hidaytrahman/preapi/archive/refs/heads/main.zip) or [fork it](https://github.com/hidaytrahman/preapi/fork)
2. run `npm install`
3. `npm start`

Thats it.

It can be accessible here : `http://localhost:3030/todos`

_\* Feel free to change port_

Feel free to use `VSCode REST Client` extension docs are already available in `docs/API.rest` file

---

### Get Todos (anything)

```
GET: http://localhost:3030/todos
```

```json
{
  "todos": [
    {
      "id": "eBPNbH6TOc40qu6DWcRv",
      "todo": "Visit office space",
      "isCompleted": true,
      "created_at": "2022-12-07T19:10:39.106Z"
    }
  ],
  "message": "Todo fetched successfully!"
}
```

### Create

```javascript
POST http://localhost:3030/todo
Content-Type: {{contentType}}

{
    "todo": "New todo item",
    "isCompleted": true
}
```

Response

```json
{
  "todos": [
    {
      "id": "eBPNbH6TOc40qu6DWcRv",
      "todo": "New todo item",
      "isCompleted": true,
      "created_at": "2022-12-07T19:10:39.106Z"
    }
  ],
  "message": "Todo fetched successfully!"
}
```

### Delete

```javascript
DELETE http://localhost:3030/todo/{id}
Content-Type: {{contentType}}
```

Response (OK)

```json
{
  "message": "Deleted Successfully!"
}
```

Response (Not exist)

```json
{
  "message": "Data doesn't exist or please check the id"
}
```

## File Database

All database files should be under `src/data/` folder

Example database for Todo
`src/data/data.json`
