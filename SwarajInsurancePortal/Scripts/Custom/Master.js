var master = {
    SitePath: '',
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json;charset=utf-8'
};

$(function () {
    master.SitePath = $("#hdnSitePath").val();


    $(".clsTabsLink").click(function () {
        var mode = $(this).attr("id");
        localStorage.setItem("mode", mode);
    });
    $(".clstabHO").click(function () {
        var mode = $(this).attr("id");
        localStorage.setItem("mode", mode);
    });
    $(".clsDealerTabs").click(function () {
        var mode = $(this).attr("id");
        localStorage.setItem("mode", mode);
    });
});