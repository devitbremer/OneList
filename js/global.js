$(document).ready(function (){
    initDatabase();
    init();

})
function initDatabase(){
    try{
        databaseSetup.createDatabase();
    }
    catch(e){
        console.error(e);
    }

    try {
        databaseSetup.createTables();
    }
    catch (e) {
        console.error(e);
    }
}

function init(){
    //ToDo: Set event handlers.


    //Lists Context
    $("#saveNewList").on("click", saveNewListClick);

    //User Registration
    $("#btnRegisterUser").on("click", btnRegisterUserClick)

    //User Login
    $("#btnLogin").on("click", btnLoginClick)

    //Add Item
    $("#itemSave").on("click", itemSaveClick)
}

//Lists Context
function saveNewListClick(){
    createNewListValidation();
}


//User Registration
function btnRegisterUserClick(){
    createNewUserValidation();
}


//User Login
function btnLoginClick(){
    loginValidation();
}

//Add Item
function itemSaveClick(){
    itemAddValidation();
}