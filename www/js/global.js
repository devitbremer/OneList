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
        //databaseSetup.dropTables();
        databaseSetup.createTables();
    }
    catch (e) {
        console.error(e);
    }
}

function init(){
    //ToDo: Set event handlers.
    getLists();

    //Lists Context
    $("#saveNewList").on("click", saveNewListClick);
    $("#Home").on("pageshow", Home_Show);

    //User Registration
    $("#btnRegisterUser").on("click", btnRegisterUserClick)

    //User Login
    $("#btnLogin").on("click", btnLoginClick)

    //Items
    $("#itemSave").on("click", itemSaveClick)
    $("#Details").on("pageshow", Details_Show);
}

//Lists Context
function saveNewListClick(){
    createNewListValidation();
    location.replace("#Home");
}

function Home_Show() {
    getLists()
}


//User Registration
function btnRegisterUserClick(){
    createNewUserValidation();
}


//User Login
function btnLoginClick(){
    loginValidation();
}

//Items
function itemSaveClick(){
    itemAddValidation();
    location.replace("#Details");

}

function Details_Show() {
    getItems()
}