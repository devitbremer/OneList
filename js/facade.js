function loadAppBasicData() {


    /*userOperations.getById(1, getUserCallback)

    function getUserCallback(tx, results) {

        if (results.rows.length > 0){
            let row = results.rows[0]
            localStorage.setItem("currentUserId", row["userId"])
        }


    }*/
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
        }
        catch (error){
            console.error(error.message)
        }

    }
    else{
        console.info("List is invalid")
    }
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
                let row = results.rows[0];
                databaseUser.userId = row["id"];
                databaseUser.email = row["email"];
                databaseUser.password = row["password"];


                // Compares 2 sets os credential
                if(inputtedUser.email == databaseUser.email && inputtedUser.password == databaseUser.password){
                    localStorage.setItem("userLoggedIn", "true");
                    localStorage.setItem("currentUserId", databaseUser.userId)
                }
            }
        }
        catch (error){
            console.error(error.message)
        }



    }
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

                    var count = itemOperations.countItems(row['id']);

                    htmlCode += `
                    <li>
                        <a data-role="button" data-row-id=${row['id']} href="#">
                            <span class="ui-li-count">${count}</span>${description}
                            <a href="#updateList" data-rel="popup" data-positon-to="window" data-transition="pop"></a>
                        </a>
                    </li>
                `;
                }
            }

            var lists = $("#mainList");
            lists = lists.html(htmlCode);
            lists.listview("refresh");

            function clickHandler() {
                localStorage.setItem("listId", $(this).attr("data-row-id") );
                $("#mainList a:first-child").prop('href', '#Details');
            }

            $("#mainList a:first-child").on("click", clickHandler);
        }
    }
    catch (error){
       console.error(error.message)
    }
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
                        <a data-role="button" data-row-id=${row['id']} href="#" data-rel="popup" data-positon-to="window" data-transition="pop">${name}</a>
                        <a href="#">Completed</a>
                    </li>
                `;
                }
/*                <li>
                    <a href="#updateItem" data-rel="popup" data-positon-to="window" data-transition="pop">Grapes</a>
                    <a href="#">Completed</a>
                </li>*/
            }

            var items = $("#itemList");
            items = items.html(htmlCode);
            items.listview("refresh");

            function clickHandler() {
                localStorage.setItem("itemId", $(this).attr("data-row-id") );
                $("#itemList a:first-child").prop('href', '#updateItem');
            }

            $("#itemList a:first-child").on("click", clickHandler);
        }
    }
    catch (error){
        console.error(error.message)
    }
}