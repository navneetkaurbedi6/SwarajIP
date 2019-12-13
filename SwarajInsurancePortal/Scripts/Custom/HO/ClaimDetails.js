var ClaimDetails = {
    SitePath: '',
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json;charset=utf-8',
    claimId: '',
    HoRemarksModel: [],
    totalDays: 0,
    reason: '',
    //-----------------------DropDown Binding of Nature of Claims------------------------//
    BindNatureofClaims: function () {
        $.ajax({
            type: "POST",
            url: ClaimDetails.SitePath + "Views/Dealer/CreateClaim.aspx/GetNatureOfClaims",
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
    },
    //-----------------------DropDown Binding of Nature of Claims------------------------//
    GetClaimDetailsById: function () {
        var d =
        {
            claimId: ClaimDetails.claimId
        };
        $.ajax({
            type: "POST",
            url: ClaimDetails.SitePath + "Views/Dealer/DocumentUploads.aspx/GetClaimDetailsById",
            data: JSON.stringify(d),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {
                $('.ajax-loader').css("visibility", "visible");
            },
            success: function (result) {
                if (result.d != null) {
                    $("#spnClaimId").text(result.d.ClaimId);
                    $("#txtEmployeeName").val(result.d.Name);
                    $("#txtEmployeeDOAccident").val(result.d.DateOfAccident);
                    $("#txtEmployeePlaceofLeaving").val(result.d.PlaceofAccident);
                    $("#txtEmployeePhone").val(result.d.MobileNo);
                    $("#ddlNatureofClaim").val(result.d.NatureofClaim);
                    $("#txtEstimatedCost").val(result.d.EstimatedCost);

                    if (result.d.HORejectReason != "" && result.d.HORejectReason != null) {
                        $("#divRejectReason").show();
                        $("#txtRejectReason").val(result.d.HORejectReason);
                    }
                    else {
                        $("#divRejectReason").hide();
                    }


                    ClaimDetails.totalDays = result.d.totalDays;

                    if (ClaimDetails.totalDays > 7) {
                        if ($(".toast-error").length == 0) {
                            toastr.error('Claim has completed 7 days.It is preapproved now.');
                        }
                        $("#btnRejectClaim").hide();
                    }

                    if (result.d.NatureofClaim == 1) {
                        $("#divLoss").show();
                        $("#txtEstimatedCost").val(result.d.EstimatedCost);
                    }
                    else {
                        $("#divLoss").hide();
                    }

                    if (result.d.lateRemarks != null && result.d.lateRemarks != "") {
                        $("#divRemarks").show();
                        $("#txtLateRemarks").val(result.d.lateRemarks);
                    }
                    else {
                        $("#divRemarks").hide();
                    }

                    $("#txtEmployeeName").prop('disabled', true);
                    $("#txtEmployeeDOAccident").prop('disabled', true);
                    $("#txtEmployeePlaceofLeaving").prop('disabled', true);
                    $("#txtEmployeePhone").prop('disabled', true);
                    $("#ddlNatureofClaim").prop('disabled', true);
                    $("#txtEstimatedCost").prop('disabled', true);
                    $("#txtLateRemarks").prop('disabled', true);

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
    //-----------------------Get Documents Checklist------------------------//
    GetDocumentsCheckList: function () {

        $.ajax({
            type: "POST",
            url: ClaimDetails.SitePath + "Views/Dealer/DocumentUploads.aspx/GetDocumentsCheckList",
            //data: JSON.stringify(d),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {
                $('.ajax-loader').css("visibility", "visible");
            },
            success: function (result) {

                if (result.d != null) {
                    ClaimDetails.BindDataToGrid(result.d);
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
    //-----------------------Binding Data into Grid------------------------//
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
                PageList += '<td>' + parseInt(i + 1) + '</td>';
                PageList += '<td style="text-align: left;">' + result[i].documentName + '</td>';

                PageList += '<td id="tdFileUpload' + i + '" class="tdclsFileUpload" style="display:none;"><input counter="' + i + '" value = "Upload" id="file' + i + '" documentName="' + result[i].docAbbrevation + '" documentId="' + result[i].id + '" class="clsDocumentList" type = "file" />';
                PageList += '<div><span id="spnerror' + i + '" class="error-message"></span></td></div>';
                PageList += '<td id="tdFileName' + i + '" class="tdclsFileName" style="display:none;"><a target="_blank" href="" id="ancFileName' + i + '"><span id="spnAnchor' + i + '"></span></a></td>';
                //PageList += '<td><input counter="' + i + '" id="txtRemarks' + i + '" class="sanction-textbox clsUserRemarks" documentId="' + result[i].id + '" disabled="true" type="text"></td>';
                //PageList += '<td><input counter="' + i + '" id="txtHORemarks' + i + '" class="sanction-textbox clsHORemarks" documentId="' + result[i].id + '" disabled="true" type="text"></td>';
                //PageList += '<td><input counter="' + i + '" id="txtCompanyRemarks' + i + '" class="sanction-textbox clsCompanyRemarks" disabled="true" type="text"></td>';
                //PageList += '<td><input counter="' + i + '" id="txtCourierDetails' + i + '" class="sanction-textbox clsCourierDetails"  documentId="' + result[i].id + '" disabled type="text">';

                PageList += '<td><textarea counter="' + i + '" id="txtRemarks' + i + '" class="sanction-textbox clsUserRemarks" documentId="' + result[i].id + '" disabled="true" type="text"></textarea></td>';
                PageList += '<td><textarea counter="' + i + '" id="txtHORemarks' + i + '" class="sanction-textbox clsHORemarks" documentId="' + result[i].id + '" disabled="true" type="text"></textarea></td>';
                PageList += '<td><textarea counter="' + i + '" id="txtCompanyRemarks' + i + '" class="sanction-textbox clsCompanyRemarks" disabled="true" type="text"></textarea></td>';
                PageList += '<td><textarea counter="' + i + '" id="txtCourierDetails' + i + '" class="sanction-textbox clsCourierDetails"  documentId="' + result[i].id + '" disabled type="text"></textarea>';
                PageList += '<div><span id="spnerrorCourier' + i + '" class="error-message"></span></td></div>';
            }
            $("#tbodyClaimDetailsListing").html("");
            $("#tbodyClaimDetailsListing").html(PageList);
        }
        else {
            PageList += '<tr>';
            PageList += '<td colspan="10" align="center"><div style="text-align: center"><label>No Records Found</label></div></td>';
            $("#tbodyClaimDetailsListing").html("");
            $("#tbodyClaimDetailsListing").html(PageList);
        }
    },
    //-----------------------Get All the uploaded documents by Claim Id------------------------//
    GetUploadedDocumentsByClaimId: function () {
        var d =
        {
            claimId: ClaimDetails.claimId
        };
        $.ajax({
            type: "POST",
            url: ClaimDetails.SitePath + "Views/Dealer/DocumentUploads.aspx/GetUploadedDocumentsByClaimId",
            data: JSON.stringify(d),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {
                $('.ajax-loader').css("visibility", "visible");
            },
            success: function (result) {
                if (result.d.isDraft == false) {
                    if (result.d.claimId > 0) {

                        setTimeout(function () {
                            for (var i = 0; i < result.d.documentLists.length; i++) {
                                if (result.d.documentLists[i].fileName != null) {
                                    $(".tdclsFileUpload").hide();
                                    $(".tdclsFileName").show();
                                    $("#file" + i).removeClass("clsDocumentList");
                                    $("#ancFileName" + i).attr("href", result.d.documentLists[i].filePath);
                                    $("#spnAnchor" + i).html(result.d.documentLists[i].fileName);
                                    $("#txtRemarks" + i).val(result.d.documentLists[i].remarks);
                                    $("#txtHORemarks" + i).val(result.d.documentLists[i].HORemarks);
                                    $("#txtCompanyRemarks" + i).val(result.d.documentLists[i].CompanyRemarks);
                                    $("#txtCourierDetails" + i).val(result.d.documentLists[i].courierDetails);

                                }
                                else {
                                    $(".tdclsFileUpload").show();
                                    $(".tdclsFileName").hide();
                                }
                            }
                        }, 2000);

                        if (result.d.claimStatus == 1) {
                            $("#btnRejectClaim").show();
                            $(".clsHORemarks").prop("disabled", false);
                        }
                        else if (result.d.claimStatus == 4) {
                            $("#btnRejectClaim").show();
                            $(".clsHORemarks").prop("disabled", false);
                        }
                        else if (result.d.claimStatus == 3) {
                            $("#btnRejectClaim").hide();
                            $(".clsHORemarks").prop("disabled", true);
                        }
                    }
                    else {
                        $("#divdocumentTable").html('Not Uploaded yet!');
                        $("#btnRejectClaim").show();

                        var status = localStorage.getItem('HOStatusId');

                        if (status == 3) {
                            $("#btnRejectClaim").hide();
                        }
                    }
                }
                else {
                    $("#divdocumentTable").html('Not Uploaded yet!');
                    $("#btnRejectClaim").show();

                    var status = localStorage.getItem('HOStatusId');

                    if (status == 3) {
                        $("#btnRejectClaim").hide();
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
    //-----------------------Rejecting Claim by HO------------------------//
    RejectClaimByHO: function () {
        var d =
        {
            claimId: ClaimDetails.claimId,
            HORemarksListing: ClaimDetails.HoRemarksModel,
            Reason: ClaimDetails.reason
        };
        $.ajax({
            type: "POST",
            url: ClaimDetails.SitePath + "Views/HO/ClaimDetails.aspx/RejectClaimByHO",
            data: JSON.stringify(d),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {
                $('.ajax-loader').css("visibility", "visible");
            },
            success: function (result) {
                if (result.d != null) {
                    if (result.d == 1) {
                        if ($(".toast-error").length == 0) {
                            toastr.options.timeOut = 1000;
                            toastr.success('Data Saved Successfully.');
                        }
                        setTimeout(function () {
                            var mode = "rejectedHO";
                            localStorage.setItem("mode", mode);
                            window.location.href = ClaimDetails.SitePath + "Views/HO/HOClaimsListing.aspx";
                        }, 1000);
                    }
                }
                else {
                    if ($(".toast-error").length == 0) {
                        toastr.error('Something went wrong!');
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
    }

};
$(function () {
    ClaimDetails.SitePath = $("#hdnSitePath").val();
    $(".tablinks").removeClass('active');
    $(".ancHOClaims").addClass('active');
    ClaimDetails.BindNatureofClaims();
    ClaimDetails.claimId = localStorage.getItem('HOclaimId');

    if (ClaimDetails.claimId != null && ClaimDetails.claimId != "") {
        ClaimDetails.GetDocumentsCheckList();
        ClaimDetails.GetClaimDetailsById();

        ClaimDetails.GetUploadedDocumentsByClaimId();


    }
    else {
        window.location.href = ClaimDetails.SitePath + "Views/HO/HOClaimsListing.aspx";
    }

    $(document).on('click', '#btnBackToListing', function () {
        localStorage.removeItem('HOclaimId');
        window.location.href = ClaimDetails.SitePath + "Views/HO/HOClaimsListing.aspx";
    });

    //$(document).on('click', '#btnRejectClaim', function () {
    //  

    //    var count = $(".clsHORemarks").length;
    //    ClaimDetails.HoRemarksModel = [];
    //    for (var i = 0; i < count; i++) {
    //        var currentdocumentId = $("#txtRemarks" + i).attr("documentId");
    //        var currentHORemarks = $("#txtHORemarks" + i).val();

    //        var obj = {
    //            documentId: currentdocumentId,
    //            HORemarks: currentHORemarks
    //        };
    //        ClaimDetails.HoRemarksModel.push(obj);
    //    }
    //    ClaimDetails.RejectClaimByHO();
    //});

    //nav
    $(document).on('click', '#btnSaveRejectReason', function () {
        if ($('#txtReason').val() == "") {
            $('#spnRejecterror').html('This field is required');
            $("#spnRejecterror").show();
            return false;
        }
        else {
            ClaimDetails.reason = $('#txtReason').val();
            var count = $(".clsHORemarks").length;
            ClaimDetails.HoRemarksModel = [];
            for (var i = 0; i < count; i++) {
                var currentdocumentId = $("#txtRemarks" + i).attr("documentId");
                var currentHORemarks = $("#txtHORemarks" + i).val();

                var obj = {
                    documentId: currentdocumentId,
                    HORemarks: currentHORemarks,
                };
                ClaimDetails.HoRemarksModel.push(obj);
            }
            ClaimDetails.RejectClaimByHO();
        }
    });

});