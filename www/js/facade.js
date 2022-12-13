function loadAppBasicData() {


    /*userOperations.getById(1, getUserCallback)

    function getUserCallback(tx, results) {

        if (results.rows.length > 0){
            let row = results.rows[0]
            localStorage.setItem("currentUserId", row["userId"])
        }


    }*/
}
function isUserLoggedIn(){
    if (localStorage.getItem("userLoggedIn")){
        location.replace("#Home")
    }
    else {
        location.replace("#Login")
    }
}

//Calls validation for Add Review Page
function createNewListValidation(){
    if (doValidation_newListForm()){
        console.info("List is valid")

        //Creates list object
        let _list = new List(
            localStorage.getItem("currentUserId"),
            $("#txtNewList").val()
        )

        try{
            listOperations.create(_list);
            console.info("List added to the database")
            location.replace("#Home");
        }
        catch (error){
            console.error(error.message)
        }

    }
    else{
        console.info("List is invalid")
    }
}

function updateListValidation(){
    if (doValidation_updateListForm()){
        console.info("List is valid")

        let listId = localStorage.getItem("listId")
        let listName = $("#txtUpdateList").val()

        try{
            listOperations.rename(listId, listName);
            console.info("List updated on the database")
            location.replace("#Home");
        }
        catch (error){
            console.error(error.message)
        }

    }
    else{
        console.info("List is invalid")
    }
}

function deleteList(){
    let listId = localStorage.getItem("listId")

    try{
        listOperations.delete(listId)
        location.reload();
    }
    catch (error){
        console.error(error.message)
    }
}

function cleartxtNewListInput(){
    $("#txtNewList").val("");
}

function createNewUserValidation(){

    if(doValidation_registerForm()){

        let user = new User;
        user.fullName = $("#txtRegisterName").val();
        user.email = $("#txtRegisterEmail").val();
        user.password = $("#txtRegisterPassword").val();

        try{
            userOperations.register(user);
            console.log("User registered successfully.");
            location.replace("#Login");
        }
        catch (error){
            console.error(error.message)
        }

    }
}

function loginValidation(){

    if(doValidation_loginForm()){

        // Get credentials from form.
        var inputtedUser = new User;
        inputtedUser.email = $("#txtLoginEmail").val();
        inputtedUser.password = $("#txtLoginPassword").val();

        var databaseUser = new User;

        //Gets credentials from database.
        try{
            userOperations.getByEmail(inputtedUser.email, callback)

            function callback(transaction, results){
                if (results.rows.length == 0){
                    //document.getElementById("userError").innerHTML = "User doesn't exist";
                    location.reload();
                }
                else {
                    let row = results.rows[0];
                    databaseUser.userId = row["id"];
                    databaseUser.email = row["email"];
                    databaseUser.password = row["password"];

                    // Compares 2 sets os credential
                    if(inputtedUser.email == databaseUser.email && inputtedUser.password == databaseUser.password){
                        localStorage.setItem("userLoggedIn", "true");
                        localStorage.setItem("currentUserId", databaseUser.userId)
                        location.replace("#Home")
                    }
                    else {
                        location.reload();
                    }
                }
            }
        }
        catch (error){
            console.error(error.message)
        }
    }
}

function cleartxtNewItemInputs(){
    $("#txtItemAdd").val("");
    $("#txtItemDescription").val("");
}

function setAddItemPageTitle(){
    let addItemPageTitle = localStorage.getItem("listName");
    document.getElementById("addItemPageTitle").innerHTML = addItemPageTitle;
}

function itemAddValidation(){
    if (doValidate_frmItemAdd()){
        console.info("Item is valid")

        //Creates list object
        let _item = new Item(
            localStorage.getItem("listId"),
            $("#txtItemAdd").val(),
            $("#txtItemQty").val(),
            $("#txtItemDescription").val(),
            false
        )

        try{
            itemOperations.create(_item);
            console.info("Item added to the database")
            location.replace("#Details");
        }
        catch (error){
            console.error(error.message)
        }

    }
    else{
        console.info("Item is invalid")
    }
}

function updateItemValidation(){
    if (doValidate_frmItemUpdate()){
        console.info("Item is valid")

        let _item = new Item(
            listId = localStorage.getItem("listId"),
            itemName = $("#txtUpdateItem").val(),
            itemQuantity = $("#txtUpdateItemQuantity").val(),
            itemDescription = $("#txtUpdateItemDescription").val()
        )
        let itemId = localStorage.getItem("itemId")

            try{
            itemOperations.edit(_item, itemId);
            console.info("Item added to the database")
            location.replace("#Details");
            }
        catch (error){
            console.error(error.message)
        }

    }
    else{
        console.info("Item is invalid")
    }
}

