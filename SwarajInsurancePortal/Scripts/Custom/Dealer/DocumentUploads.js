var documents = {
    SitePath: '',
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json;charset=utf-8',
    claimId: '',
    flag: 0,
    idCounters: [],
    totalDocuments: [],
    courierDetailsModel: [],
    //-----------------------Validation Check before Insertion------------------------//
    CheckValidation: function () {
        var HasError = false;
        if (documents.flag == 0) {

            var count = $(".clsDocumentList").length;

            $(".clsDocumentList").each(function () {
                var counter = $(this).attr("counter");
                var fileUp = $("#file" + counter)[0].files[0];
                if (fileUp == undefined) {
                    HasError = true;
                    $('#spnerror' + counter).html('This field is required');
                    $('#spnerror' + counter).show();
                }
            });

            //for (var i = 0; i < count; i++) {
            //    var fileUp = $("#file" + i)[0].files[0];
            //    if (fileUp == undefined) {
            //        HasError = true;
            //        $('#spnerror' + i).html('This field is required');
            //    }
            //}


            if (HasError == false) {
                documents.SaveUploadedDocuments();
            }
        }
        else {
            var count1 = documents.idCounters.length;

            for (var j = 0; j < count1; j++) {
                var fileUp2 = $("#file" + documents.idCounters[j])[0].files[0];
                if (fileUp2 == undefined) {
                    HasError = true;
                    $('#spnerror' + documents.idCounters[j]).html('This field is required');
                }
            }
            if (HasError == false) {
                documents.SaveUploadedDocuments();
            }
        }


    },
    //-----------------------Validation Check before inserting Courier Details------------------------//
    CheckCourierValidation: function () {
        var HasError = false;
        var count = $(".clsCourierDetails").length;
        for (var i = 0; i < count; i++) {
            var fileUp = $("#txtCourierDetails" + i).val();
            if (fileUp == "") {
                HasError = true;
                $('#spnerrorCourier' + i).html('This field is required');
            }
        }
        if (HasError == false) {
            documents.courierDetailsModel = [];
            for (var j = 0; j < count; j++) {
                var currentdocumentId = $("#txtCourierDetails" + j).attr("documentId");
                var currentCourierDetails = $("#txtCourierDetails" + j).val();

                var obj = {
                    documentId: currentdocumentId,
                    courierDetails: currentCourierDetails
                };
                documents.courierDetailsModel.push(obj);
            }
            documents.SaveCourierDetails();
        }

    },
    //-----------------------DropDown Binding of Nature of Claims------------------------//
    BindNatureofClaims: function () {
        $.ajax({
            type: "POST",
            url: documents.SitePath + "Views/Dealer/CreateClaim.aspx/GetNatureOfClaims",
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
    //-----------------------Get Claim Details By Id------------------------//
    GetClaimDetailsById: function () {
        var d =
        {
            claimId: documents.claimId
        };
        $.ajax({
            type: "POST",
            url: documents.SitePath + "Views/Dealer/DocumentUploads.aspx/GetClaimDetailsById",
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
    //-----------------------Get Documents Checklist------------------------//
    GetDocumentsCheckList: function () {

        $.ajax({
            type: "POST",
            url: documents.SitePath + "Views/Dealer/DocumentUploads.aspx/GetDocumentsCheckList",
            //data: JSON.stringify(d),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {
                $('.ajax-loader').css("visibility", "visible");
            },
            success: function (result) {
                if (result.d != null) {
                    documents.BindDataToGrid(result.d);
                    documents.totalDocuments.push(result.d);
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
                    PageList += '<tr counter="' + i + '" documentId="' + result[i].id + '"  style="background: rgb(238, 242, 248);">';
                }
                else {
                    PageList += '<tr  counter="' + i + '" documentId="' + result[i].id + '">';
                }
                PageList += '<td>' + parseInt(i + 1) + '</td>';
                PageList += '<td style="text-align: left;">' + result[i].documentName + '</td>';

                PageList += '<td id="tdFileUpload' + i + '" class="tdclsFileUpload""><input counter="' + i + '"  name="fileUp" value = "Upload" id="file' + i + '" documentName="' + result[i].docAbbrevation + '" documentId="' + result[i].id + '" class="clsDocumentList" type = "file" /><a target="_blank" href="" id="ancFileName' + i + '"><span id="spnAnchor' + i + '"></span></a> <i id="idClose' + i + '" counter="' + i + '" class="fa fa-close clsDeleteUpload" style="cursor: pointer;display:none;"></i>';
                PageList += '<div><span id="spnerror' + i + '" class="error-message"></span></td></div>';
                // PageList += '<td id="tdFileName' + i + '" class="tdclsFileName" style="display:none;"><a target="_blank" href="" id="ancFileName' + i + '"><span id="spnAnchor' + i + '"></span></a> <i id="idClose' + i + '" counter="' + i + '" class="fa fa-close clsDeleteUpload"></i></td>';
                //PageList += '<td><input counter="' + i + '" id="txtRemarks' + i + '" class="sanction-textbox clsUserRemarks" type="text"></td>';
                //PageList += '<td><input counter="' + i + '" id="txtHORemarks' + i + '" class="sanction-textbox clsHORemarks" disabled type="text"></td>';
                //PageList += '<td><input counter="' + i + '" id="txtCompanyRemarks' + i + '" class="sanction-textbox clsCompanyRemarks" disabled type="text"></td>';
                // PageList += '<td><input counter="' + i + '" id="txtCourierDetails' + i + '" class="sanction-textbox clsCourierDetails"  documentId="' + result[i].id + '" disabled type="text">';

                PageList += '<td><textarea counter="' + i + '" id="txtRemarks' + i + '" class="sanction-textbox clsUserRemarks"></textarea></td>';
                PageList += '<td><textarea counter="' + i + '" id="txtHORemarks' + i + '" class="sanction-textbox clsHORemarks" disabled type="text"></textarea></td>';
                PageList += '<td><textarea counter="' + i + '" id="txtCompanyRemarks' + i + '" class="sanction-textbox clsCompanyRemarks" disabled type="text"></textarea></td>';
                PageList += '<td><textarea counter="' + i + '" id="txtCourierDetails' + i + '" class="sanction-textbox clsCourierDetails"  documentId="' + result[i].id + '" disabled type="text"></textarea></td>';
                PageList += '<div><span id="spnerrorCourier' + i + '" class="error-message"></span></td></div>';

            }
            $("#tbodyDocumentsListing").html("");
            $("#tbodyDocumentsListing").html(PageList);
        }
        else {
            PageList += '<tr>';
            PageList += '<td colspan="10" align="center"><div style="text-align: center"><label>No Records Found</label></div></td>';
            $("#tbodyDocumentsListing").html("");
            $("#tbodyDocumentsListing").html(PageList);
        }
    },
    //-----------------------Get All the uploaded documents by Claim Id------------------------//
    GetUploadedDocumentsByClaimId: function () {
        var d =
        {
            claimId: documents.claimId
        };
        $.ajax({
            type: "POST",
            url: documents.SitePath + "Views/Dealer/DocumentUploads.aspx/GetUploadedDocumentsByClaimId",
            data: JSON.stringify(d),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {
                $('.ajax-loader').css("visibility", "visible");
            },
            success: function (result) {
                var rowCount = $('#tbodyDocumentsListing tr').length;
                if (result.d.claimId > 0) {
                    setTimeout(function () {
                        $('#tbodyDocumentsListing tr').each(function () {
                            var docId = $(this).attr('documentId');
                            var counter = $(this).attr('counter');
                            for (var i = 0; i < result.d.documentLists.length; i++) {
                                if (docId == result.d.documentLists[i].documentId) {
                                    if (result.d.documentLists[i].fileName != null && result.d.documentLists[i].fileName != "") {
                                        $("#ancFileName" + counter).show();
                                        $("#file" + counter).hide();
                                        $("#file" + counter).removeClass("clsDocumentList");
                                        $("#ancFileName" + counter).attr("href", result.d.documentLists[i].filePath);
                                        $("#spnAnchor" + counter).html(result.d.documentLists[i].fileName);
                                        $("#txtRemarks" + counter).val(result.d.documentLists[i].remarks);
                                        $("#txtHORemarks" + counter).val(result.d.documentLists[i].HORemarks);
                                        $("#txtCompanyRemarks" + counter).val(result.d.documentLists[i].CompanyRemarks);
                                        $("#txtCourierDetails" + counter).val(result.d.documentLists[i].courierDetails);
                                        $("#idClose" + counter).show();
                                    }
                                    else {
                                        $("#file" + counter).show();
                                        $("#idClose" + counter).hide();
                                    }
                                }
                            }
                        });

                    }, 1000);
                }
                else {
                    $(".tdclsFileUpload").show();
                    $(".tdclsFileName").hide();
                }

                setTimeout(function () {
                    if (result.d.claimStatus == 0) {
                        $("#btnSaveAsDraft").show();
                        $(".clsDeleteUpload").hide();
                    }
                    else if (result.d.claimStatus == 1) {
                        $("#btnSaveAsDraft").show();

                    }
                    else if (result.d.claimStatus == 4) {
                        $("#btnSaveAsDraft").hide();
                        $("#btnUploadDocs").hide();
                        $(".clsUserRemarks").prop("disabled", true);
                        $(".clsDeleteUpload").hide();
                    }
                    else if (result.d.claimStatus == 3) {
                        $("#btnSaveAsDraft").show();
                        $("#btnUploadDocs").show();
                    }
                    else if (result.d.claimStatus == 5) {
                        // setTimeout(function () {
                        $("#btnSaveAsDraft").hide();
                        $("#btnUploadDocs").hide();
                        $("#btnSaveCourierDetails").show();
                        $(".clsCourierDetails").prop("disabled", false);
                        $(".clsUserRemarks").prop("disabled", "disabled");
                        //}, 1010);

                    }
                    else if (result.d.claimStatus == 6) {
                        $("#btnSaveAsDraft").show();
                        $("#btnUploadDocs").show();
                        $("#btnSaveCourierDetails").hide();
                        $(".clsCourierDetails").prop("disabled", "disabled");
                        $(".clsUserRemarks").prop("disabled", false);
                    }
                    else if (result.d.claimStatus == 7) {
                        $("#btnSaveAsDraft").hide();
                        $("#btnUploadDocs").hide();
                        $("#btnSaveCourierDetails").show();
                        $(".clsCourierDetails").prop("disabled", false);
                        $(".clsUserRemarks").prop("disabled", "disabled");
                    }
                    else if (result.d.claimStatus == 8) {
                        $("#btnSaveAsDraft").hide();
                        $("#btnUploadDocs").hide();
                        $("#btnSaveCourierDetails").hide();
                        $(".clsCourierDetails").prop("disabled", "disabled");
                        $(".clsUserRemarks").prop("disabled", "disabled");
                    }
                    else {
                        $("#btnSaveAsDraft").show();
                        $("#btnUploadDocs").show();
                    }
                }, 1200);

                $(".error-message").hide();
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
    //-----------------------Save uploded documents------------------------//
    SaveUploadedDocuments: function () {
        var rowCount = $('#idtableDocuments tr').length - 1;
        var formData = new FormData();
        var theGuid = $.guid++;

        for (var i = 0; i < rowCount; i++) {
            var fileUp = $("#file" + i)[0].files[0];
            var documentId = $("#file" + i).attr('documentId');
            var documentName = $("#file" + i).attr('documentName');
            var remarks = $("#txtRemarks" + i).val();

            formData.append('file', $("#file" + i)[0].files[0]);

            if ($("#file" + i)[0].files[0] != undefined) {
                formData.append('documentId', documentId);
                formData.append('documentName', documentName);
                formData.append('remarks', remarks);
            }
        }
        formData.append('claimId', documents.claimId);
        formData.append('isDraft', documents.IsDraft);

        var formFields = document.getElementById('form1').elements;
        var count = formFields['fileUp'].length;
        var hasFile = false;
        for (var i = 0; i < count; i++) {
            if (formFields['fileUp'][i].files.length) {
                hasFile = true;
            }
        }

        if (hasFile == true) {
            $.ajax({
                type: 'POST',
                url: documents.SitePath + "Handler/ImageUpload.ashx",
                data: formData,
                contentType: false,
                processData: false,
                beforeSend: function () {
                    $('.ajax-loader').css("visibility", "visible");
                },
                success: function (result) {
                    if ($(".toast-error").length == 0) {
                        toastr.options.timeOut = 1000;
                        toastr.success('Data Saved Successfully.');
                        setTimeout(function () {
                            documents.GetUploadedDocumentsByClaimId();
                        }, 50);
                    }

                },
                complete: function () {
                    $('.ajax-loader').css("visibility", "hidden");
                },
                error: function (error) {
                    alert("errror");
                }
            });
        }
        else {

            if ($(".toast-error").length == 0) {
                toastr.error('Please upload atleast one document.');
            }

        }




    },
    //-----------------------Save Courier Details------------------------//
    SaveCourierDetails: function () {
        var d =
        {
            claimId: documents.claimId,
            courierDetailsLiting: documents.courierDetailsModel
        };
        $.ajax({
            type: "POST",
            url: documents.SitePath + "Views/Dealer/DocumentUploads.aspx/SaveCourierDetails",
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
                            documents.GetUploadedDocumentsByClaimId();
                        }, 50);
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
    documents.SitePath = $("#hdnSitePath").val();
    $(".tablinks").removeClass('active');
    $(".ancClaims").addClass('active');
    documents.BindNatureofClaims();
    documents.claimId = localStorage.getItem('claimId');

    if (documents.claimId != null && documents.claimId != "") {
        documents.GetDocumentsCheckList();
        documents.GetClaimDetailsById();

        documents.GetUploadedDocumentsByClaimId();
    }
    else {
        window.location.href = documents.SitePath + "Views/Dealer/ClaimsListing.aspx";
    }

    $.guid = 0;

    $(document).on('click', '#btnUploadDocs', function () {
        documents.IsDraft = 0;
        documents.CheckValidation();
    });

    $(document).on('click', '#btnSaveAsDraft', function () {
        documents.IsDraft = 1;
        documents.SaveUploadedDocuments();
    });

    $(document).on('click', '#btnSaveCourierDetails', function () {
        var count = $(".clsCourierDetails").length;
        documents.courierDetailsModel = [];
        for (var j = 0; j < count; j++) {
            var currentdocumentId = $("#txtCourierDetails" + j).attr("documentId");
            var currentCourierDetails = $("#txtCourierDetails" + j).val();

            var obj = {
                documentId: currentdocumentId,
                courierDetails: currentCourierDetails
            };
            documents.courierDetailsModel.push(obj);
        }
        documents.SaveCourierDetails();
    });

    $(document).on('change', '.clsDocumentList', function () {
        var ext = $(this).val().split('.').pop().toLowerCase();
        if ($.inArray(ext, ['gif', 'png', 'jpg', 'jpeg', 'pdf', 'docx']) == -1) {
            if ($(".toast-error").length == 0) {
                toastr.error('Invalid Extension! Only image,pdf,docx format can be upload.');
            }
            $(this).val('');
            return false;
        }
    });

    $(document).on('click', '.clsDeleteUpload', function () {
        documents.flag = 1;
        var counter = $(this).attr('counter');
        $("#file" + counter).show();
        $("#ancFileName" + counter).hide();
        documents.idCounters.push(counter);
        $("#file" + counter).addClass("clsDocumentList2");
        $("#idClose" + counter).hide();
    });

    $(document).on('click', '#btnBackToListing', function () {
        window.location.href = documents.SitePath + "Views/Dealer/ClaimsListing.aspx";
    });
});