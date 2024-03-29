const database = require('../db/database.js');
const fs = require("fs");
const path = require("path");
const initDocs = JSON.parse(fs.readFileSync(
    path.resolve(__dirname, "docs.json"),
    "utf8"
));

const texteditor = {
    getAllDocs: async function getAllDocs() {
        let db = await database.getDb();

        try {
            const allDocs = await db.collection.find({}).toArray();

            console.log(allDocs);

            return allDocs;
        } catch (error) {
            return {
                errors: {
                    message: error.message,
                }
            };
        } finally {
            await db.client.close();
        }
    },

    init: async function init() {
        let db;

        try {
            db = await database.getDb();

            await db.collection.deleteMany();
            await db.collection.insertMany(initDocs);
        } catch (error) {
            console.error(error.message);
        } finally {
            await db.client.close();
        }
    },

    updateDoc: async function updateDoc(filter, text) {
        console.log("update id & text", filter, text);
        let db = await database.getDb();

        try {
            await db.collection.updateOne(filter, {$set: text});
        } catch (error) {
            return {
                errors: {
                    message: error.message,
                }
            };
        } finally {
            await db.client.close();
        }
    },

    insertDoc: async function insertDoc(newDoc) {
        console.log("insertDoc", newDoc);
        let db;

        try {
            db = await database.getDb();

            const result = await db.collection.insertOne(newDoc);

            return {
                ...newDoc,
                _id: result.insertedId,
            };
        } catch (error) {
            console.log(error.message);
        } finally {
            await db.client.close();
        }
    },

    addEditor: async function addEditor(filter, editor) {
        console.log("addEditor", filter, editor);

        let db = await database.getDb();

        try {
            await db.collection.updateOne(filter, {$push: editor });

            const result = await db.collection.findOne({ _id: filter });

            return {
                result
            };
        } catch (error) {
            return {
                error: {
                    message: error.message,
                }
            };
        } finally {
            await db.client.close();
        }
    }
};

module.exports = texteditor;
