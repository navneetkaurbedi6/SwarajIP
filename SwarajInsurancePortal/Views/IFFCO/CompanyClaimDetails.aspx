<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="CompanyClaimDetails.aspx.cs" Inherits="SwarajInsurancePortal.Views.IFFCO.CompanyClaimDetails" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <style>
        .error-message {
            color: red;
            font-weight: 500;
            float: left;
            margin: 0 0 0 25px;
        }

        .head-Register {
            border-bottom: 1px solid #dcdcdc;
            font-size: 18px;
            font-weight: 500;
            padding: 0 77px 4px !important;
            text-align: right !important;
            text-transform: capitalize;
        }
    </style>
    <link href="../../Content/jquery.datetimepicker.css" rel="stylesheet" />
    <link href="../../Content/css/jquery.confirm.css" rel="stylesheet" />

    <script src="../../Scripts/jquery.datetimepicker.js"></script>
    <script src="../../Scripts/Plugin/jquery.confirm.js"></script>

    <script src="../../Scripts/Custom/IFFCO/CompanyClaimDetails.js"></script>
    <div id="Claims" style="display: block;" class="tabcontent upload-tab">
        <div class="current_bg renewal_bg upload-bg">

            <h4>Claim Id - <span id="spnClaimId"></span></h4>
            <div class="form-list">
                <div class="form-row">
                    <div class="form-left-box">
                        <label>Name</label>
                        <input id="txtEmployeeName" class="sanction-textbox validate[required]" type="text">
                    </div>

                    <div class="form-left-box">

                        <label>Date of Accident</label>
                        <input id="txtEmployeeDOAccident" class="sanction-textbox calendar validate[required]" type="text">
                    </div>
                    <div class="form-left-box">
                        <label>Place of Accident</label>
                        <input id="txtEmployeePlaceofLeaving" class="sanction-textbox validate[required]" type="text">
                    </div>
                    <div class="form-left-box">
                        <label>Mobile No.</label>
                        <input id="txtEmployeePhone" class="sanction-textbox validate[required]" type="text">
                    </div>
                </div>
               <div class="form-row">
                    <div class="form-left-box">
                        <label>Nature of Claim</label>
                        <select class="select-textbox validate[required]" id="ddlNatureofClaim">
                        </select>
                    </div>
                    <div class="form-left-box" style="display:none" id="divLoss">
                        <label>Estimated Loss(Rs)</label>
                        <input class="sanction-textbox validate[required]" id="txtEstimatedCost" type="text">
                    </div>
                </div>
                <div class="form-row" id="divRemarks" style="display: none;">
                    <div class="form-left-box1">
                        <label>Please provide your remarks for late submission.</label>
                        <textarea class="sanction-textbox validate[required]" id="txtLateRemarks"></textarea>
                    </div>
                </div>
                 <div class="form-row" id="divRejectReason" style="display: none;">
                    <div class="form-left-box1">
                        <label>Rejection Reason</label>
                        <textarea class="sanction-textbox" id="txtRejectReason"></textarea>
                    </div>
                </div>
            </div>

            <h4>Documents Checklist</h4>

            <div class="reponsive-table  upload-bg" id="divdocumentTable">
                <table id="idtableDocuments">
                    <thead>
                        <tr>
                            <th style="width: 50px;">Sr No.</th>
                            <th style="width: 170px;">Document Name</th>
                            <th style="width: 170px;">Upload File</th>
                            <th style="width: 170px;">User Remarks</th>
                            <th style="width: 170px;">HO Remarks</th>
                            <th style="width: 170px;">Insurance Company's Remarks</th>
                            <th style="width: 170px;">Courier Details</th>


                        </tr>
                    </thead>
                    <tbody id="tbodyClaimDetailsListing">
                        <%-- <tr>
                            <td>Richa Kalia</td>
                            <td>9856214875</td>
                            <td>9856214875</td>
                            <td>
                                <input value="Create Claim" class="login" type="button"></td>
                        </tr>--%>
                    </tbody>
                </table>
            </div>

            <span class="upload-records">
                 <input class="hover-blue green-btn" id="btnSendBack" value="Send Back To User" type="button">
                <input class="hover-blue green-btn" id="btnSaveRemarks" value="Approve" type="button">
                <input class="hover-blue green-btn" id="btnAcknowledge" value="Acknowledge" type="button" style="display:none;">
                <input class="hover-blue green-btn" id="btnBackToListing" value="Back" type="button">             

            </span>

            <!-- Middle Form Ends -->
        </div>
    <!-- Profile Tabs Ends -->
    </div>
</asp:Content>
