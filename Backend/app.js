// AUTOR: Robin Trachsel

const express = require('express');
const database = require('./connect.js');

const app = express();

app.use(express.json());

app.post("/login", (req, res) => {
    console.log("POST: /login " + res.statusCode);

    let username = req.body.username;
    let password = req.body.password;

    console.log(`\tUsername: ${username}\n\tPassword: ${password}`)

    use("dbms_users");
    let result = query(`SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`);
    console.log(result);
});

app.get("/createDatabase", (req, res) => {
    console.log("GET: /createDatabase " + res.statusCode)

    let databaseName = "users";
    query(`CREATE DATABASE ${databaseName}`);

    use(databaseName);
});

app.get("/databases", (req, res) => {
    console.log("GET: /databases " + res.statusCode)

    let showQuery = "SHOW DATABASES";

    database.query(showQuery, (err, result) => {
        if (err) throw err;

        return res.send(result);
    });
})

app.get("/query", (req, res) => {
    // get query from body
    let query = req.body.query;

    database.query(query, (err, result) => {
        if (err) throw err;

        return res.send(result);
    });
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});

function use(database) {
    let useQuery = `USE ${database}`;

    database.query(useQuery, (error) => {
        if (error) throw error;

        console.log(`\tUsing ${database}`);
    })
}

function query(query) {
    database.query(query, (err, result) => {
        if (err) throw err;

        return result;
    });
}