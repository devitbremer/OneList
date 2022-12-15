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
                required: "Name is required.",
                minlength: "Min 2 characters.",
                maxlength: "Max 15 characters."
            }
        }
    })
    return formNewList.valid();
}

function doValidation_updateListForm(){

    let updateListForm = $("#updateListForm");

    updateListForm.validate({
        errorElement: 'div',
        errorPlacement: function (error, element) {
            error.insertAfter(element.closest('div'));
        },
        rules:{
            txtUpdateList:{
                required: true,
                minlength: 2,
                maxlength: 15
            }

        },
        messages:{
            txtUpdateList:{
                required: "Name is required.",
                minlength: "Min 2 characters.",
                maxlength: "Max 15 characters."
            }
        }
    })
    return updateListForm.valid();
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
                required: "Name is required.",
                minlength: "Min 5 characters.",
                maxlength: "Max 30 characters."
            },
            txtRegisterEmail:{
                required: "Email is required.",
                email: "Invalid email."
            },
            txtRegisterPassword:{
                required: "Password is required.",
                minlength: "Min 8 characters.",
                maxlength: "Max 15 characters.",
                pwdStrength: "Weak password"
            },
            txtRegisterConfirmPassword:{
                required: "Confirm password.",
                equalTo: "Passwords don't match."

            },

        }
    })
    return registerForm.valid();
}

function doValidation_userProfileForm(){
    let userProfileForm = $("#userProfileForm");

    userProfileForm.validate({
        errorElement: 'div',
        errorPlacement: function (error, element) {
            error.insertAfter(element.closest('div'));
        },
        rules:{
            fullName:{
                required: true,
                minlength: 5,
                maxlength: 30
            },
            password:{
                required: true,
                minlength: 8,
                maxlength: 15,
                pwdStrength: true
            },
            confirmPassword:{
                required: true,
                equalTo: "#password"
            }

        },
        messages:{
            fullName:{
                required: "Name is required.",
                minlength: "Min 2 characters.",
                maxlength: "Max 15 characters."
            },
            password:{
                required: "Password is required.",
                minlength: "Min 8 characters.",
                maxlength: "Max 15 characters.",
                pwdStrength: "Weak password"
            },
            confirmPassword:{
                required: "Confirm password.",
                equalTo: "Passwords don't match."

            },

        }
    })
    return userProfileForm.valid();
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
                required: true
            },

            txtLoginPassword:{
                required: true,
            }

        },
        messages:{
            txtLoginEmail:{
                required: "Email is required."
            },

            txtLoginPassword:{
                required: "Password is required."
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
                required: "Name is required",
                minlength: "Min 2 characters",
                maxlength: "Max 15 characters"
            },
            txtItemQty:{
                required: "Quantity is required",
                min: "Min 1"
            },
            txtItemDescription:{
                maxlength: "Max 20 characters"
            }
        }
    })
    return formUpdate.valid();
}

function doValidate_frmItemUpdate(){
    let formUpdate = $("#updateItemForm");

    formUpdate.validate({
        errorElement: 'div',
        errorPlacement: function (error, element) {
            error.insertAfter(element.closest('div'));
        },
        rules:{
            txtUpdateItem:{
                required: true,
                minlength: 2,
                maxlength: 15
            },
            txtUpdateItemQuantity:{
                required: true,
                min: 1
            },
            txtUpdateItemDescription:{
                maxlength: 20
            }
        },
        messages:{
            txtUpdateItem:{
                required: "Name is required",
                minlength: "Min 2 characters",
                maxlength: "Min 15 characters"
            },
            txtUpdateItemQuantity:{
                required: "Quantity is required",
                min: "Min 1"
            },
            txtUpdateItemDescription:{
                maxlength: "Max 20 characters"
            }
        }
    })
    return formUpdate.valid();
}