function getLists(){
    var options = [localStorage.getItem("currentUserId")];

    try{
        listOperations.getAll(options,callback);

        function callback(tx,results){
            var htmlCode = "";

            if (results.rows.length == 0){
                htmlCode +=`
                <li>
                    <h2>Nothing to see here</h2>
                </li>
            `;
            }
            else {
                for (let i = 0; i < results.rows.length ; i++) {
                    var row = results.rows[i];
                    var description = row['description']
                    let countItems = row['itemCount'];

                    htmlCode += `
                    <li>
                        <a data-role="button" data-row-id="${row['id']}" data-row-description="${row['description']}" href="#">
                            <span class="ui-li-count">Items: ${countItems}</span>${description}
                            <a data-role="button" data-row-id="${row['id']}" data-row-description="${row['description']}" href="#" data-rel="popup" data-positon-to="window" data-transition="pop"></a>
                        </a>
                    </li>
                `;
                }
            }

            var lists = $("#mainList");
            lists = lists.html(htmlCode);
            lists.listview("refresh");

            function clickHandlerList() {
                localStorage.setItem("listId", $(this).attr("data-row-id") );
                localStorage.setItem("listName", $(this).attr("data-row-description") );
                $("#mainList a:first-child").prop('href', '#Details');
            }

            $("#mainList a:first-child").on("click", clickHandlerList);

            function clickHandlerEditList() {
                localStorage.setItem("listId", $(this).attr("data-row-id") );
                $("#mainList a + a").prop('href', '#updateList');
                $("#txtUpdateList").val($(this).attr("data-row-description"));
            }

            $("#mainList a + a").on("click", clickHandlerEditList);
        }
    }
    catch (error){
       console.error(error.message)
    }
}

function setDetailsPageTitle(){
    let detailsTitle = localStorage.getItem("listName");
    document.getElementById("detailsTitle").innerHTML = detailsTitle;
}

function getItems(){
    var options = [localStorage.getItem("listId")];

    try{
        itemOperations.getByList(options,callback);

        function callback(tx,results){
            var htmlCode = "";

            if (results.rows.length == 0){
                htmlCode +=`
                <li>
                    <h2>Nothing to see here</h2>
                </li>
            `;
            }
            else {
                for (let i = 0; i < results.rows.length ; i++) {
                    var row = results.rows[i];
                    var itemId = row['id']
                    var name = row['name']
                    var quantity = row['quantity']
                    var description = row['description']

                    htmlCode += `
                    <li>
                        <a data-role="button" data-row-id="${row['id']}" href="#" data-rel="popup" data-positon-to="window" data-transition="pop">${name}
                            <span class="ui-li-count">Qty: ${quantity}</span>
                            <p>${description}</p>
                            <a data-role="button" data-row-id="${row['id']}" href="#"></a>
                        </a>
                    </li>
                `;
                }
            }

            var items = $("#itemList");
            items = items.html(htmlCode);
            items.listview("refresh");

            function clickHandlerEditItem() {
                localStorage.setItem("itemId", $(this).attr("data-row-id") );
                $("#itemList a:first-child").prop('href', '#updateItem');

                let options = $(this).attr("data-row-id")
                itemOperations.getById(options, callbackItem)
                function callbackItem(tx,results){
                    let row = results.rows[0]
                    let itemName = row['name']
                    let itemQuantity = row['quantity']
                    let itemDescription = row['description']
                    $("#txtUpdateItem").val(itemName),
                    $("#txtUpdateItemQuantity").val(itemQuantity),
                    $("#txtUpdateItemDescription").val(itemDescription)
                }
            }

            $("#itemList a:first-child").on("click", clickHandlerEditItem);

            function clickHandlerCompleteItem() {
                let itemId = $(this).attr("data-row-id");
                itemOperations.delete(itemId);
                location.reload();
            }

            $("#itemList a + a").on("click", clickHandlerCompleteItem);
        }
    }
    catch (error){
        console.error(error.message)
    }
}

