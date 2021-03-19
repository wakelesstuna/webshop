console.log("form.js running...");

$(function() {
    $("#validate-form").submit(false);

    $("#fname-error-message").hide();
    $("#lname-error-message").hide();
    $("#email-error-message").hide();
    $("#address-error-message").hide();
    $("#phone-error-message").hide();
     

    $("#form-first-name").focusout(function(){
        checkFirstname();
    });
    $("#form-last-name").focusout(function(){
        checkLastname();
    });
    $("#form-email").focusout(function(){
        checkEmail();
    });
    $("#form-address").focusout(function(){
        checkAddress();
    });
    $("#form-phone").focusout(function(){
        checkPhone();
    });

    function checkFirstname() {
        let pattern =  /^[a-zA-Z]*$/;
        const firstname = $("#form-first-name").val();
        if(pattern.test(firstname) && firstname !== ''){
            $("#fname-error-message").hide();
            $("#form-first-name").css("border-bottom","2px solid #34F458");
            return true;
        } else {
            $("#fname-error-message").html("Should contain only Characters");
            $("#fname-error-message").show();
            $("#form-first-name").css("border-bottom","2px solid #F90A0A");
            return false;
        }
    }

    function checkLastname() {
        let pattern =  /^[a-zA-Z]*$/;
        const lastname = $("#form-last-name").val();
        if(pattern.test(lastname) && lastname !== ''){
            $("#lname-error-message").hide();
            $("#form-last-name").css("border-bottom","2px solid #34F458");
            return true;
        } else {
            $("#lname-error-message").html("Should contain only Characters");
            $("#lname-error-message").show();
            $("#form-last-name").css("border-bottom","2px solid #F90A0A");
            return false;
        }
    }

    function checkEmail() {
        let pattern = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        let email = $("#form-email").val();
        if(pattern.test(email) && email !== '') {
            $("#email-error-message").hide();
            $("#form-email").css("border-bottom","2px solid #34F458");
            return true;
        }else{
            $("#email-error-message").html("Invalid email");
            $("#email-error-message").show();
            $("#form-email").css("border-bottom","2px solid #F90A0A");
            return false;
        }
    }

    function checkAddress() {
        let pattern = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;
        const address = $("#form-address").val();
        if(pattern.test(address) && address !== ''){
            $("#address-error-message").hide();
            $("#form-address").css("border-bottom","2px solid #34F458");
            return true;
        } else {
            $("#address-error-message").html("Not a valid address");
            $("#address-error-message").show();
            $("#form-address").css("border-bottom","2px solid #F90A0A");
            return false;
        }

    }

    function checkPhone() {
        let pattern = /^\d+$/;;
        let phoneNumber = $("#form-phone").val();
        if(pattern.test(phoneNumber) ){
            $("#phone-error-message").hide();
            $("#form-phone").css("border-bottom","2px solid #34F458");
            return true;
        }else {
            $("#phone-error-message").html("Phone number must be only digits");
            $("#phone-error-message").show();
            $("#form-phone").css("border-bottom", "2px solid #F90A0A");
            return false;  
        }
    } 

    $("#send-btn").click(function() {
        if(checkFirstname() &&
        checkLastname() &&
        checkEmail() &&
        checkAddress() &&
        checkPhone()){
            swal({
                title: "Order placed",
                text: "You sure you are done shopping?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {
                  swal("Your order is sent to us! Thank you for shopping!", {
                    icon: "success",
                  });
                    localStorage.removeItem('cartNumbers');
                    localStorage.setItem('cartNumbers', 0);
                    localStorage.removeItem('totalPriceOfCart');
                    localStorage.removeItem('productsInCart');
                } else {
                  swal("Good! Let's continue shopping!");
                }
              });              
        }else {
            swal({
                title: "Something went wrong",
                text: "Please fill in the form correctly",
                icon: "warning",
                button: "ok",
              });
        }
    });

});