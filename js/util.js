
function doValidation_newListForm(){

    let formNewList = $("#newListForm");

    formNewList.validate({
        errorElement: 'div',
        errorPlacement: function (error, element) {
            error.insertAfter(element.closest('div'));
        },
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
        errorElement: 'div',
        errorPlacement: function (error, element) {
            error.insertAfter(element.closest('div'));
        },
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
            txtRegisterPassword:{
                required: true,
                minlength: 8,
                maxlength: 15,
                pwdStrength: true
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
                maxlength: "Password can`t have more than 15 characters.",
                pwdStrength: "Password must meet complexity requirements"
            },
            txtRegisterConfirmPassword:{
                required: "Please confirm your password.",
                equalTo: "Passwords don`t match."

            },

        }
    })
    return registerForm.valid();
}

//custom password strength validation
jQuery.validator.addMethod("pwdStrength",
    function(value, element){
        var regexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).*$/;
        return regexp.test(value);
    });


function doValidation_loginForm(){

    let loginForm = $("#loginForm");

    loginForm.validate({
        errorElement: 'div',
        errorPlacement: function (error, element) {
            error.insertAfter(element.closest('div'));
        },
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

function doValidate_frmItemAdd(){
    let formUpdate = $("#frmItemAdd");

    formUpdate.validate({
        errorElement: 'div',
        errorPlacement: function (error, element) {
            error.insertAfter(element.closest('div'));
        },
        rules:{
            txtItemAdd:{
                required: true,
                minlength: 2,
                maxlength: 15
            },
            txtItemQty:{
                required: true,
                min: 1
            },
            txtItemDescription:{
                maxlength: 20
            }
        },
        messages:{
            txtItemAdd:{
                required: "Please enter item name",
                minlength: "Item must be at least 2 char long",
                maxlength: "Item must be maximum 15 char long"
            },
            txtItemQty:{
                required: "Please enter quantity",
                min: "Minimum quantity is 1"
            },
            txtItemDescription:{
                maxlength: "Description must be maximum 20 char long"
            }
        }
    })
    return formUpdate.valid();
}