//Callback functions

function errorCallback(transaction,error){
    console.error(error)
}

function successCallback(transaction,operation){
    return console.info("Database operation: "+ operation +" completed successfully.")
}


// Database Setup
let database;

let databaseSetup = {

    createDatabase: function(){
        let name = "OneList";
        let version = "1.0";
        let description = "OneList App Database";
        let size = 3 * 1024 * 1024;

        database = openDatabase(name, version, description, size, successCallback(null,"CREATE DATABASE"));
    },

    createTables: function (){
        database.transaction(function(transaction){

            let user = "CREATE TABLE IF NOT EXISTS user(" +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "name VARCHAR (30) NOT NULL," +
                "email VARCHAR (50) NOT NULL," +
                "password VARCHAR (15) NOT NULL);"

            let list = "CREATE TABLE IF NOT EXISTS list(" +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "userId INTEGER NOT NULL," +
                "description VARCHAR (15) NOT NULL," +
                "FOREIGN KEY(userId) REFERENCES user(id));"

            let item = "CREATE TABLE IF NOT EXISTS item(" +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "listId INTEGER NOT NULL," +
                "description VARCHAR (15) NOT NULL," +
                "completed VARCHAR (1)," +
                "FOREIGN KEY(listId) REFERENCES list(id));"

            let options = [];

            transaction.executeSql(user, options, successCallback(transaction,"CREATE USER TABLE"), errorCallback);
            transaction.executeSql(list, options, successCallback(transaction,"CREATE LIST TABLE"), errorCallback);
            transaction.executeSql(item, options, successCallback(transaction,"CREATE ITEM TABLE"), errorCallback);
        })
    },

    dropTables: function(){
        database.transaction(function (transaction) {
            let user = "DROP TABLE IF EXISTS user;";
            let list = "DROP TABLE IF EXISTS list; ";
            let item = "DROP TABLE IF EXISTS item; ";
            let options = [];

            transaction.executeSql(user, options, successCallback(transaction,"DROP USER TABLE"), errorCallback);
            transaction.executeSql(list, options, successCallback(transaction,"DROP LIST TABLE"), errorCallback);
            transaction.executeSql(item, options, successCallback(transaction,"DROP ITEM TABLE"), errorCallback);
        })
    }
}