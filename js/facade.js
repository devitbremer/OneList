
//Calls validation for Add Review Page
function addValidation(){
    if (doValidate_frmAdd()){
        console.info("Add Form is valid")
    }
    else{
        console.info("Add Form is invalid")
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