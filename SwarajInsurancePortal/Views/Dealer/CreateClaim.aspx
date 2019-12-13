<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="CreateClaim.aspx.cs" Inherits="SwarajInsurancePortal.Views.Dealer.CreateClaim" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <link href="../../Content/jquery.datetimepicker.css" rel="stylesheet" />
    <script src="../../Scripts/jquery.datetimepicker.js"></script>
    <script src="../../Scripts/Custom/Dealer/CreateClaim.js"></script>
    <div id="Claims" style="display: block;" class="tabcontent upload-tab">
        <div class="current_bg renewal_bg upload-bg">
            <h4>Create Claim</h4>

            <div class="form-list">
                <div class="form-row">
                    <div class="form-left-box">
                        <label>Name</label>
                        <input id="txtEmployeeName" class="sanction-textbox validate[required]" type="text">
                    </div>

                    <div class="form-left-box">
                        <label>Date of Accident</label>
                        <input id="txtEmployeeDOAccident" class="sanction-textbox calendar validate[required]" readonly="readonly" type="text">
                    </div>
                    <div class="form-left-box">
                        <label>Place of Accident</label>
                        <input id="txtEmployeePlaceofAccident" class="sanction-textbox validate[required]" type="text">
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
                    <div class="form-left-box" id="divLoss">
                        <%--//nav--%>
                        <label>Estimated Loss(Rs)</label>
                        <input class="sanction-textbox validate[required]" id="txtEstimatedCost" type="text">
                    </div>

                </div>
                <div class="form-row" id="divRemarks" style="display:none;">
                    <div class="form-left-box1" >
                        <label>Please provide your remarks for late submission.</label>
                        <textarea class="sanction-textbox validate[required]" id="txtLateRemarks"></textarea>
                    </div>
                </div>

            </div>



            <span class="upload-records">
                <input class="hover-blue green-btn" id="btnSaveClaim" value="Save" type="button">
                <input class="hover-blue green-btn" id="btnBackToListing" value="Back" type="button">
            </span>

            <!-- Middle Form Ends -->
        </div>
        <!-- Profile Tabs Ends -->
    </div>
</asp:Content>
