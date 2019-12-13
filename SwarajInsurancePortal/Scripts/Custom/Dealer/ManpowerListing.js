var ManpowerListing = {
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
    //-----------------------Manpower Listing------------------------//
    GetManpowerListing: function () {
        var d =
        {
            pageNumber: ManpowerListing.pageNumber,
            pageSize: ManpowerListing.pageSize,
            sort: ManpowerListing.sort,
            dealerCode: ManpowerListing.dealerCode,
            searchKeyword: ManpowerListing.searchKeyword,
            status: ManpowerListing.status
        };
        $.ajax({
            type: "POST",
            url: ManpowerListing.SitePath + "Views/Dealer/ManpowerListing.aspx/GetManpowerListing",
            data: JSON.stringify(d),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {
                $('.ajax-loader').css("visibility", "visible");
            },
            success: function (result) {
                if (result.d != null) {
                    localStorage.removeItem("manInsured");
                    ManpowerListing.BindDataToGrid(result.d);
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
    //-----------------------Binding Data to Grid------------------------//
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
                PageList += '<td>' + result[i].Name + '</td>';
                PageList += '<td>' + result[i].Gender + '</td>';
                PageList += '<td>' + result[i].PolicyNo + '</td>';
                PageList += '<td>' + result[i].Nominee + '</td>';
                PageList += '<td>' + result[i].NomineeRelationship + '</td>';
                PageList += '<td>' + result[i].PhoneNumber + '</td>';
                PageList += '<td>' + result[i].DOB + '</td>';
                PageList += '<td>' + result[i].Location + '</td>';
                PageList += '<td>' + result[i].DealershipName + '</td>';
                PageList += '<td>' + result[i].DealerCode + '</td>';
                PageList += '<td>' + result[i].Role + '</td>';

                if (result[i].PolicyNo == "&nbsp;") {
                    PageList += '<td>Not Insured</td >';

                }
                else {
                    PageList += '<td><input value = "Create Claim" id="' + result[i].Id + '" policy ="' + result[i].PolicyNo + '" name="' + result[i].Name + '" phone="' + result[i].PhoneNumber + '" class="login clsCreateClaim" type = "button" /></td >';

                }

            }
            $("#tbodyManpowerListing").html("");
            $("#tbodyManpowerListing").html(PageList);

            $("#divpageSize").show();
            $("#divPaging").show();
            ManpowerListing.Total = result[0].Total;
            ManpowerListing.pageSize =  $("#ddlPerPagelist").val();
            ManpowerListing.NumberOfPages = parseInt(Math.ceil(ManpowerListing.Total / ManpowerListing.pageSize));


        }
        else {
            PageList += '<tr>';
            PageList += '<td colspan="10" align="center"><div style="text-align: center"><label>No Records Found</label></div></td>';
            $("#tbodyManpowerListing").html("");
            $("#tbodyManpowerListing").html(PageList);

            ManpowerListing.Total = 0;
            ManpowerListing.pageSize =  $("#ddlPerPagelist").val();
            ManpowerListing.NumberOfPages = 0;
            $("#divpageSize").hide();
            $("#divPaging").hide();
        }

        /*Pagination*/
        if (parseInt(ManpowerListing.NumberOfPages) > 1) {
            $("#divPaging, #divpageSize").show();
            var displayPage = 4;
            if (ManpowerListing.NumberOfPages < displayPage) {
                displayPage = ManpowerListing.NumberOfPages;
            }
            if (ManpowerListing.pageNumber > ManpowerListing.NumberOfPages) {
                ManpowerListing.pageNumber = ManpowerListing.NumberOfPages;
            }

            $("#divPaging").paginate({
                count: ManpowerListing.NumberOfPages,
                start: ManpowerListing.pageNumber,
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
                    ManpowerListing.pageNumber = page;
                    ManpowerListing.GetManpowerListing();
                }
            });
            var jPagWidth = parseInt($(".jPag-pages").css("width"));
            $(".jPag-pages").css("width", jPagWidth + 1000);
        }

        else if (parseInt(ManpowerListing.NumberOfPages) == 1) {
            $("#divPaging").hide();
            $("#divPageSize").hide();
        }
        else {
            $("#divPaging").hide();
            $("#divpageSize").hide();
        }
    }
};
$(function () {
    ManpowerListing.SitePath = $("#hdnSitePath").val();
    $(".tablinks").removeClass('active');
    $(".ancManpower").addClass('active');

    ManpowerListing.status = localStorage.getItem("manInsured");

    if (ManpowerListing.status == null && ManpowerListing.status == undefined) {
        ManpowerListing.status = 0;
    }


    ManpowerListing.GetManpowerListing();

    $(document).on('click', '.clsCreateClaim', function () {
        var employeeId = $(this).attr('id');
        var employeeName = $(this).attr('name');
        var employeephone = $(this).attr('phone');
        var employeepolicyNo = $(this).attr('policy');


        localStorage.setItem('employeeId', employeeId);
        localStorage.setItem('employeeName', employeeName);
        localStorage.setItem('employeephone', employeephone);
        localStorage.setItem('employeepolicyNo', employeepolicyNo);


        window.location.href = ManpowerListing.SitePath + "Views/Dealer/CreateClaim.aspx?redirect=true";

    });
    $(document).on('click', '#btnSearch', function () {
        ManpowerListing.searchKeyword = $("#txtsearchKeyword").val();
        ManpowerListing.GetManpowerListing();
    });
    $("#txtsearchKeyword").keypress(function (e) {
        if ($("#txtsearchKeyword").val() == '') {
            ClaimsListing.searchKeyword = '';
        }
        if (e.keyCode == 13) {
            ManpowerListing.searchKeyword = $("#txtsearchKeyword").val();
            $("#ddlPerPagelist").val('10');
            ManpowerListing.PageSize = 10;
            ManpowerListing.GetManpowerListing();
            return false;
        }
    });


    //*********change page size click************
    $("#ddlPerPagelist").change(function () {
        ManpowerListing.pageNumber = 1;
        ManpowerListing.pageSize = $("#ddlPerPagelist").val();
        ManpowerListing.GetManpowerListing();
        return false;
    });
});