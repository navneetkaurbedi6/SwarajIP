<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="ManpowerListing.aspx.cs" Inherits="SwarajInsurancePortal.Views.Dealer.ManpowerListing" %>



<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <script src="../../Scripts/Custom/Dealer/ManpowerListing.js"></script>
    <div id="manpower" style="display: block;" class="tabcontent upload-tab">
        <div class="current_bg renewal_bg upload-bg">
            <h4>Man Power Listing</h4>
            <div class="search">             
                <input id="txtsearchKeyword" class="" placeholder="Search by Name,Role,Phone Number,Policy No."  type="text">
                <input class="" id="btnSearch" value="Search" type="button">
            </div>
            <div class="reponsive-table  upload-bg">
                <table>
                    <thead>
                        <tr>
                            <th style="width: 100px;">Name</th>
                            <th style="width: 100px;">Gender</th>
                            <th style="width: 100px;">Policy No.</th>
                            <th style="width: 100px;">Nominee</th>
                            <th style="width: 100px;">Nominee Relationship</th>
                            <th style="width: 100px;">Phone Number</th>
                            <th style="width: 100px;">DOB</th>
                            <th style="width: 100px;">Location</th>
                            <th style="width: 100px;">Dealership Name</th>
                            <th style="width: 100px;">Dealer Code</th>
                            <th style="width: 100px;">Role</th>
                            <th style="width: 150px;">Action</th>
                        </tr>
                    </thead>
                    <tbody id="tbodyManpowerListing">
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

            <!-- Middle Form Ends -->
        </div>
        <!-- Profile Tabs Ends -->
    </div>
</asp:Content>
