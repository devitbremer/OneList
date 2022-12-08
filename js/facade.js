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
            $("#txtNewList").val(),
            localStorage.getItem("currentUserId")
        )
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
            console.log("User registered successfully.")
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
//Calls validation for Modify Review Page
function updateValidation(){
    if (doValidate_frmUpdate()){
        console.info("Modify Form is valid")
    }
    else{
        console.info("Modify Form is invalid")
    }
}