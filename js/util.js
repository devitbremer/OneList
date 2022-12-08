
function doValidation_newListForm(){

    let formNewList = $("#newListForm");

    formNewList.validate({
        errorElement: 'label',
        rules:{
            txtNewList:{
                required: true,
                minlength: 2,
                maxlength: 15
            }

        },
        messages:{
            txtNewList:{
                required: "A list must have a name.",
                minlength: "The list name must have at least 2 characters.",
                maxlength: "The list name cant have no more than 15 characters."
            }
        }
    })
    return formNewList.valid();
}

function doValidation_registerForm(){
    let registerForm = $("#registerForm");

    registerForm.validate({
        errorElement: 'label',
        rules:{
            txtRegisterName:{
                required: true,
                minlength: 5,
                maxlength: 30
            },
            txtRegisterEmail:{
                required: true,
                email: true
            },
            //ToDO: Password Strength?
            txtRegisterPassword:{
                required: true,
                minlength: 8,
                maxlength: 15
            },
            txtRegisterConfirmPassword:{
                required: true,
                equalTo: "#txtRegisterPassword"
            }

        },
        messages:{
            txtRegisterName:{
                required: "Please enter your full name.",
                minlength: "Your name must have at least 2 characters.",
                maxlength: "Your name can`t have more than 15 characters."
            },
            txtRegisterEmail:{
                required: "Please enter your email address.",
                email: "This does not look like a valid email address."
            },
            txtRegisterPassword:{
                required: "Please enter a password.",
                minlength: "Password must have at least 8 characters.",
                maxlength: "Password can`t have more than 15 characters."
            },
            txtRegisterConfirmPassword:{
                required: "Please confirm your password.",
                equalTo: "Passwords don`t match."

            },

        }
    })
    return registerForm.valid();
}


function doValidation_loginForm(){

    let loginForm = $("#loginForm");

    loginForm.validate({
        errorElement: 'label',
        rules:{
            txtLoginEmail:{
                required: true,
            },

            txtLoginPassword:{
                required: true,
            }

        },
        messages:{
            txtLoginEmail:{
                required: "Email can`t be empty."
            },

            txtLoginPassword:{
                required: "Password can`t be empty."
            },

        }
    })
    return loginForm.valid();
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