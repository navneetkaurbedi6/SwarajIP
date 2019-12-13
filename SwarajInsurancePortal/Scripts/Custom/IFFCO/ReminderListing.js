var Reminder = {
    SitePath: '',
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json;charset=utf-8',
    pageSize: 10,
    NumberOfPages: 0,
    Total: 0,
    pageNumber: 1,
    Search: '',
    displayPage: '4',
    flag: '',
    sort: '',
    dealerCode: '',
    searchKeyword: '',
    ClaimId: 0,
    ClaimNumber: '',
    emailId:'',
    claimMode: '',
    reminderDesc:'',
    status: 0,
    dealerId: '',
    //--------Get Company Claims Listing-------//
    GetCompanyClaimsListing: function () {
        
        Reminder.natureofClaim = $("#ddlClaimNature").val();
        if (Reminder.natureofClaim == "") {
            Reminder.natureofClaim = 0;
        }

        Reminder.dealerId = $("#ddlDealers").val();
        if (Reminder.dealerId == "") {
            Reminder.dealerId = '';
        }
        Reminder.status = $("#ddlStatus").val();
        if (Reminder.status == "") {
            Reminder.status = 0;
        }
        var d =
        {
            natureofClaim: Reminder.natureofClaim,
            claimStatus: Reminder.status,
            status: Reminder.claimMode,
            pageNumber: Reminder.pageNumber,
            pageSize: Reminder.pageSize,
            sort: Reminder.sort,
            dealerCode: Reminder.dealerId,
            searchKeyword: Reminder.searchKeyword
        };
        $.ajax({
            type: "POST",
            url: Reminder.SitePath + "Views/IFFCO/CompanyClaimsListing.aspx/GetCompanyClaimsListing",
            data: JSON.stringify(d),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d != null) {
                    Reminder.BindDataToGrid(result.d);
                }
            },
            error: function (result) {
                console.error(result.responseText);
            }
        });
        return false;
    },
    //--------Bind Data To Grid-------//
    BindDataToGrid: function (JsonData) {

        var PageList = "";
        var result = JsonData;
        if (result.length > 0) {
            for (var i = 0; i < result.length; i++) {

                if (i % 2 != 0) {
                    PageList += '<tr  style="background: rgb(238, 242, 248);">';
                }
                else {
                    PageList += '<tr>';
                }
                PageList += '<td style="font-weight: 600;">' + result[i].ClaimId + '</td>';
                PageList += '<td>' + result[i].DealerCode + '</td>';
                PageList += '<td>' + result[i].Name + '</td>';
                PageList += '<td>' + result[i].DateOfAccident + '</td>';
                PageList += '<td>' + result[i].PlaceofAccident + '</td>';
                PageList += '<td>' + result[i].MobileNo + '</td>';
                PageList += '<td>' + result[i].NatureofClaim + '</td>';
                PageList += '<td>' + result[i].EstimatedCost + '</td>';
                PageList += '<td style="font-weight: 600;color:' + result[i].color +'">' + result[i].ClaimStatus + '</td>';
                PageList += '<td>' + result[i].CreatedDate + '</td>';
                PageList += '<td><input value = "Send Reminder" id="' + result[i].Id + '" emailId="' + result[i].EmailId + '" dealercode="' + result[i].DealerCode + '" name="' + result[i].Name + '" nature="' + result[i].NatureofClaim + '" claimNo="' + result[i].ClaimId + '" class="login clsReminder" type = "button" /><input value = "All Reminders" id="' + result[i].Id + '" class="login clsAllReminders" type = "button" /></td> ';
                PageList += '<td><input value="View Details" id="' + result[i].Id + '" class="login clsViewDetails" type="button" /></td>';
                PageList += '</tr>';
            }
            $("#tbodyReminder").html("");
            $("#tbodyReminder").html(PageList);

            $("#divpageSize").show();
            $("#divPaging").show();
            Reminder.Total = result[0].Total;
            Reminder.pageSize = $("#ddlPerPagelist").val();
            Reminder.NumberOfPages = parseInt(Math.ceil(Reminder.Total / Reminder.pageSize));
        }
        else {
            PageList += '<tr>';
            PageList += '<td colspan="10" align="center"><div style="text-align: center"><label>No Records Found</label></div></td>';
            $("#tbodyReminder").html("");
            $("#tbodyReminder").html(PageList);

            Reminder.Total = 0;
            Reminder.pageSize = $("#ddlPerPagelist").val();
            Reminder.NumberOfPages = 0;
            $("#divpageSize").hide();
            $("#divPaging").hide();
        }

        /*Pagination*/
        if (parseInt(Reminder.NumberOfPages) > 1) {
            $("#divPaging, #divpageSize").show();
            var displayPage = 4;
            if (Reminder.NumberOfPages < displayPage) {
                displayPage = Reminder.NumberOfPages;
            }
            if (Reminder.pageNumber > Reminder.NumberOfPages) {
                Reminder.pageNumber = Reminder.NumberOfPages;
            }

            $("#divPaging").paginate({
                count: Reminder.NumberOfPages,
                start: Reminder.pageNumber,
                display: displayPage,
                border: true,
                border_color: '#fff',
                text_color: '#fff',
                background_color: '#555',
                border_hover_color: '#ccc',
                text_hover_color: '#000',
                background_hover_color: '#fff',
                images: false,
                mouse: 'press',
                onChange: function (page) {
                    $("#divoverlay").show();
                    var jPagWidth = parseInt($(".jPag-pages").css("width"));
                    $(".jPag-pages").css("width", jPagWidth + 1000);
                    Reminder.pageNumber = page;
                    Reminder.GetCompanyClaimsListing();
                }
            });
            var jPagWidth = parseInt($(".jPag-pages").css("width"));
            $(".jPag-pages").css("width", jPagWidth + 1000);
        }

        else if (parseInt(Reminder.NumberOfPages) == 1) {
            $("#divPaging").hide();
            $("#divPageSize").hide();
        }
        else {
            $("#divPaging").hide();
            $("#divpageSize").hide();
        }
    },
    //--------Save Reminder-------//
    SaveReminder: function () {
        var d =
        {
            dealerCode: Reminder.dealerCode,
            claimId: Reminder.ClaimId,
            claimNo: Reminder.ClaimNumber,
            dealerEmail: Reminder.emailId,
            reminderDesc: Reminder.reminderDesc
        };
        $.ajax({
            type: "POST",
            url: Reminder.SitePath + "Views/IFFCO/ReminderListing.aspx/SaveReminder",
            data: JSON.stringify(d),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d != null) {
                    if (result.d == 1) {
                        if ($(".toast-error").length == 0) {
                            toastr.success('Reminder Sent Successfully.');
                        }
                        setTimeout(function () {
                            
                            $("#myModal").hide();
                            Reminder.GetCompanyClaimsListing();
                        },2000);
                    }
                }
                else {
                    if ($(".toast-error").length == 0) {
                        toastr.error('Something went wrong!');
                    }
                }
            },
            error: function (result) {
                console.error(result.responseText);
            }
        });
        return false;
    },
    //--------Dropdown Bind Nature of Claims-------//
    BindNatureofClaims: function () {
        $.ajax({
            type: "POST",
            url: Reminder.SitePath + "Views/Dealer/CreateClaim.aspx/GetNatureOfClaims",
            // data: JSON.stringify(''),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d.length > 1) {
                    $("#ddlClaimNature").html('<option value="0">Select Nature of Claim</option>');
                    $.each(result.d, function (i) {
                        var optionhtml = '<option value="' + result.d[i].Id + '">' + result.d[i].NatureOfClaim + '</option>';
                        $("#ddlClaimNature").append(optionhtml);
                    });
                }
            },
            error: function (result) {
                console.error(result.responseText);
            }
        });
        return false;
    },
    //--------Dropdown Bind Dealers-------//
    BindDealers: function () {
        $.ajax({
            type: "POST",
            url: Reminder.SitePath + "Views/HO/HOClaimsListing.aspx/GetAllDealers",
            // data: JSON.stringify(''),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d.length > 1) {
                    $("#ddlDealers").html('<option value="">Select Dealers</option>');
                    $.each(result.d, function (i) {
                        var optionhtml = '<option value="' + result.d[i].Id + '">' + result.d[i].dealerCode + '</option>';
                        $("#ddlDealers").append(optionhtml);
                    });
                }
            },
            error: function (result) {
                console.error(result.responseText);
            }
        });
        return false;
    },
    //--------Dropdown Bind Status-------//
    BindStatus: function () {
        $.ajax({
            type: "POST",
            url: Reminder.SitePath + "Views/HO/HOClaimsListing.aspx/GetAllStatus",
            // data: JSON.stringify(''),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d.length > 1) {
                    $("#ddlStatus").html('<option value="0">Select Status</option>');
                    $.each(result.d, function (i) {
                        var optionhtml = '<option value="' + result.d[i].id + '">' + result.d[i].status + '</option>';
                        $("#ddlStatus").append(optionhtml);
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
    Reminder.SitePath = $("#hdnSitePath").val();
    $(".tablinks").removeClass('active');
    $(".ancReminderClaims").addClass('active');
    Reminder.claimMode = "approved";
    Reminder.BindDealers();
    Reminder.BindNatureofClaims();
    Reminder.BindStatus();   
    Reminder.GetCompanyClaimsListing();
    // Get the modal
    var modal = document.getElementById('myModal');
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    $(document).on('click', ".clsViewDetails", function () {
        
        var HOclaimId = $(this).attr('Id');
        localStorage.setItem('CompanyclaimId', HOclaimId);
        window.location.href = Reminder.SitePath + "Views/IFFCO/CompanyClaimDetails.aspx";
    });

    $(document).on('click', ".clsAllReminders", function () {
        var claimId = $(this).attr('Id');

        localStorage.setItem('reminderClaimId', claimId);
        window.location.href = Reminder.SitePath + "Views/IFFCO/ViewReminders.aspx";
    });
    $(document).on('click', ".clsReminder", function () {
        
        Reminder.ClaimId = $(this).attr('Id');
        Reminder.dealerCode = $(this).attr('dealercode');
        Reminder.ClaimNumber = $(this).attr('claimNo');
        Reminder.emailId = $(this).attr("emailId");

        $("#txtDealerEmail").val(Reminder.emailId);
        $("#txtClaimNo").val(Reminder.ClaimNumber);

        $(".formError").hide();
        modal.style.display = "block";
    });

    $(document).on('click', "#spnClose", function () {
        modal.style.display = "none";
    });

    $(document).on('click', "#btnSaveClaimNo", function () {
        var HasError = false;
        if ($("#form1").validationEngine('validate') == true) {

            Reminder.reminderDesc = $("#txtReminderDesc").val();
            Reminder.SaveReminder();
        }
        else {
            HasError = false;
        }
    });


    $(document).on('click', '#btnSearch', function () {
        Reminder.searchKeyword = $("#txtsearchKeyword").val();
        Reminder.GetCompanyClaimsListing();
    });
    $("#txtsearchKeyword").keypress(function (e) {
        if ($("#txtsearchKeyword").val() == '') {
            Reminder.searchKeyword = '';
        }
        if (e.keyCode == 13) {
            Reminder.searchKeyword = $("#txtsearchKeyword").val();
            $("#ddlPerPagelist").val('10');
            Reminder.PageSize = 10;
            Reminder.GetCompanyClaimsListing();
            return false;
        }
    });

    //*********change page size click************
    $("#ddlPerPagelist").change(function () {
        Reminder.pageNumber = 1;
        Reminder.pageSize = $("#ddlPerPagelist").val();
        Reminder.GetCompanyClaimsListing();
        return false;
    });
});