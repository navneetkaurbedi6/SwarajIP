var ClaimDetails = {
    SitePath: '',
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json;charset=utf-8',
    claimId: '',
    CompanyRemarksModel: [],
    //---------------DropDown Nature of Claims----------//
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
    //---------------Get Claim Details By ID------------//
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
            error: function (result) {
                console.error(result.responseText);
            }
        });
        return false;
    },
    //---------------Get Documents CheckList-------------//
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
    //---------------Bind Data to grid--------------------// 
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
                //PageList += '<td><input counter="' + i + '" id="txtCompanyRemarks' + i + '" class="sanction-textbox clsCompanyRemarks" documentId="' + result[i].id + '"  type="text"></td>';
                //PageList += '<td><input counter="' + i + '" id="txtCourierDetails' + i + '" class="sanction-textbox clsCourierDetails"  documentId="' + result[i].id + '" disabled type="text">';


                PageList += '<td><textarea counter="' + i + '" id="txtRemarks' + i + '" class="sanction-textbox clsUserRemarks" documentId="' + result[i].id + '" disabled="true" type="text"></textarea></td>';
                PageList += '<td><textarea counter="' + i + '" id="txtHORemarks' + i + '" class="sanction-textbox clsHORemarks" documentId="' + result[i].id + '" disabled="true" type="text"></textarea></td>';
                PageList += '<td><textarea counter="' + i + '" id="txtCompanyRemarks' + i + '" class="sanction-textbox clsCompanyRemarks" documentId="' + result[i].id + '"  type="text"></textarea></td>';
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
    //------------Get Upload Documents by ClaimId-------// 
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
                    if (result.d.status == 1) {
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
                                $("#btnSaveRemarks").hide();
                                $("#btnSendBack").hide();
                            }
                            if (result.d.claimStatus == 4) {
                                $("#btnSaveRemarks").show();
                            }
                            else if (result.d.claimStatus == 3) {
                                $("#btnSaveRemarks").hide();
                            }
                            else if (result.d.claimStatus == 5) {
                                $("#btnSaveRemarks").hide();
                                $("#btnSendBack").hide();
                                $(".clsCompanyRemarks").prop("disabled", "disabled");
                            }
                            else if (result.d.claimStatus == 6) {
                                $("#btnSaveRemarks").hide();
                                $("#btnSendBack").hide();
                                $(".clsCompanyRemarks").prop("disabled", "disabled");
                            }
                            else if (result.d.claimStatus == 7) {
                                $("#btnAcknowledge").show();
                                $("#btnSaveRemarks").hide();
                                $("#btnSendBack").hide();
                                $(".clsCompanyRemarks").prop("disabled", "disabled");
                            }
                            else if (result.d.claimStatus == 8) {
                                $("#btnAcknowledge").hide();
                                $("#btnSaveRemarks").hide();
                                $("#btnSendBack").hide();
                                $(".clsCompanyRemarks").prop("disabled", "disabled");
                            }
                            else {
                                $("#btnSaveRemarks").hide();
                                $("#btnSendBack").hide();
                            }
                        }
                        else {
                            $("#divdocumentTable").html('Not Uploaded yet!');
                            $("#btnSaveRemarks").hide();
                            $("#btnSendBack").hide();
                        }
                    }
                    else {
                        $("#divdocumentTable").html('Not Uploaded yet!');
                        $("#btnSaveRemarks").hide();
                        $("#btnSendBack").hide();
                    }
                }
                else {
                    $("#divdocumentTable").html('Not Uploaded yet!');
                    $("#btnSaveRemarks").hide();
                    $("#btnSendBack").hide();
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
    //---------------Update Company Status--------------// 
    UpdateCompanyStatus: function () {
        var d =
        {

            status: ClaimDetails.status,
            claimId: ClaimDetails.claimId,
            CompanyRemarksListing: ClaimDetails.CompanyRemarksModel
        };
        $.ajax({
            type: "POST",
            url: ClaimDetails.SitePath + "Views/IFFCO/CompanyClaimDetails.aspx/UpdateCompanyStatus",
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
                            var mode = "tracked";
                            localStorage.setItem("mode", mode);
                            window.location.href = ClaimDetails.SitePath + "Views/IFFCO/CompanyClaimsListing.aspx";
                        },50);
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
    },
    //---------------Acknowledge-----------------------//
    Acknowledge: function () {
        var d =
        {
            claimId: ClaimDetails.claimId
        };
        $.ajax({
            type: "POST",
            url: ClaimDetails.SitePath + "Views/IFFCO/CompanyClaimDetails.aspx/Acknowledge",
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
                            var mode = "tracked";
                            localStorage.setItem("mode", mode);
                            window.location.href = ClaimDetails.SitePath + "Views/IFFCO/CompanyClaimsListing.aspx";
                        },50);
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
};
$(function () {
    ClaimDetails.SitePath = $("#hdnSitePath").val();
    $(".tablinks").removeClass('active');
    $(".anPendingClaims").addClass('active');
    ClaimDetails.BindNatureofClaims();
    ClaimDetails.claimId = localStorage.getItem('CompanyclaimId');

    if (ClaimDetails.claimId != null && ClaimDetails.claimId != "") {
        ClaimDetails.GetDocumentsCheckList();
        ClaimDetails.GetClaimDetailsById();
        ClaimDetails.GetUploadedDocumentsByClaimId();
    }
    else {
        window.location.href = ClaimDetails.SitePath + "Views/IFFCO/CompanyClaimsListing.aspx";
    }

    $(document).on('click', '#btnBackToListing', function () {
        localStorage.removeItem('CompanyclaimId');
        window.location.href = ClaimDetails.SitePath + "Views/IFFCO/CompanyClaimsListing.aspx";
    });

    $(document).on('click', '#btnSendBack', function () {

        ClaimDetails.status = 6;
        var count = $(".clsHORemarks").length;
        ClaimDetails.CompanyRemarksModel = [];
        for (var i = 0; i < count; i++) {
            var currentdocumentId = $("#txtCompanyRemarks" + i).attr("documentId");
            var currentCompanyRemarks = $("#txtCompanyRemarks" + i).val();

            var obj = {
                documentId: currentdocumentId,
                CompanyRemarks: currentCompanyRemarks
            };
            ClaimDetails.CompanyRemarksModel.push(obj);
        }
        ClaimDetails.UpdateCompanyStatus();
    });

    $(document).on('click', '#btnSaveRemarks', function () {
        ClaimDetails.status = 5;
        var count = $(".clsHORemarks").length;
        ClaimDetails.CompanyRemarksModel = [];
        for (var i = 0; i < count; i++) {
            var currentdocumentId = $("#txtCompanyRemarks" + i).attr("documentId");
            var currentCompanyRemarks = $("#txtCompanyRemarks" + i).val();

            var obj = {
                documentId: currentdocumentId,
                CompanyRemarks: currentCompanyRemarks
            };
            ClaimDetails.CompanyRemarksModel.push(obj);
        }
        ClaimDetails.UpdateCompanyStatus();
    });

    //$(document).on('click', '#btnAcknowledge', function () {
    //    ClaimDetails.Acknowledge();
    //});

    // confirmation
    $('#btnAcknowledge').on('click', function () {
        $.confirm({
            'title': 'Confirmation',
            'message': 'You are acknowledging that you have recieved all the documents sent by claimer. Are you sure, you want to acknowledge?',
            'buttons': {
                'Yes': {
                    'class': 'blue',
                    'action': function () {
                        ClaimDetails.Acknowledge();
                    }
                },
                'No': {
                    'class': 'gray',
                    'action': function () { }  // Nothing to do in this case. You can as well omit the action property.
                }
            }
        });
    });

});