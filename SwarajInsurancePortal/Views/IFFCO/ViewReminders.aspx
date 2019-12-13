<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="ViewReminders.aspx.cs" Inherits="SwarajInsurancePortal.Views.IFFCO.ViewReminders" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <script src="../../Scripts/Custom/IFFCO/ViewReminder.js"></script>

    <div id="claimsListing" style="display: block;" class="tabcontent upload-tab">
        <div class="current_bg renewal_bg upload-bg">
            <h4>Reminders</h4>

            <div class="reponsive-table  upload-bg">

                <table>
                    <thead>
                        <tr>
                            <th style="width: 200px;">Claim Number</th>
                            <th style="width: 200px;">Dealer Code</th>
                            <th style="width: 200px;">EmailId</th>
                            <th style="width: 200px;">Messsage</th>
                            <th style="width: 200px;">Date</th>
                            <th style="width: 200px;">Action</th>
                        </tr>
                    </thead>
                    <tbody id="tbodyReminders">
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
                <div id="divPaging" class="dvPaging">
                </div>
                <div id="divPageSize" class="dvpageSize" style="margin-top: -12px;">
                    <span id="spnPageSize" class="spnPageSize">Records/Page:</span>
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
        </div>


        <!-- Middle Form Ends -->
    </div>
    <!-- Profile Tabs Ends -->

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
