$(document).ready(function (){
    init();
})

function init(){
    //Initializes hideRatings div as hidden
    $("#hideRatings").hide();
    $("#addRatings").on("click",chboxAddRatingsClick);

    //Initializes hideUpdateRatings div as hidden
    $("#hideUpdateRatings").hide();
    $("#updateRatings").on("click",chboxModifyRatingsClick);


    //Events to calculate rating on Add Page
    $("#value").on("keyup",ratingsCalculation);
    $("#service").on("keyup",ratingsCalculation);
    $("#foodQuality").on("keyup",ratingsCalculation);


    //Events to calculate rating on Edit Page
    $("#updateValue").on("keyup",updateRatingsCalculation);
    $("#updateService").on("keyup",updateRatingsCalculation);
    $("#updateFoodQuality").on("keyup",updateRatingsCalculation);

    //Events for Save buttons on Edit and Modify Review
    $("#btnSave").on("click", btnSaveClick);
    $("#btnUpdate").on("click", btnUpdateClick);

}

function chboxAddRatingsClick(){
    enableRatings()
}

function chboxModifyRatingsClick(){
    enableUpdateRatings()
}

function btnSaveClick(){
    addValidation()
}
function btnUpdateClick(){
    updateValidation()
}