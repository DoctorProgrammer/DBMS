const express = require('express');
const database = require('./connect.js');

const app = express();

app.get("/createDatabase", (req, res) => {
    console.log("GET: /createDatabase " + res.statusCode)

    let databaseName = "users";
    let createQuery = `CREATE DATABASE ${databaseName}`;

    // use the query to create a Database.
    database.query(createQuery, (err) => {
        if (err) throw err;

        console.log("\tDatabase Created Successfully !");

        let useQuery = `USE ${databaseName}`;

        database.query(useQuery, (error) => {
            if (error) throw error;

            console.log("\tUsing Database");

            return res.send(`Created and Using "${databaseName}" Database`);
        })
    });
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

    database.query(createQuery, (err) => {
        if (err) throw err;

        console.log("Query finished Successfully !");

        return res.send("Query finished Successfully !");
    });
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});