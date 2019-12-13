ViewReminder = {
    SitePath: '',
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json;charset=utf-8',
    pageSize: 5,
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
    emailId: '',
    claimMode: '',
    reminderDesc: '',
    //------------Get All Reminders--------//
    GetAllReminders: function () {
        var d =
        {
            claimId: ViewReminder.claimId,
            pageNumber: ViewReminder.pageNumber,
            pageSize: ViewReminder.pageSize,
            sort: ViewReminder.sort,
            dealerCode: ViewReminder.dealerCode,
            searchKeyword: ViewReminder.searchKeyword
        };
        $.ajax({
            type: "POST",
            url: ViewReminder.SitePath + "Views/IFFCO/ViewReminders.aspx/GetAllReminders",
            data: JSON.stringify(d),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result.d != null) {
                    ViewReminder.BindDataToGrid(result.d);
                }
            },
            error: function (result) {
                console.error(result.responseText);
            }
        });
        return false;
    },
    //------------Bind Data To Grid-------//
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
                PageList += '<td style="font-weight: 600;">' + result[i].claimNo + '</td>';
                PageList += '<td>' + result[i].dealerCode + '</td>';
                PageList += '<td>' + result[i].dealerEmail + '</td>';
                PageList += '<td>' + result[i].reminderDescription + '</td>';
                PageList += '<td>' + result[i].createdDate + '</td>';
                PageList += '<td><input value="Resend" claimId="' + result[i].claimId + '" claimNo="' + result[i].claimNo + '" dealerCode="' + result[i].dealerCode + '" dealerEmail="' + result[i].dealerEmail + '"  reminderDescription="' + result[i].reminderDescription + '" class="login clsResend" type="button" /></td>';
                PageList += '</tr>';
            }
            $("#tbodyReminders").html("");
            $("#tbodyReminders").html(PageList);

            $("#divpageSize").show();
            $("#divPaging").show();
            ViewReminder.Total = result[0].Total;
            ViewReminder.pageSize = $("#ddlPerPagelist").val();
            ViewReminder.NumberOfPages = parseInt(Math.ceil(ViewReminder.Total / ViewReminder.pageSize));
        }
        else {
            PageList += '<tr>';
            PageList += '<td colspan="10" align="center"><div style="text-align: center"><label>No Records Found</label></div></td>';
            $("#tbodyReminder").html("");
            $("#tbodyReminder").html(PageList);

            ViewReminder.Total = 0;
            ViewReminder.pageSize = $("#ddlPerPagelist").val();
            ViewReminder.NumberOfPages = 0;
            $("#divpageSize").hide();
            $("#divPaging").hide();
        }

        /*Pagination*/
        if (parseInt(ViewReminder.NumberOfPages) > 1) {
            $("#divPaging, #divpageSize").show();
            var displayPage = 4;
            if (ViewReminder.NumberOfPages < displayPage) {
                displayPage = ViewReminder.NumberOfPages;
            }
            if (ViewReminder.pageNumber > ViewReminder.NumberOfPages) {
                ViewReminder.pageNumber = ViewReminder.NumberOfPages;
            }

            $("#divPaging").paginate({
                count: ViewReminder.NumberOfPages,
                start: ViewReminder.pageNumber,
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
                    ViewReminder.pageNumber = page;
                    ViewReminder.GetAllReminders();
                }
            });
            var jPagWidth = parseInt($(".jPag-pages").css("width"));
            $(".jPag-pages").css("width", jPagWidth + 1000);
        }

        else if (parseInt(ViewReminder.NumberOfPages) == 1) {
            $("#divPaging").hide();
            $("#divPageSize").hide();
        }
        else {
            $("#divPaging").hide();
            $("#divpageSize").hide();
        }
    },
    //--------Send Reminder------------//
    SendReminder: function () {
        var d =
        {
            dealerCode: ViewReminder.dealerCode,
            claimId: ViewReminder.ClaimId,
            claimNo: ViewReminder.ClaimNumber,
            dealerEmail: ViewReminder.emailId,
            reminderDesc: ViewReminder.reminderDesc
        };
        $.ajax({
            type: "POST",
            url: ViewReminder.SitePath + "Views/IFFCO/ReminderListing.aspx/SaveReminder",
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

                            ViewReminder.GetAllReminders();
                        }, 2000);
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
    }
};s

$(function () {
    ViewReminder.SitePath = $("#hdnSitePath").val();
    $(".tablinks").removeClass('active');
    $(".ancReminderClaims").addClass('active');
    ViewReminder.claimId = localStorage.getItem('reminderClaimId');
    ViewReminder.GetAllReminders();
    $(document).on('click', ".clsResend", function () {

        ViewReminder.ClaimId = $(this).attr('claimId');
        ViewReminder.dealerCode = $(this).attr('dealerCode');
        ViewReminder.ClaimNumber = $(this).attr('claimNo');
        ViewReminder.emailId = $(this).attr("dealerEmail");
        ViewReminder.reminderDesc = $(this).attr("reminderDescription");
        ViewReminder.SendReminder();
    });
    //*********change page size click************
    $("#ddlPerPagelist").change(function () {
        ViewReminder.pageNumber = 1;
        ViewReminder.pageSize = $("#ddlPerPagelist").val();
        ViewReminder.GetAllReminders();
        return false;
    });
});