//Controls whether if ratings are shown or not on Add Review Page.
function enableRatings(){

    if ($("#addRatings").prop("checked")){
        $("#hideRatings").show();

        $("#rating").val(0+"%")
        $("#value").val(0)
        $("#service").val(0)
        $("#foodQuality").val(0)
    }
    else{
        $("#hideRatings").hide();
    }
}

////Controls whether if ratings are shown or not on Modify Review Page.
function enableUpdateRatings(){
    if ($("#updateRatings").prop("checked")){
        $("#hideUpdateRatings").show();

        $("#updateRating").val(0)
        $("#updateValue").val(0)
        $("#updateService").val(0)
        $("#updateFoodQuality").val(0)
    }
    else{
        $("#hideUpdateRatings").hide();
    }
}

//Calculates Ratings for Add Review Page
function ratingsCalculation(){
    let foodQuality = parseInt($("#foodQuality").val())
    let service = parseInt($("#service").val())
    let value = parseInt($("#value").val())
    let rating = (foodQuality+service+value) * 100/15

    if (isNaN(rating)){
        $("#rating").val(0+"%")
    }
    else{
        $("#rating").val(rating.toFixed(0)+"%")
    }
}

//Calculates Ratings for Modify Review Page
function updateRatingsCalculation(){
    let updateFoodQuality = parseInt($("#updateFoodQuality").val())
    let updateService = parseInt($("#updateService").val())
    let updateValue = parseInt($("#updateValue").val())
    let updateRating = (updateFoodQuality+updateService+updateValue) * 100/15

    if (isNaN(updateRating)){
        $("#updateRating").val(0)
        $("#updateRating").slider("refresh")
    }
    else{
        $("#updateRating").val(updateRating.toFixed(0))
        $("#updateRating").slider("refresh")
    }
}

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