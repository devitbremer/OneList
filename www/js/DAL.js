 //ToDo: Where store user profile pic
 let userOperations = {

     register: function(_user){
         database.transaction(function(transaction){
             let sql  = "INSERT INTO user(fullName, email, password) VALUES(?,?,?);"
             let options = [_user.fullName, _user.email, _user.password]

             transaction.executeSql(sql, options, successCallback(transaction,"CREATE LIST"), errorCallback);
         })
     },

     update: function(_user){
         database.transaction(function (tx){

             let sql = "UPDATE user SET fullName=?, email=?, password=? WHERE id=?;"
             let options = [_user.fullName, _user.email, _user.password, _user.userId]

             tx.executeSql(sql, options, successCallback(tx,"UPDATE USER"), errorCallback);
         })
     },

     saveProfilePic: function(imageId, userId){
        database.transaction(function (tx){

            let sql = "UPDATE user SET profilePic=? WHERE id=?";

            tx.executeSql(sql, [imageId, userId], successCallback(tx, "SAVE PROFILE PICTURE", errorCallback))

        })

     },

     getById: function(_userID, getUserCallback){
         database.transaction(function (tx){

             let sql = "SELECT * FROM user WHERE id=?;"
             tx.executeSql(sql, [_userID], getUserCallback, errorCallback);
         })
     },

     getByEmail: function(_userEmail, getUserCallback){
         database.transaction(function (tx){

             let sql = "SELECT * FROM user WHERE email=?;"
             tx.executeSql(sql, [_userEmail], getUserCallback, errorCallback);
         })
     }
 }

 let listOperations = {

     create: function(_list){
         database.transaction(function(transaction){
             let sql  = "INSERT INTO list(userId, description) VALUES(?,?);"
             let options = [_list.userId, _list.description]

             transaction.executeSql(sql, options, successCallback(transaction,"CREATE LIST"), errorCallback);
         })
     },

     rename: function(_listId, _newName){
         database.transaction(function(transaction){

             let sql = "UPDATE list SET description=? WHERE id=?;"
             let options = [_newName, _listId]

             transaction.executeSql(sql, options, successCallback(transaction,"RENAME LIST"), errorCallback);
         })
     },

     getAll: function(_userID, getAllListCallback){
         database.transaction(function(transaction){

             let sql = "SELECT l.id, l.description, COUNT(i.id) AS itemCount FROM list l LEFT JOIN item i on i.listId = l.id WHERE userId=? GROUP BY l.description ORDER BY l.description;"
             transaction.executeSql(sql, [_userID], getAllListCallback, errorCallback);
         })
     },

     //Cascade delete items
     delete: function(_listId, deleteListCallback){
         database.transaction(function(transaction){

             let sqlList = "DELETE FROM list WHERE id=?;"
             let sqlItem = "DELETE FROM item WHERE listId=?;"
             transaction.executeSql(sqlItem, [_listId], deleteListCallback, errorCallback);
             transaction.executeSql(sqlList, [_listId], deleteListCallback, errorCallback);
         })
     }
 }


 let itemOperations = {

     create: function(_item){
         database.transaction(function(transaction){
             let sql  = "INSERT INTO item(listId, name, quantity, description, completed) VALUES(?,?,?,?,?);"
             let options = [_item.listId, _item.name, _item.quantity, _item.description, _item.completed]

             transaction.executeSql(sql, options, successCallback(transaction,"CREATE ITEM"), errorCallback);
         })
     },

     edit: function(_item, _itemId){
         database.transaction(function(transaction){

             let sql = "UPDATE item SET name=?, quantity=?, description=? WHERE id=?;"
             let options = [_item.name, _item.quantity, _item.description, _itemId]

             transaction.executeSql(sql, options, successCallback(transaction,"UPDATE ITEM"), errorCallback);
         })
     },

     complete: function(_itemId){
         database.transaction(function(transaction){

             let sql = "UPDATE item SET completed='true' WHERE id=?;"
             let options = [_itemId]

             transaction.executeSql(sql, options, successCallback(transaction,"COMPLETE ITEM"), errorCallback);
         })
     },

     uncomplete: function(_itemId){
         database.transaction(function(transaction){

             let sql = "UPDATE item SET completed='false' WHERE id=?;"
             let options = [_itemId]

             transaction.executeSql(sql, options, successCallback(transaction,"UNCOMPLETE ITEM"), errorCallback);
         })
     },

     //ToDo: Ter duas listas de items completos e iincompletos ou apenas uma lista?
     getByList: function(_listId, listItemCallback){
         database.transaction(function(transaction){

             let sql = "SELECT * FROM item WHERE listId=? ORDER BY name;"
             transaction.executeSql(sql, [_listId], listItemCallback, errorCallback);
         })
     },

     getById: function(_itemId, listItemCallback){
         database.transaction(function(transaction){

             let sql = "SELECT * FROM item WHERE id=?;"
             transaction.executeSql(sql, [_itemId], listItemCallback, errorCallback);
         })
     },

     delete: function(_itemId, deleteItemCallback){
         database.transaction(function(transaction){

             let sql = "DELETE FROM item WHERE id=?;"
             transaction.executeSql(sql, [_itemId], deleteItemCallback, errorCallback);
         })
     }
  }
