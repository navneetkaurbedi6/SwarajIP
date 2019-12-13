var HOClaimsListing = {
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
    status: 0,
    dealerId: '',
    GetHOClaimsListing: function () {
        HOClaimsListing.natureofClaim = $("#ddlClaimNature").val();
        if (HOClaimsListing.natureofClaim == "") {
            HOClaimsListing.natureofClaim = 0;
        }

        HOClaimsListing.dealerId = $("#ddlDealers").val();
        if (HOClaimsListing.dealerId == "") {
            HOClaimsListing.dealerId = '';
        }
        HOClaimsListing.status = $("#ddlStatus").val();
        if (HOClaimsListing.status == "") {
            HOClaimsListing.status = 0;
        }
        var d =
        {
            natureofClaim: HOClaimsListing.natureofClaim,
            claimStatus: HOClaimsListing.status,
            status: HOClaimsListing.claimMode,
            pageNumber: HOClaimsListing.pageNumber,
            pageSize: HOClaimsListing.pageSize,
            sort: HOClaimsListing.sort,
            dealerCode: HOClaimsListing.dealerId,
            searchKeyword: HOClaimsListing.searchKeyword
        };
        $.ajax({
            type: "POST",
            url: HOClaimsListing.SitePath + "Views/HO/HOClaimsListing.aspx/GetHOClaimsListing",
            data: JSON.stringify(d),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {
                $('.ajax-loader').css("visibility", "visible");
            },
            success: function (result) {
                if (result.d != null) {
                    HOClaimsListing.BindDataToGrid(result.d);
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
                PageList += '<td><input value = "View Details" id="' + result[i].Id + '" statusId ="' + result[i].statusId + '" class="login clsViewDetails" type = "button" /></td> ';
                PageList += '</tr>';
            }
            $("#tbodyHOClaimsListing").html("");
            $("#tbodyHOClaimsListing").html(PageList);

            $("#divpageSize").show();
            $("#divPaging").show();
            HOClaimsListing.Total = result[0].Total;
            HOClaimsListing.pageSize = $("#ddlPerPagelist").val();
            HOClaimsListing.NumberOfPages = parseInt(Math.ceil(HOClaimsListing.Total / HOClaimsListing.pageSize));
        }
        else {
            PageList += '<tr>';
            PageList += '<td colspan="11" align="center"><div style="text-align: center"><label>No Records Found</label></div></td>';
            $("#tbodyHOClaimsListing").html("");
            $("#tbodyHOClaimsListing").html(PageList);

            HOClaimsListing.Total = 0;
            HOClaimsListing.pageSize = $("#ddlPerPagelist").val();
            HOClaimsListing.NumberOfPages = 0;
            $("#divpageSize").hide();
            $("#divPaging").hide();
        }

        /*Pagination*/

        if (parseInt(HOClaimsListing.NumberOfPages) > 1) {
            $("#divPaging, #divpageSize").show();
            var displayPage = 4;
            if (HOClaimsListing.NumberOfPages < displayPage) {
                displayPage = HOClaimsListing.NumberOfPages;
            }
            if (HOClaimsListing.pageNumber > HOClaimsListing.NumberOfPages) {
                HOClaimsListing.pageNumber = HOClaimsListing.NumberOfPages;
            }

            $("#divPaging").paginate({
                count: HOClaimsListing.NumberOfPages,
                start: HOClaimsListing.pageNumber,
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
                    HOClaimsListing.pageNumber = page;
                    HOClaimsListing.GetHOClaimsListing();
                }
            });
            var jPagWidth = parseInt($(".jPag-pages").css("width"));
            $(".jPag-pages").css("width", jPagWidth + 1000);
        }

        else if (parseInt(HOClaimsListing.NumberOfPages) == 1) {
            $("#divPaging").hide();
            $("#divPageSize").hide();
        }
        else {
            $("#divPaging").hide();
            $("#divpageSize").hide();
        }
    },
    BindNatureofClaims: function () {
        $.ajax({
            type: "POST",
            url: HOClaimsListing.SitePath + "Views/Dealer/CreateClaim.aspx/GetNatureOfClaims",
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
    BindDealers: function () {
        $.ajax({
            type: "POST",
            url: HOClaimsListing.SitePath + "Views/HO/HOClaimsListing.aspx/GetAllDealers",
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
    BindStatus: function () {
        $.ajax({
            type: "POST",
            url: HOClaimsListing.SitePath + "Views/HO/HOClaimsListing.aspx/GetAllStatus",
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
    HOClaimsListing.SitePath = $("#hdnSitePath").val();
    $(".tablinks").removeClass('active');
    HOClaimsListing.claimMode = localStorage.getItem("mode");
    if (HOClaimsListing.claimMode == "HOClaims") {
        $(".ancHOClaims").addClass('active');
    }
    else if (HOClaimsListing.claimMode == "rejectedHO") {
        $(".ancRejectedHOClaims").addClass('active');
    }
    else{
        $(".ancHOClaims").addClass('active');
    }
    HOClaimsListing.BindNatureofClaims();
    HOClaimsListing.BindDealers();
    HOClaimsListing.BindStatus();
    HOClaimsListing.GetHOClaimsListing();
    $(document).on('click', ".clsViewDetails", function () {
        var HOclaimId = $(this).attr('Id');
        var HOStatusId = $(this).attr('statusId');



        localStorage.setItem('HOclaimId', HOclaimId);
        localStorage.setItem('HOStatusId', HOStatusId);

        window.location.href = HOClaimsListing.SitePath + "Views/HO/ClaimDetails.aspx";
    });
    $(document).on('click', '#btnSearch', function () {
        HOClaimsListing.searchKeyword = $("#txtsearchKeyword").val();
        HOClaimsListing.GetHOClaimsListing();
    });
    $("#txtsearchKeyword").keypress(function (e) {
        if ($("#txtsearchKeyword").val() == '') {
            HOClaimsListing.searchKeyword = '';
        }
        if (e.keyCode == 13) {
            HOClaimsListing.searchKeyword = $("#txtsearchKeyword").val();
            $("#ddlPerPagelist").val('10');
            HOClaimsListing.PageSize = 10;
            HOClaimsListing.GetHOClaimsListing();
            return false;
        }
    });

    //*********change page size click************
    $("#ddlPerPagelist").change(function () {
        HOClaimsListing.pageNumber = 1;
        HOClaimsListing.pageSize = $("#ddlPerPagelist").val();
        HOClaimsListing.GetHOClaimsListing();
        return false;
    });
});