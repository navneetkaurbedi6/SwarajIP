<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="HODashboard.aspx.cs" Inherits="SwarajInsurancePortal.Views.HO.HODashboard" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <script src="../../Scripts/Custom/HO/HODashboard.js"></script>
    <div id="dashboard" style="display: block;" class="tabcontent upload-tab">
        <div class="current_bg renewal_bg upload-bg">
            <h4>Dashboard </h4>
            <div class="search">
                <label>Select Year</label>
                <select id="ddlFinancialYear" class="select-search">
                    <option value="">Select Financial Year</option>
                </select>
                <label>Select Dealer</label>
                <select id="ddlDealer" class="select-search">
                    <option value="">Select Dealer</option>
                </select>
                <input class="" id="btnSearch" value="Search" type="button">
            </div>

            <div class="dealer-outer">
                <div class="dealer-inner">
                    <ul>
                        <a href="ManpowerListing.aspx">
                            <li>
                                <span class="dealerimg">
                                    <img src="../../images/dashboard1.png" alt="icon" title="icon">
                                </span>
                                <span class="text1" id="spnNoofManpower"></span>
                                <span class="text2">total man power </span>
                            </li>
                        </a>
                        <a href="ManpowerListing.aspx" id="ancInsured">
                            <li>
                                <span class="dealerimg">
                                    <img src="../../images/dashboard2.png" alt="icon" title="icon">
                                </span>
                                <span class="text1" id="spnNoofManpowerInsured"></span>
                                <span class="text2">total man power<span>Insured</span></span>
                            </li>
                        </a>
                        <a id="ancClaimsCreated" href="ClaimsListing.aspx">
                            <li>
                                <span class="dealerimg">
                                    <img src="../../images/dashboard3.png" alt="icon" title="icon">
                                </span>
                                <span class="text1" id="spnNoofClaimsCreated"></span>
                                <span class="text2">Number of Claims<span>Created </span></span>
                            </li>
                        </a>
                        <a id="ancClaimsPending" href="ClaimsListing.aspx">
                            <li>
                                <span class="dealerimg">
                                    <img src="../../images/dashboard4.png" alt="icon" title="icon">
                                </span>
                                <span class="text1" id="spnNoofClaimsPending"></span>
                                <span class="text2">Number of Claims<span> in Progress</span></span>
                            </li>
                        </a>
                        <a id="ancClaimsAcknowledged" href="ClaimsListing.aspx">
                            <li>
                                <span class="dealerimg">
                                    <img src="../../images/dashboard5.png" alt="icon" title="icon">
                                </span>
                                <span class="text1" id="spnNoofClaimsAcknowledged"></span>
                                <span class="text2">Number of Claims <span>Acknowledged</span></span>
                            </li>
                        </a>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
