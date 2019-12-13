var Login = {
    SitePath: '',
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json;charset=utf-8',

    CheckValidation: function () {
        var HasError = false;
        if ($("#form1").validationEngine('validate') == true) {
            var emailId = $("#txtEmail").val();
            var password = $("#txtPassword").val();
            Login.LogInUser(emailId, password);
        }
        else {
            HasError = false;
        }
    },
    LogInUser: function (emailId, password) {
        var d = { emailId: emailId, password: password };
        $.ajax({
            type: "POST",
            url: Login.SitePath + "Views/Login.aspx/LoginUser",
            data: JSON.stringify(d),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d.status == 1) {
                    if (result.d.roleId == '1') {
                        window.location.href = Login.SitePath + "Views/Dealer/Dashboard.aspx";
                    }
                    else if (result.d.roleId == '2') {
                        window.location.href = Login.SitePath + "Views/HO/HODashboard.aspx";
                    }
                    else if (result.d.roleId == '3') {
                        window.location.href = Login.SitePath + "Views/IFFCO/IFFCODashboard.aspx";                     
                    }
                }
                else if ((result.d.status == "2") || (result.d.status == "0")) {
                    if ($(".toast-error").length == 0) {
                        toastr.error('Invalid Credentials');
                    }
                }
            },
            error: function (result) {
                console.error(result.responseText);
            }
        });
        return false;
    },
    //*********logout user************
    Logout: function () {
        $.ajax({
            type: Login.type,
            url: Login.SitePath + 'Views/Login.aspx/LogoutUser',
            //data: JSON.stringify(data),
            contentType: Login.contentType,
            dataType: "json",
            async: false,
            success: function (result) {
                if (result.d != null) {
                    if (result.d == 1) {
                        window.location.href = Login.SitePath + "Views/Login.aspx";
                    }
                }
            },
            error: function (xhr) {
                console.error(xhr.responseText);
            }
        });
    }
};

$(document).ready(function(){
    Login.SitePath = $("#hdnSitePath").val();

    $("#btnLogin").click(function () {
        Login.CheckValidation();
    });


    $("#btnLogout").click(function () {
        Login.Logout();
    });
});