//initial setup
function isUserLoggedIn(){
    if (localStorage.getItem("userLoggedIn") == "true"){
        location.replace("#Home")
    }
    else {
        location.replace("#Login")
    }
}

//Load welcome message on menu panel
function loadWelcome(){

    userOperations.getById(localStorage.getItem("currentUserId"), callback)
    function callback(transaction, results){

        let row = results.rows[0];
        let fullName = row["fullName"];

        $("[custom-welcome='welcomeH3']").text("Hello "+fullName+".")
    }
}

//user registration
function createNewUserValidation(){

    if(doValidation_registerForm()){

        let user = new User;
        user.fullName = $("#txtRegisterName").val();
        user.email = $("#txtRegisterEmail").val();
        user.password = $("#txtRegisterPassword").val();

        try{
            userOperations.register(user);
            console.log("User registered successfully.");
            clearLoginError()
            location.replace("#Login");
        }
        catch (error){
            console.error(error.message)
        }
    }
}

//user login
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
                    $("#loginError").text("Invalid Credentials")
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
                        $("#loginError").text("Invalid Credentials")
                    }
                }
            }
        }
        catch (error){
            console.error(error.message)
        }
    }
}

//clear error message on login page
function clearLoginError(){
    $("#loginError").text("")
}

//lists context
//get lists on the database and display on Home page
function getLists(){
    var options = [localStorage.getItem("currentUserId")];

    try{
        listOperations.getAll(options,callback);

        function callback(tx,results){
            var htmlCode = "";

            if (results.rows.length == 0){
                htmlCode +=`
                <li>
                    <h2>Add your first list</h2>
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

//create new list
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
            $("#addList").popup("close");
            $("#Home [data-type='search']").val("")
            getLists();
        }
        catch (error){
            console.error(error.message)
        }

    }
    else{
        console.info("List is invalid")
    }
}

//update list
function updateListValidation(){
    if (doValidation_updateListForm()){
        console.info("List is valid")

        let listId = localStorage.getItem("listId")
        let listName = $("#txtUpdateList").val()

        try{
            listOperations.rename(listId, listName);
            console.info("List updated on the database");
            $("#updateList").popup("close");
            getLists();
        }
        catch (error){
            console.error(error.message)
        }

    }
    else{
        console.info("List is invalid")
    }
}

//delete list
function deleteList(){
    let listId = localStorage.getItem("listId")

    try{
        listOperations.delete(listId)
        $("#updateList").popup("close");
        getLists();
    }
    catch (error){
        console.error(error.message)
    }
}

// clear text input for new list
function cleartxtNewListInput(){
    $("#txtNewList").val("");
}

//get data from search bar and send to input text for new list
function loadPopupListForm(){
    let search = $("#Home [data-type='search']").val()
    $("#txtNewList").val(search)
}

//Items
//set details page title
function setDetailsPageTitle(){
    let detailsTitle = localStorage.getItem("listName");
    $("#detailsTitle").text(detailsTitle);
}

//get data from database and show on Details page
function getItems(){
    var options = [localStorage.getItem("listId")];

    try{
        itemOperations.getByList(options,callback);

        function callback(tx,results){
            var htmlCode = "";

            if (results.rows.length == 0){
                htmlCode +=`
                <li>
                    <h2>Add your first item</h2>
                </li>
            `;
            }
            else {
                var htmlCompletedFalse = "";
                var htmlCompletedTrue = "";
                for (let i = 0; i < results.rows.length ; i++) {
                    var row = results.rows[i];
                    var name = row['name']
                    var quantity = row['quantity']
                    var description = row['description']
                    var completed = row['completed']

                    if (completed == "false"){
                        htmlCompletedFalse += `
                        <li>
                            <a data-role="button" data-row-id="${row['id']}" href="#" data-rel="popup" data-positon-to="window" data-transition="pop">${name}
                            <span class="ui-li-count">Qty: ${quantity}</span>
                            <p>${description}</p>
                            <a data-role="button" data-row-id="${row['id']}" href="#" custom-status="incomplete"></a>
                            </a>
                        </li>
                        `;
                    }
                    else {
                        htmlCompletedTrue += `                        
                        <li>
                            <a data-role="button" data-row-id="${row['id']}" href="#" data-rel="popup" data-positon-to="window" data-transition="pop" style="opacity: 0.3">${name}
                            <span class="ui-li-count">Qty: ${quantity}</span>
                            <p>${description}</p>
                            <a data-role="button" data-row-id="${row['id']}" href="#" data-icon="back" custom-status="completed"></a>
                            </a>
                        </li>
                        `;
                    }
                }
                htmlCode += `
                    <li data-role="list-divider">Active</li>
                    ${htmlCompletedFalse}
                    <li data-role="list-divider">Completed</li>
                    ${htmlCompletedTrue}
                `;
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
                    $("#txtUpdateItem").val(itemName)
                    $("#txtUpdateItemQuantity").val(itemQuantity)
                    $("#txtUpdateItemDescription").val(itemDescription)
                }
            }

            $("#itemList a:first-child").on("click", clickHandlerEditItem);

            function clickHandlerCompleteItem() {
                let itemId = $(this).attr("data-row-id")

                itemOperations.complete(itemId);
                console.info("Item updated");
                getItems();
            }

            $("[custom-status='incomplete']").on("click", clickHandlerCompleteItem);

            function clickHandlerUncompleteItem() {
                let itemId = $(this).attr("data-row-id")

                itemOperations.uncomplete(itemId);
                console.info("Item updated");
                getItems();
            }

            $("[custom-status='completed']").on("click", clickHandlerUncompleteItem);
        }
    }
    catch (error){
        console.error(error.message)
    }
}

// clear input text for new item
function cleartxtNewItemInputs(){
    $("#txtItemQty").val("1");
    $("#txtItemDescription").val("");
}

//get data from search bar and send to input text for new item
function loadPopupItemForm(){
    let search = $("#Details [data-type='search']").val()
    $("#txtItemAdd").val(search)
}

//add new item
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
            console.info("Item added to the database");
            $("#addItem").popup("close");
            $("#Details [data-type='search']").val("")
            getItems();
        }
        catch (error){
            console.error(error.message)
        }

    }
    else{
        console.info("Item is invalid")
    }
}

//update item
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
            console.info("Item updated");
            $("#updateItem").popup("close")
            getItems();
            }
        catch (error){
            console.error(error.message)
        }

    }
    else{
        console.info("Item is invalid")
    }
}

//delete item
function deleteItem(){
    var itemId = [localStorage.getItem("itemId")];

    try{
        itemOperations.delete(itemId)
        $("#updateItem").popup("close");
        getItems();
    }
    catch (error){
        console.error(error.message)
    }}

//User profile
//select an image from android device and show it on profile and panels
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
        var profilePanelPic = $("#profilePanelPic");
        var aboutPanelPic = $("#aboutPanelPic");
        var settingsPanelPic = $("#settingsPanelPic");

        //Update elements
        profilePagePic.prop("src", "data:image/jpeg;base64," + imageData);
        homePanelPic.prop("src", "data:image/jpeg;base64," + imageData);
        detailsPanelPic.prop("src", "data:image/jpeg;base64," + imageData);
        profilePanelPic.prop("src", "data:image/jpeg;base64," + imageData);
        aboutPanelPic.prop("src", "data:image/jpeg;base64," + imageData);
        settingsPanelPic.prop("src", "data:image/jpeg;base64," + imageData);

        //Save on local storage??
        localStorage.setItem("userProfilePic", imageData);
    }

    function onFail(message) {
        console.error('Failed because: ' + message);
    }
}

//Camera handler
//take a picture from android device and show it on profile and panels
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
             var profilePanelPic = $("#profilePanelPic");
             var aboutPanelPic = $("#aboutPanelPic");
             var settingsPanelPic = $("#settingsPanelPic");

             //Update elements
             profilePagePic.prop("src", "data:image/jpeg;base64," + imageData);
             homePanelPic.prop("src", "data:image/jpeg;base64," + imageData);
             detailsPanelPic.prop("src", "data:image/jpeg;base64," + imageData);
             profilePanelPic.prop("src", "data:image/jpeg;base64," + imageData);
             aboutPanelPic.prop("src", "data:image/jpeg;base64," + imageData);
             settingsPanelPic.prop("src", "data:image/jpeg;base64," + imageData);

            //Save on local storage??
            localStorage.setItem("userProfilePic", imageData);
        }

    function onFail(message) { 
        console.error('Failed because: ' + message);
    } 
}

//update user profile information
function saveUserProfile(){

    if(doValidation_userProfileForm()){
        let user = new User();
        user.userId = localStorage.getItem("currentUserId")
        user.email = $("#email").val();
        user.fullName = $("#fullName").val();
        user.password = $("#confirmPassword").val();

        try{
            let result = confirm("Update user?")
            if (result == true){
                userOperations.update(user);
                loadWelcome();
                loadUserProfile();
            }
        }
        catch (error){
            console.error(error.message)
        }
    }
    else{
        console.error("Update user profile form is invalid.")
    }
}

//get user profile information from database and show on profile page
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

//logout current user
function logoutUser(){
    localStorage.setItem("userLoggedIn", "false");
    localStorage.removeItem("currentUserId");
    location.reload();
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
}