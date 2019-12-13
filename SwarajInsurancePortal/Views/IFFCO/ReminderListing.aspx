<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="ReminderListing.aspx.cs" Inherits="SwarajInsurancePortal.Views.IFFCO.ReminderListing" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <script src="../../Scripts/Custom/IFFCO/ReminderListing.js"></script>

    <div id="claimsListing" style="display: block;" class="tabcontent upload-tab">
        <div class="current_bg renewal_bg upload-bg">
            <h4>Claims Listing</h4>
            <div class="search">

                <input id="txtsearchKeyword" class="" placeholder="Search by Claim Number,Name,Mobile Number" type="text">
                <select id="ddlDealers" class="select-search">
                    <option value="">Select Dealer</option>
                </select>
                <select id="ddlClaimNature" class="select-search">
                    <option value="">Select Nature of Claim</option>
                </select>
                <select id="ddlStatus" class="select-search">
                    <option value="">Select Status</option>
                </select>
                <input class="" id="btnSearch" value="Search" type="button">
            </div>
            <div class="reponsive-table  upload-bg">

                <table>
                    <thead>
                        <tr>
                            <th style="width: 100px;">Claim Id</th>
                            <th style="width: 100px;">Dealer Code</th>
                            <th style="width: 121px;">Name</th>
                            <th style="width: 65px;">Date of Accident</th>
                            <th style="width: 116px;">Place of Accident</th>
                            <th style="width: 100px;">Mobile No</th>
                            <th style="width: 100px;">Nature of Claim</th>
                            <%--//nav--%>
                            <th style="width: 100px;">Estimated Loss(Rs)</th>
                            <th style="width: 100px;">Claim Status</th>
                            <th style="width: 100px;">Created Date</th>
                            <th style="width: 206px;">Reminder</th>
                            <th style="width: 150px;">Action</th>
                        </tr>
                    </thead>
                    <tbody id="tbodyReminder">
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


        
                <div class="content-grid">
                    <div id="divPaging" class="dvPaging" style="margin-top: 7px;">
                    </div>
                    <div id="divPageSize" class="dvpageSize" style="margin-top: -12px;">
                        <span id="spnPageSize" class="spnPageSize">Records/Page:</span>ss

                        <select class="form-control ddlPerPage" id="ddlPerPagelist" style="margin-top: -2px; margin-left: 2px;">
                            <option value="5" selected="selected">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value="200">200</option>
                        </select>
                    </div>
                </div>
         

            <!-- Middle Form Ends -->
        </div>
        <!-- Profile Tabs Ends -->
    </div>

    <!-- The Modal -->
    <div id="myModal" class="modal">

        <!-- Modal content -->
        <div class="modal-content">
            <span id="spnClose" class="close">&times;</span>
            <h4>Send Reminder</h4>
            <div class="">
                <div class="form-list">
                    <div class="form-row">
                        <div class="form-left-box1">
                            <label>EmailId</label>
                            <input id="txtDealerEmail" class="sanction-textbox validate[required]" disabled type="text">
                        </div>

                        <div class="form-left-box1">

                            <label>Claim No.</label>
                            <input id="txtClaimNo" class="sanction-textbox validate[required]" disabled type="text">
                        </div>
                        <div class="form-left-box1">
                            <label>Reminder Description</label>
                            <textarea class="sanction-textbox validate[required]" rows="4" id="txtReminderDesc"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <span class="upload-records">
                <input class="hover-blue green-btn" id="btnSaveClaimNo" value="SAVE" type="button">
            </span>

        </div>
    </div>
</asp:Content>
