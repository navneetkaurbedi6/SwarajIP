var Claim = {
    SitePath: '',
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json;charset=utf-8',
    dealerId: 0,
    Id: 0,
    employeeName: '',
    employeephone: '',
    employeeLoss: 0,
    employeeLateRemarks:'',
    dataEmployeeName: '',
    dataEmployeeDOAccident: '',
    dataEmployeeDOLeaving: '',
    dataEmployeePhone: '',
    dataEmployeeNatureofClaim: '',
    dataEmployeeEstimatedCost: '',
     //-----------------------Validation Check before Insertion------------------------//
    CheckValidation: function () {
        var HasError = false;
        if ($("#form1").validationEngine('validate') == true) {

            Claim.CreateClaim();
        }
        else {
            HasError = false;
        }
    },
     //-----------------------Claim Creation------------------------//
    CreateClaim: function () {

        if ($("#txtEstimatedCost").val() == "") {
            Claim.employeeLoss = 0;
        }
        else {
            Claim.employeeLoss = $("#txtEstimatedCost").val();
        }

        if ($("#txtLateRemarks").val() == "") {
            Claim.employeeLateRemarks = '';
        }
        else {
            Claim.employeeLateRemarks = $("#txtLateRemarks").val();
        }


        var d = {
            id: Claim.Id,
            employeeId: Claim.employeeId,
            employeeName: $("#txtEmployeeName").val(),
            employeeDOAccident: $("#txtEmployeeDOAccident").val(),
            employeePlaceofAccident: $("#txtEmployeePlaceofAccident").val(),
            employeePhone: $("#txtEmployeePhone").val(),
            employeeNatureofClaim: $("#ddlNatureofClaim").val(),           
            employeeLateRemarks: Claim.employeeLateRemarks,
            employeeEstimatedCost: Claim.employeeLoss

        };
        $.ajax({
            type: "POST",
            url: Login.SitePath + "Views/Dealer/CreateClaim.aspx/InsertClaim",
            data: JSON.stringify(d),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {
                $('.ajax-loader').css("visibility", "visible");
            },
            success: function (result) {

                if (result.d == 1) {
                    if ($(".toast-error").length == 0) {
                        toastr.options.timeOut = 1000;
                        toastr.success('Data Saved Successfully.');
                        window.location.href = Claim.SitePath + "Views/Dealer/ClaimsListing.aspx";
                    }
                    setTimeout(function () {
                        window.location.href = Claim.SitePath + "Views/Dealer/ClaimsListing.aspx";
                    }, 50);
                    //nav
                }
                else {
                    if ($(".toast-error").length == 0) {
                        toastr.error('Sorry! Claim cannot create for same date of accident.');
                        $("#txtEmployeeDOAccident").val('');
                    }
                }

            },
            complete: function () {
                $('.ajax-loader').css("visibility", "hidden");
            },
            error: function (result) {
                console.error(result.responseText);
            }
        });
        return false;




    },
     //-----------------------DropDown Binding of Nature of Claims------------------------//
    BindNatureofClaims: function () {
        $.ajax({
            type: "POST",
            url: Claim.SitePath + "Views/Dealer/CreateClaim.aspx/GetNatureOfClaims",
            // data: JSON.stringify(''),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d.length > 1) {
                    $("#ddlNatureofClaim").html('<option value="">Select</option>');
                    $.each(result.d, function (i) {
                        var optionhtml = '<option value="' + result.d[i].Id + '">' + result.d[i].NatureOfClaim + '</option>';
                        $("#ddlNatureofClaim").append(optionhtml);
                    });
                }
            },
            error: function (result) {
                console.error(result.responseText);
            }
        });
        return false;
    }
};
// Read a page's GET URL variables and return them as an associative array.
function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function Last7Days() {
    var result = '';
    var d = new Date();
    d.setDate(d.getDate() - 7);
    result= formatDate(d);
    return result;
}

function formatDate(date) {
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    if (dd < 10) { dd = '0' + dd; }
    if (mm < 10) { mm = '0' + mm; }
    date = dd + '/' + mm + '/' + yyyy;
    return date;
}

$(function () {
    Claim.SitePath = $("#hdnSitePath").val();

    $(".tablinks").removeClass('active');
    $(".ancManpower").addClass('active');

    Claim.BindNatureofClaims();
    var status = getUrlVars()["redirect"];
    if (status == "true") {
        Claim.employeeId = localStorage.getItem("employeeId");
        Claim.employeeName = localStorage.getItem("employeeName");
        Claim.employeephone = localStorage.getItem("employeephone");
        Claim.employeepolicyNo = localStorage.getItem("employeepolicyNo");


        if (Claim.employeeName != null && Claim.employeeName != "") {
            $("#txtEmployeeName").val(Claim.employeeName);
            $("#txtEmployeeName").prop('readonly', true);
        }

        if (Claim.employeephone != null && Claim.employeephone != "") {
            $("#txtEmployeePhone").val(Claim.employeephone);
        }
    }

    $("#txtEmployeeDOAccident").datetimepicker({
        format: 'Y/m/d',
        formatDate: 'Y/m/d',
        maxDate: 0,
        timepicker: false,  //hide time       
        onSelectDate: function () {
            
            var accidentDate = $("#txtEmployeeDOAccident").val();
            var d2 = new Date(accidentDate);
            var newAccidentDate = formatDate(d2);
            var from1 = newAccidentDate.split("/");
            var f1 = new Date(from1[2], from1[1] - 1, from1[0]);     //First Selected Date 
         
            var beforedate2 = Last7Days();



            var beforedate = new Date();
            var newbeforedate2 = formatDate(beforedate);
            var from = newbeforedate2.split("/");
            var f = new Date(from[2], from[1] - 1, from[0]);         // 7 days before Date


            var timeDiff = Math.abs(f1.getTime() - f.getTime());
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));   // Date difference

            if (diffDays > 7) {
                $("#divRemarks").show();
            }
            else {              
                $("#divRemarks").hide();
            }          
        }
    });

    //$("#txtEmployeeDOLeaving").datetimepicker({
    //    format: 'Y/m/d',
    //    formatDate: 'Y/m/d',
    //    timepicker: false  //hide time
    //});

    $("input[id*='txtEstimatedCost']").keydown(function (event) {


        if (event.shiftKey == true) {
            event.preventDefault();
        }

        if ((event.keyCode >= 48 && event.keyCode <= 57) ||
            (event.keyCode >= 96 && event.keyCode <= 105) ||
            event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 37 ||
            event.keyCode == 39 || event.keyCode == 46 || event.keyCode == 190) {

        } else {
            event.preventDefault();
        }

        if ($(this).val().indexOf('.') !== -1 && event.keyCode == 190)
            event.preventDefault();
        //if a decimal has been added, disable the "."-button

    });

    $("#ddlNatureofClaim").change(function () {
        var value = $("#ddlNatureofClaim").val();
        if (value == 2) {
            $("#divLoss").hide();
        }
        else {
            $("#divLoss").show();

        }
    });

    $("#btnSaveClaim").click(function () {
        Claim.CheckValidation();
    });

    $("#btnBackToListing").click(function () {
        window.location.href = Claim.SitePath + "Views/Dealer/ManpowerListing.aspx";
    });
});