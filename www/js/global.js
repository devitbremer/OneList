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
    isUserLoggedIn();
    getLists();

    //Lists Context
    $("#Home").on("pageshow", Home_Show);
    $("#AddList").on("pageshow", AddList_Show);
    $("#saveNewList").on("click", saveNewListClick);
    $("#btnUpdateList").on("click", btnUpdateListClick);
    $("#btnDeleteList").on("click", btnDeleteListClick);

    //User Registration
    $("#btnRegisterUser").on("click", btnRegisterUserClick)

    //User Login
    $("#btnLogin").on("click", btnLoginClick)

    //Items
    $("#Details").on("pageshow", Details_Show);
    $("#AddItem").on("pageshow", AddItem_Show);
    $("#itemSave").on("click", itemSaveClick);
    $("#btnUpdateItem").on("click", btnUpdateItemClick);
}

//Lists Context
function Home_Show() {
    getLists()
}

function AddList_Show(){
    cleartxtNewListInput()
}

function saveNewListClick(){
    createNewListValidation();
}

function btnUpdateListClick(){
    updateListValidation();
}

function btnDeleteListClick(){
    deleteList();
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
function Details_Show() {
    setDetailsPageTitle();
    getItems();
}

function AddItem_Show(){
    setAddItemPageTitle();
    cleartxtNewItemInputs();
}

function itemSaveClick(){
    itemAddValidation();
}

function btnUpdateItemClick(){
    updateItemValidation();
}