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
        console.info("Add Form is valid")

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
        console.info("Add Form is invalid")
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
        console.info("ItemAdd Form is valid")
    }
    else{
        console.info("ItemAdd Form is invalid")
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
                    <h2>Create your first List</h2>
                </li>
            `;
            }
            else {
                for (let i = 0; i < results.rows.length ; i++) {
                    var row = results.rows[i];
                    var description = row['description']
                }

                htmlCode += `
                    <li><a href="#Details"><span class="ui-li-count">7</span>${description}</a></li>
                `;
            }

            var lists = $("#mainList");
            lists = lists.html(htmlCode);
            lists.listview("refresh");
        }
    }
    catch (error){
       console.error(error.message)
    }


}