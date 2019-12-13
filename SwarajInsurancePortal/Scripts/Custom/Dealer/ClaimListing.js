var ClaimsListing = {
    SitePath: '',
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json;charset=utf-8',
    pageSize:10,
    numberOfPages: 0,
    total: 0,
    pageNumber: 1,
    search: '',
    displayPage: '4',
    flag: '',
    sort: '',
    dealerCode: '',
    searchKeyword: '',
    claimMode: '',
    status:'',
    natureOfClaim: 0,
    //-----------------------Listing of Claims------------------------//
    GetClaimsListing: function () {
        ClaimsListing.natureofClaim = $("#ddlClaimNature").val();
        if (ClaimsListing.natureofClaim == "") {
            ClaimsListing.natureofClaim = 0;
        }

        var d =
        {
            natureofClaim: parseInt(ClaimsListing.natureofClaim),
            status: ClaimsListing.claimMode,
            pageNumber: ClaimsListing.pageNumber,
            pageSize: ClaimsListing.pageSize,
            sort: ClaimsListing.sort,
            dealerCode: ClaimsListing.dealerCode,
            searchKeyword: ClaimsListing.searchKeyword
        };
        $.ajax({
            type: "POST",
            url: Login.SitePath + "Views/Dealer/ClaimsListing.aspx/GetClaimsListing",
            data: JSON.stringify(d),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {
                $('.ajax-loader').css("visibility", "visible");
            },
            success: function (result) {
                if (result.d != null) {
                    ClaimsListing.BindDataToGrid(result.d);
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

    //-----------------------Binding to Grid------------------------//
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
                PageList += '<td>' + result[i].Name + '</td>';
                PageList += '<td>' + result[i].DateOfAccident + '</td>';
                PageList += '<td>' + result[i].PlaceofAccident + '</td>';
                PageList += '<td>' + result[i].MobileNo + '</td>';
                PageList += '<td>' + result[i].NatureofClaim + '</td>';
                PageList += '<td>' + result[i].EstimatedCost + '</td>';
                PageList += '<td style="font-weight: 600;color:' + result[i].color +'">' + result[i].ClaimStatus + '</td>';
                PageList += '<td>' + result[i].CreatedDate + '</td>';


                if (result[i].statusId == 1 || result[i].statusId == 2) {
                    PageList += '<td><input value = "Upload Documents" id="' + result[i].Id + '" class="login clsUploadDocs" type = "button" /></td> ';
                }
                else if (result[i].statusId == 3) {
                    PageList += '<td><input value = "Upload Documents" id="' + result[i].Id + '" class="login clsUploadDocs" type = "button" /></td> ';
                }
                else if (result[i].statusId == 4) {
                    PageList += '<td><input value = "View Details" id="' + result[i].Id + '" class="login clsUploadDocs" type = "button" /></td> ';
                }
                else if (result[i].statusId == 5) {
                    PageList += '<td><input value = "Upload Courier Details" id="' + result[i].Id + '" class="login clsUploadDocs" type = "button" /></td> ';
                }
                else if (result[i].statusId == 6) {
                    PageList += '<td><input value = "Upload Documents" id="' + result[i].Id + '" class="login clsUploadDocs" type = "button" /></td> ';
                }
                else if (result[i].statusId == 7) {
                    PageList += '<td><input value = "View Details" id="' + result[i].Id + '" class="login clsUploadDocs" type = "button" /></td> ';
                }
                else if (result[i].statusId == 8) {
                    PageList += '<td><input value = "View Details" id="' + result[i].Id + '" class="login clsUploadDocs" type = "button" /></td> ';
                }
                PageList += '</tr>';
            }
            $("#tbodyClaimsListing").html("");
            $("#tbodyClaimsListing").html(PageList);

            $("#divpageSize").show();
            $("#divPaging").show();
            ClaimsListing.total = result[0].Total;
            ClaimsListing.pageSize = $("#ddlPerPagelist").val();
            ClaimsListing.numberOfPages = parseInt(Math.ceil(ClaimsListing.total / ClaimsListing.pageSize));
        }
        else {
            PageList += '<tr>';
            PageList += '<td colspan="10" align="center"><div style="text-align: center"><label>No Records Found</label></div></td>';
            $("#tbodyClaimsListing").html("");
            $("#tbodyClaimsListing").html(PageList);

            ClaimsListing.total = 0;
            ClaimsListing.pageSize = $("#ddlPerPagelist").val();
            ClaimsListing.numberOfPages = 0;
            $("#divPageSize").hide();
            $("#divPaging").hide();
        }

        /*Pagination*/
        if (parseInt(ClaimsListing.numberOfPages) > 1) {
            $("#divPaging, #divpageSize").show();
            var displayPage = 4;
            if (ClaimsListing.numberOfPages < displayPage) {
                displayPage = ClaimsListing.numberOfPages;
            }
            if (ClaimsListing.pageNumber > ClaimsListing.numberOfPages) {
                ClaimsListing.pageNumber = ClaimsListing.numberOfPages;
            }

            $("#divPaging").paginate({
                count: ClaimsListing.numberOfPages,
                start: ClaimsListing.pageNumber,
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
                    ClaimsListing.pageNumber = page;
                    ClaimsListing.GetClaimsListing();
                }
            });
            var jPagWidth = parseInt($(".jPag-pages").css("width"));
            $(".jPag-pages").css("width", jPagWidth + 1000);
        }

        else if (parseInt(ClaimsListing.numberOfPages) == 1) {
            $("#divPaging").hide();
            $("#divPageSize").hide();
        }
        else {
            $("#divPaging").hide();
            $("#divPageSize").hide();
        }
    },

    //-----------------------DropDown Binding of Nature of Claims------------------------//
    BindNatureofClaims: function () {
        $.ajax({
            type: "POST",
            url: ClaimsListing.SitePath + "Views/Dealer/CreateClaim.aspx/GetNatureOfClaims",
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
    }
};
$(function () {
    ClaimsListing.SitePath = $("#hdnSitePath").val();
    $(".tablinks").removeClass('active');

    ClaimsListing.claimMode = localStorage.getItem("mode");

    if (ClaimsListing.claimMode == "claims") {
        $(".ancClaims").addClass('active');
    }
    else if (ClaimsListing.claimMode == "rejectedDealer") {
        $(".ancRejectedClaims").addClass('active');
    }
    else  {
        $(".ancClaims").addClass('active');
    }

    ClaimsListing.BindNatureofClaims();
    ClaimsListing.GetClaimsListing();

    $(document).on('click', '.clsUploadDocs', function () {

        var claimId = $(this).attr('Id');

        localStorage.setItem('claimId', claimId);

        window.location.href = ClaimsListing.SitePath + "Views/Dealer/DocumentUploads.aspx?redirect=true";
    });

    $(document).on('click', '#btnSearch', function () {
        ClaimsListing.searchKeyword = $("#txtsearchKeyword").val();
        ClaimsListing.GetClaimsListing();
    });

    $("#txtsearchKeyword").keypress(function (e) {
        if ($("#txtsearchKeyword").val() == '') {
            ClaimsListing.searchKeyword = '';
        }
        if (e.keyCode == 13) {
            ClaimsListing.searchKeyword = $("#txtsearchKeyword").val();
            $("#ddlPerPagelist").val('10');
            ClaimsListing.PageSize = 10;
            ClaimsListing.GetClaimsListing();
            return false;
        }
    });

    //*********change page size click************
    $("#ddlPerPagelist").change(function () {
        ClaimsListing.pageNumber = 1;
        ClaimsListing.pageSize = $("#ddlPerPagelist").val();
        ClaimsListing.GetClaimsListing();
        return false;
    });

});