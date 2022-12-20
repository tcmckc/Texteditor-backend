/**
 * Connect to the database and search using a criteria.
 */
"use strict";

const database = require('../db/database.js');
const port = process.env.DBWEBB_PORT || 1337;


const express = require("express");
const app = express();

// Just for testing the sever
app.get("/", (req, res) => {
    res.send("Hello World");
});

// Return a JSON object with list of all documents within the collection.
app.get("/list", async (request, response) => {
    try {
        let res = await findInCollection();

        console.log(res);
        response.json(res);
    } catch (err) {
        console.log(err);
        response.json(err);
    }
});

// Startup server and liten on port
app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});


/**
 * Find documents in an collection by matching search criteria.
 *
 * @async
 *
 * @param {string} dsn        DSN to connect to database.
 * @param {string} colName    Name of collection.
 * @param {object} criteria   Search criteria.
 * @param {object} projection What to project in results.
 * @param {number} limit      Limit the number of documents to retrieve.
 *
 * @throws Error when database operation fails.
 *
 * @return {Promise<array>} The resultset as an array.
 */
async function findInCollection(criteria) {
    const db = await database.getDb();
    const res = await db.collection.find(criteria).toArray();

    await db.client.close();

    return res;
}
