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
function themeSetup(){
    if(localStorage.getItem("currentTheme") === null){
        changeGlobalTheme('f')
    }
    else{
        changeGlobalTheme(localStorage.getItem("currentTheme"))
    }

}

function init(){

    //ToDo: Set event handlers.
    isUserLoggedIn();
    getLists();
    themeSetup();

    //Load Welcome Message on menu panel
    loadWelcome();

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

    //User Porfile
    $("#cameraTakePicture").on("click", takePictureClick)
    $("#fileSelectPicture").on("click", selectPictureClick)
    $("#profileSave").on("click", profileSaveClick)
    $("#Profile").on("pageshow", profileShow)

    //Settings
    $("#changeThemeB").on("click", changeThemeBClick)
    $("#changeThemeA").on("click", changeThemeAClick)
    $("#changeThemeF").on("click", changeThemeFClick)

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

// User Profile
function selectPictureClick(){
    selectPicture()
}

function takePictureClick(){
    takePicture()
}

function profileSaveClick(){
    saveUserProfile()
}

function profileShow(){
    loadUserProfile()
}

//Settings
function changeThemeFClick(){
    changeGlobalTheme('f');
}

function changeThemeBClick(){
    //changeThemeB()
    changeGlobalTheme('b');
}

function changeThemeAClick(){
    changeGlobalTheme('a');
}
