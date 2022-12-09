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
    $("#Home").on("pageshow", Home_Show);

    //User Registration
    $("#btnRegisterUser").on("click", btnRegisterUserClick)

    //User Login
    $("#btnLogin").on("click", btnLoginClick)

    //Item
    $("#itemSave").on("click", itemSaveClick)
}

//Lists Context
function saveNewListClick(){
    createNewListValidation();
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

//Add Item
function itemSaveClick(){
    itemAddValidation();
}