
function doValidate_frmAdd(){

    let formAdd = $("#frmAdd");

    formAdd.validate({
        errorElement: 'label',
        rules:{
            restaurantName:{
                required: true,
                minlength: 2,
                maxlength: 20
            },
            businessId:{
                required: true,
                minlength: 2,
                maxlength: 5
            },
            reviewerEmail:{
                required: true,
                email: true
            },
            foodQuality:{
                required: '#addRatings:checked',
                min: 0,
                max: 5
            },
            service:{
                required: '#addRatings:checked',
                min: 0,
                max: 5
            },
            value:{
                required: '#addRatings:checked',
                min: 0,
                max: 5
            }

        },
        messages:{
            restaurantName:{
                required: "Restaurant name is required.",
                minlength: "Restaurant name must have at least 2 characters.",
                maxlength: "Restaurant name must have no more than 20 characters."
            },
            businessId:{
                required: "Business ID is required.",
                minlength: "Business ID must have at least 2 characters.",
                maxlength: "Business ID must have no more than 5 characters"
            },
            reviewerEmail:{
                required: "Your email address is required.",
                email: "This does not look like a valid email."
            },
            foodQuality:{
                min: "Value must be between 0 and 5.",
                max: "Value must be between 0 and 5."
            },
            service:{
                min: "Value must be between 0 and 5.",
                max: "Value must be between 0 and 5."
            },
            value:{
                min: "Value must be between 0 and 5.",
                max: "Value must be between 0 and 5."
            }
        }
    })
    return formAdd.valid();
}


function doValidate_frmUpdate(){
    let formUpdate = $("#frmUpdate");

    formUpdate.validate({
        errorElement: 'label',
        rules:{
            updateRestaurantName:{
                required: true,
                minlength: 2,
                maxlength: 20
            },
            updateBusinessId:{
                required: true,
                minlength: 2,
                maxlength: 5
            },
            updateReviewerEmail:{
                required: true,
                email: true
            },
            updateFoodQuality:{
                required: '#updateRatings:checked',
                min: 0,
                max: 5
            },
            updateService:{
                required: '#updateRatings:checked',
                min: 0,
                max: 5
            },
            updateValue:{
                required: '#updateRatings:checked',
                min: 0,
                max: 5
            }

        },
        messages:{
            updateRestaurantName:{
                required: "Restaurant name is required.",
                minlength: "Restaurant name must have at least 2 characters.",
                maxlength: "Restaurant name must have no more than 20 characters."
            },
            updateBusinessId:{
                required: "Business ID is required.",
                minlength: "Business ID must have at least 2 characters.",
                maxlength: "Business ID must have no more than 5 characters"
            },
            updateReviewerEmail:{
                required: "Your email address is required.",
                email: "This does not look like a valid email."
            },
            updateFoodQuality:{
                min: "Value must be between 0 and 5.",
                max: "Value must be between 0 and 5."
            },
            updateService:{
                min: "Value must be between 0 and 5.",
                max: "Value must be between 0 and 5."
            },
            updateValue:{
                min: "Value must be between 0 and 5.",
                max: "Value must be between 0 and 5."
            }
        }
    })
    return formUpdate.valid();
}