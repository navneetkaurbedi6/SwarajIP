var Dashboard = {
    SitePath: '',
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json;charset=utf-8',
    status: 0,
    dealerCode: '',
    finYr: '',
    //------------------------Get Dashboard Count---------------------//
    GetDashboardCount: function () {
        var d = {
            finYear: Dashboard.finYr,
            dealerCode: Dashboard.dealerCode
        };
        $.ajax({
            type: "POST",
            url: Dashboard.SitePath + "Views/HO/HODashboard.aspx/GetDashboardCount",
            data: JSON.stringify(d),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {
                $('.ajax-loader').css("visibility", "visible");
            },
            success: function (result) {
                if (result.d.status == 1) {
                    $("#spnNoofManpower").text(result.d.noOfManpowerCount);
                    $("#spnNoofManpowerInsured").text(result.d.noOfManpowerInsuredCount);
                    $("#spnNoofClaimsCreated").text(result.d.noOfClaimsCreated);
                    $("#spnNoofClaimsPending").text(result.d.noOfClaimsPending);
                    $("#spnNoofClaimsAcknowledged").text(result.d.noOfClaimsAcknowlwdged);
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
    //-----------------DropDown Binding of Financial Years-----------//
    BindFinancialYears: function () {
        $.ajax({
            type: "POST",
            url: Dashboard.SitePath + "Views/Dealer/Dashboard.aspx/BindFinancialYears",
            // data: JSON.stringify(''),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d.length > 1) {
                    $("#ddlFinancialYear").html('<option value="">All Years</option>');
                    $.each(result.d, function (i) {
                        var optionhtml = '<option value="' + result.d[i].FinYear + '">' + result.d[i].YearRange + '</option>';
                        $("#ddlFinancialYear").append(optionhtml);
                    });
                }
            },
            error: function (result) {
                console.error(result.responseText);
            }
        });
        return false;
    },
    //------------------DropDown Binding of Dealers------------------//
    BindDealers: function () {
        $.ajax({
            type: "POST",
            url: Dashboard.SitePath + "Views/HO/HODashboard.aspx/BindDealers",
            // data: JSON.stringify(''),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                $("#ddlDealer").html('');
                if (result.d.length > 1) {
                    $("#ddlDealer").html('<option value="">Select Dealer </option>');
                    $.each(result.d, function (i) {
                        var optionhtml = '<option value="' + result.d[i].dealerCode + '">' + result.d[i].dealerCode + '</option>';
                        $("#ddlDealer").append(optionhtml);
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
$(function () {
    Dashboard.SitePath = $("#hdnSitePath").val();
    $(".tablinks").removeClass('active');
    $(".ancDashboard").addClass('active');
    Dashboard.BindDealers();
    Dashboard.BindFinancialYears();
    Dashboard.GetDashboardCount();
    $("#ddlFinancialYear").change(function () {
        Dashboard.finYr = $("#ddlFinancialYear").val();
    });

    $("#ddlDealer").change(function () {

        Dashboard.dealerCode = $("#ddlDealer").val();
    });

    $(document).on('click', '#btnSearch', function () {
        Dashboard.GetDashboardCount();
    });

    $("#ancInsured").click(function () {
        localStorage.setItem("manInsured", 1);
    });

    $("#ancClaimsCreated").click(function () {
        localStorage.setItem("mode", "");
    });

    $("#ancClaimsPending").click(function () {
        localStorage.setItem("mode", "inprogress");
    });

    $("#ancClaimsAcknowledged").click(function () {
        localStorage.setItem("mode", "ack");

    });

});