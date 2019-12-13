var CompanyClaimsListing = {
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
    claimMode: '',
    status: 0,
    dealerId: '',
    //--------------- Get Company Claims Listing-------------//
    GetCompanyClaimsListing: function () {
        CompanyClaimsListing.natureofClaim = $("#ddlClaimNature").val();
        if (CompanyClaimsListing.natureofClaim == "") {
            CompanyClaimsListing.natureofClaim = 0;
        }

        CompanyClaimsListing.dealerId = $("#ddlDealers").val();
        if (CompanyClaimsListing.dealerId == "") {
            CompanyClaimsListing.dealerId = '';
        }
        CompanyClaimsListing.status = $("#ddlStatus").val();
        if (CompanyClaimsListing.status == "") {
            CompanyClaimsListing.status = 0;
        }
        var d =
        {
            natureofClaim: CompanyClaimsListing.natureofClaim,
            claimStatus: CompanyClaimsListing.status,
            status: CompanyClaimsListing.claimMode,
            pageNumber: CompanyClaimsListing.pageNumber,
            pageSize: CompanyClaimsListing.pageSize,
            sort: CompanyClaimsListing.sort,
            dealerCode: CompanyClaimsListing.dealerId,
            searchKeyword: CompanyClaimsListing.searchKeyword
        };
        $.ajax({
            type: "POST",
            url: CompanyClaimsListing.SitePath + "Views/IFFCO/CompanyClaimsListing.aspx/GetCompanyClaimsListing",
            data: JSON.stringify(d),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d != null) {
                    CompanyClaimsListing.BindDataToGrid(result.d);
                }
            },
            error: function (result) {
                console.error(result.responseText);
            }
        });
        return false;
    },
     //--------------- Binding Data to Grid-------------//
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
                PageList += '<td style="font-weight: 600;color:' + result[i].color + '">' + result[i].ClaimStatus + '</td>';
                PageList += '<td>' + result[i].CreatedDate + '</td>';

                if (result[i].ClaimId == "Not Registered") {

                    PageList += '<td><input value = "Register" id="' + result[i].Id + '" dealercode="' + result[i].DealerCode + '" name="' + result[i].Name + '" nature="' + result[i].NatureofClaim + '" loss="' + result[i].EstimatedCost + '" class="login clsRegister" type = "button" /></td> ';
                }
                else {
                    PageList += '<td>Registered</td>';

                }

                PageList += '<td><input value = "View Details" id="' + result[i].Id + '" class="login clsViewDetails" type = "button" /></td> ';
                PageList += '</tr>';
            }
            $("#tbodyCompanyClaimsListing").html("");
            $("#tbodyCompanyClaimsListing").html(PageList);

            $("#divPageSize").show();
            $("#divPaging").show();
            CompanyClaimsListing.Total = result[0].Total;
            CompanyClaimsListing.pageSize = $("#ddlPerPagelist").val();
            CompanyClaimsListing.NumberOfPages = parseInt(Math.ceil(CompanyClaimsListing.Total / CompanyClaimsListing.pageSize));
        }
        else {
            PageList += '<tr>';
            PageList += '<td colspan="12" align="center"><div style="text-align: center"><label>No Records Found</label></div></td>';
            $("#tbodyCompanyClaimsListing").html("");
            $("#tbodyCompanyClaimsListing").html(PageList);

            CompanyClaimsListing.Total = 0;
            CompanyClaimsListing.pageSize = $("#ddlPerPagelist").val();
            CompanyClaimsListing.NumberOfPages = 0;
            $("#divPageSize").hide();
            $("#divPaging").hide();
        }

        /*Pagination*/
        if (parseInt(CompanyClaimsListing.NumberOfPages) > 1) {
            $("#divPaging, #divpageSize").show();
            var displayPage = 4;
            if (CompanyClaimsListing.NumberOfPages < displayPage) {
                displayPage = CompanyClaimsListing.NumberOfPages;
            }
            if (CompanyClaimsListing.pageNumber > CompanyClaimsListing.NumberOfPages) {
                CompanyClaimsListing.pageNumber = CompanyClaimsListing.NumberOfPages;
            }

            $("#divPaging").paginate({
                count: CompanyClaimsListing.NumberOfPages,
                start: CompanyClaimsListing.pageNumber,
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
                    CompanyClaimsListing.pageNumber = page;
                    CompanyClaimsListing.GetCompanyClaimsListing();
                }
            });
            var jPagWidth = parseInt($(".jPag-pages").css("width"));
            $(".jPag-pages").css("width", jPagWidth + 1000);
        }

        else if (parseInt(CompanyClaimsListing.NumberOfPages) == 1) {
            $("#divPaging").hide();
            $("#divPageSize").hide();
        }
        else {
            $("#divPaging").hide();
            $("#divpageSize").hide();
        }
    },
     //--------------- Save ClaimId-------------//
    SaveClaimId: function () {

        var d =
        {
            claimId: CompanyClaimsListing.ClaimId,
            registerNumber: CompanyClaimsListing.ClaimNumber
        };
        $.ajax({
            type: "POST",
            url: CompanyClaimsListing.SitePath + "Views/IFFCO/CompanyClaimsListing.aspx/SaveClaimId",
            data: JSON.stringify(d),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d != null) {
                    if (result.d == 1) {
                        if ($(".toast-error").length == 0) {
                            toastr.options.timeOut = 1000;
                            toastr.success('Data Saved Successfully.');
                        }

                        setTimeout(function () {
                            $("#myModal").hide();
                            CompanyClaimsListing.GetCompanyClaimsListing();
                        }, 50);
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
     //--------------- Dropdown Binding Nature of Claims-------------//
    BindNatureofClaims: function () {
        $.ajax({
            type: "POST",
            url: CompanyClaimsListing.SitePath + "Views/Dealer/CreateClaim.aspx/GetNatureOfClaims",
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
    //--------------- Dropdown Binding Dealers-------------//
    BindDealers: function () {
        $.ajax({
            type: "POST",
            url: CompanyClaimsListing.SitePath + "Views/HO/HOClaimsListing.aspx/GetAllDealers",
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
    //--------------- Dropdown Binding Status-------------//
    BindStatus: function () {
        $.ajax({
            type: "POST",
            url: CompanyClaimsListing.SitePath + "Views/HO/HOClaimsListing.aspx/GetAllStatus",
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
    CompanyClaimsListing.SitePath = $("#hdnSitePath").val();
    $(".tablinks").removeClass('active');

    CompanyClaimsListing.claimMode = localStorage.getItem("mode");

    if (CompanyClaimsListing.claimMode == "pending") {
        $(".anPendingClaims").addClass('active');
    }
    else if (CompanyClaimsListing.claimMode == "claimed") {
        $(".ancDoneClaims").addClass('active');
    }
    else if (CompanyClaimsListing.claimMode == "rejectedCompany") {
        $(".ancRejectedCompClaims").addClass('active');
    }
    else {
        $(".ancTrackedClaims").addClass('active');
    }
    CompanyClaimsListing.BindDealers();
    CompanyClaimsListing.BindNatureofClaims();
    CompanyClaimsListing.BindStatus();
    CompanyClaimsListing.GetCompanyClaimsListing();
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
        window.location.href = CompanyClaimsListing.SitePath + "Views/IFFCO/CompanyClaimDetails.aspx";
    });

    $(document).on('click', ".clsRegister", function () {
        CompanyClaimsListing.ClaimId = $(this).attr('Id');
        var dealercode = $(this).attr('dealercode');
        var name = $(this).attr('name');
        var nature = $(this).attr('nature');
        var loss = $(this).attr('loss');

        $("#spnDealerCode").html(dealercode);
        $("#spnEmployeeName").html(name);
        $("#spnLoss").html(loss);
        $("#spnClamNature").html(nature);
        $(".formError").hide();
        modal.style.display = "block";
    });

    $(document).on('click', "#spnClose", function () {
        modal.style.display = "none";
    });

    $(document).on('click', "#btnSaveClaimNo", function () {
        var HasError = false;
        if ($("#form1").validationEngine('validate') == true) {

            CompanyClaimsListing.ClaimNumber = $("#txtClaimNumber").val();
            CompanyClaimsListing.SaveClaimId();
        }
        else {
            HasError = false;
        }
    });

    $(document).on('click', '#btnSearch', function () {
        CompanyClaimsListing.searchKeyword = $("#txtsearchKeyword").val();
        CompanyClaimsListing.GetCompanyClaimsListing();
    });
    $("#txtsearchKeyword").keypress(function (e) {
        if ($("#txtsearchKeyword").val() == '') {
            CompanyClaimsListing.searchKeyword = '';
        }
        if (e.keyCode == 13) {
            CompanyClaimsListing.searchKeyword = $("#txtsearchKeyword").val();
            $("#ddlPerPagelist").val('10');
            CompanyClaimsListing.PageSize = 10;
            CompanyClaimsListing.GetCompanyClaimsListing();
            return false;
        }
    });

    //*********change page size click************
    $("#ddlPerPagelist").change(function () {
        CompanyClaimsListing.pageNumber = 1;
        CompanyClaimsListing.pageSize = $("#ddlPerPagelist").val();
        CompanyClaimsListing.GetCompanyClaimsListing();
        return false;
    });
});