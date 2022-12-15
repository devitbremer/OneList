$(document).ready(function (){
    initDatabase();
    init();
})

//Set Database
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

//Initial theme setup
function themeSetup(){
    if(localStorage.getItem("currentTheme") === null){
        changeGlobalTheme('f')
    }
    else{
        changeGlobalTheme(localStorage.getItem("currentTheme"))
    }
}

function init(){

    //initial setup
    isUserLoggedIn();
    getLists();
    themeSetup();
    //Load Welcome Message on menu panel
    loadWelcome();

    //User Registration
    $("#btnRegisterUser").on("click", btnRegisterUserClick)

    //User Login
    $("#btnLogin").on("click", btnLoginClick)

    //Lists Context
    $("#Home").on("pageshow", Home_Show);
    $("#saveNewList").on("click", saveNewListClick);
    $("#btnUpdateList").on("click", btnUpdateListClick);
    $("#btnDeleteList").on("click", btnDeleteListClick);
    $("#btnAddList").on("click", btnAddListClick);

    //Items
    $("#Details").on("pageshow", Details_Show);
    $("#itemSave").on("click", itemSaveClick);
    $("#btnUpdateItem").on("click", btnUpdateItemClick);
    $("#btnAddItem").on("click", btnAddItemClick);
    $("#btnDeleteItem").on("click", btnDeleteItemClick);

    //User Porfile
    $("#cameraTakePicture").on("click", takePictureClick)
    $("#fileSelectPicture").on("click", selectPictureClick)
    $("#profileSave").on("click", profileSaveClick)
    $("#Profile").on("pageshow", profileShow)
    $("#btnLogout").on("click", btnLogoutClick)

    //Settings
    $("#changeThemeB").on("click", changeThemeBClick)
    $("#changeThemeA").on("click", changeThemeAClick)
    $("#changeThemeF").on("click", changeThemeFClick)

}

//User Registration
function btnRegisterUserClick(){
    createNewUserValidation();
}

//User Login
function btnLoginClick(){
    loginValidation();
}

//Lists Context
function Home_Show() {
    getLists()
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

function btnAddListClick(){
    cleartxtNewListInput()
    loadPopupListForm();
}

//Items
function Details_Show() {
    setDetailsPageTitle();
    getItems();
}

function btnAddItemClick(){
    cleartxtNewItemInputs();
    loadPopupItemForm();
}

function itemSaveClick(){
    itemAddValidation();
}


function btnUpdateItemClick(){
    updateItemValidation();
}

function btnDeleteItemClick(){
    deleteItem();
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

function btnLogoutClick(){
    logoutUser();
}

//Settings
function changeThemeFClick(){
    changeGlobalTheme('f');
}

function changeThemeBClick(){
    changeGlobalTheme('b');
}

function changeThemeAClick(){
    changeGlobalTheme('a');
}