//Camera handler
function takePicture(){
    navigator.camera.getPicture(onSuccess, onFail, {  
        quality: 80, 
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        encodingType: Camera.EncodingType.JPEG, 
        mediaType: Camera.MediaType.PICTURE,
        correctOrientation: true,
        cameraDirection: Camera.Direction.FRONT,
        targetWidth: 400

     });  
     
     function onSuccess(imageData) {

        //Get elements
        var profilePagePic = $("#profilePagePic");
        var homePanelPic = $("#homePanelPic");
        var detailsPanelPic = $("#detailsPanelPic");
        var addItemPanelPic = $("#addItemPanelPic");
        var addListPanelPic = $("#addListPanelPic");
        var profilePanelPic = $("#profilePanelPic");

        //Update elements
        profilePagePic.prop("src", "data:image/jpeg;base64," + imageData);
        homePanelPic.prop("src", "data:image/jpeg;base64," + imageData);
        detailsPanelPic.prop("src", "data:image/jpeg;base64," + imageData);
        addItemPanelPic.prop("src", "data:image/jpeg;base64," + imageData);
        addListPanelPic.prop("src", "data:image/jpeg;base64," + imageData);
        profilePanelPic.prop("src", "data:image/jpeg;base64," + imageData);

        
        //Save on local storage??
        localStorage.setItem("userProfilePic", imageData);
    }

    function onFail(message) { 
        alert('Failed because: ' + message); 
    } 
}


//Image galerry handler
function selectPicture(){
    
    navigator.camera.getPicture(onSuccess, onFail, {  
        quality: 80, 
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        encodingType: Camera.EncodingType.JPEG, 
        mediaType: Camera.MediaType.PICTURE,
        correctOrientation: true,
        cameraDirection: Camera.Direction.FRONT,
        targetWidth: 400

     });  
     
     function onSuccess(imageData) {

        //Get elements
        var profilePagePic = $("#profilePagePic");
        var homePanelPic = $("#homePanelPic");
        var detailsPanelPic = $("#detailsPanelPic");
        var addItemPanelPic = $("#addItemPanelPic");
        var addListPanelPic = $("#addListPanelPic");
        var profilePanelPic = $("#profilePanelPic");

        //Update elements
        profilePagePic.prop("src", "data:image/jpeg;base64," + imageData);
        homePanelPic.prop("src", "data:image/jpeg;base64," + imageData);
        detailsPanelPic.prop("src", "data:image/jpeg;base64," + imageData);
        addItemPanelPic.prop("src", "data:image/jpeg;base64," + imageData);
        addListPanelPic.prop("src", "data:image/jpeg;base64," + imageData);
        profilePanelPic.prop("src", "data:image/jpeg;base64," + imageData);

        
        //Save on local storage??
        localStorage.setItem("userProfilePic", imageData);
    }

    function onFail(message) { 
        alert('Failed because: ' + message); 
    } 
}

function saveUserProfile(){

    if(doValidation_userProfileForm()){
        let user = new User();
        user.userId = localStorage.getItem("currentUserId")
        user.email = $("#email").val();
        user.fullName = $("#fullName").val();
        user.password = $("#confirmPassword").val();

        try{
            userOperations.update(user);
            location.replace("#Profile");
        }
        catch (error){
            console.error(error.message)
        }
    }
    else{
        console.error("Update user profile form is invalid.")
    }
}

function loadUserProfile(){

    userOperations.getById(localStorage.getItem("currentUserId"), callback)

    function callback(transaction, results){

        let row = results.rows[0];
        $("#fullName").val(row["fullName"]);
        $("#email").val(row["email"]);
        $("#password").val(row["password"]);
        $("#confirmPassword").val(row["password"]);
    }
}

//Load welcome message on menu panel
function loadWelcome(){

    userOperations.getById(localStorage.getItem("currentUserId"), callback)
    function callback(transaction, results){

        let row = results.rows[0];
        let fullName = row["fullName"];

        $(".welcomeDiv").append("<h3>Hello "+fullName+".</h3>")
    }

    
}

//Settings Page - Change Theme

function changeGlobalTheme(theme)
{
    //Saves current theme on localStorage
    localStorage.setItem("currentTheme",theme);

    // These themes will be cleared, add more
    // swatch letters as needed.
    var themes = " a b c d e f";

    // Updates the theme for all elements that match the
    // CSS selector with the specified theme class.
    function setTheme(cssSelector, themeClass, theme)
    {
        $(cssSelector)
            .removeClass(themes.split(" ").join(" " + themeClass + "-"))
            .addClass(themeClass + "-" + theme)
            .attr("data-theme", theme);
    }

    // Add more selectors/theme classes as needed.
    setTheme(".ui-mobile-viewport", "ui-overlay", theme);
    setTheme("[data-role='page']", "ui-body", theme);
    setTheme("[data-role='header']", "ui-bar", theme);
    setTheme("[data-role='listview'] > li", "ui-bar", theme);
    setTheme(".ui-btn", "ui-btn-up", theme);
    setTheme(".ui-btn", "ui-btn-hover", theme);
};