﻿<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="CompanyClaimsListing.aspx.cs" Inherits="SwarajInsurancePortal.Views.IFFCO.CompanyClaimsListing" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <script src="../../Scripts/Custom/IFFCO/CompanyClaimListing.js"></script>

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
                <%--   <table>
                    <tr>
                        <td style="width: 100px;"></td>
                        <td style="width: 100px;">
                            <select class="select-textbox validate[required]" id="ddlDealerCode"></select></td>
                        <td style="width: 170px;">
                            <input type="text" class="sanction-textbox" /></td>
                        <td style="width: 67px;"></td>
                        <td style="width: 67px;"></td>
                        <td style="width: 100px;"></td>
                        <td style="width: 100px;">
                            <select class="select-textbox validate[required]" id="ddlDealerCode"></select></td>
                        <td style="width: 100px;"></td>
                        <td style="width: 100px;">
                            <select class="select-textbox validate[required]" id="ddlDealerCode"></select></td>
                        <td style="width: 100px;">
                            <input type="text" class="sanction-textbox" /></td>
                        <td style="width: 150px;"></td>
                    </tr>
                </table>--%>
                <table>
                    <thead>
                        <tr>
                            <th style="width: 151px;">Claim Id</th>
                            <th style="width: 100px;">Dealer Code</th>
                            <th style="width: 121px;">Name</th>
                            <th style="width: 67px;">Date of Accident</th>
                            <th style="width: 67px;">Place of Accident</th>
                            <th style="width: 100px;">Mobile No</th>
                            <th style="width: 100px;">Nature of Claim</th>
<%--                            //nav--%>
                            <th style="width: 100px;">Estimated Loss(Rs)</th>
                            <th style="width: 100px;">Claim Status</th>
                            <th style="width: 100px;">Created Date</th>
                            <th style="width: 114px;" id="thRegister">Register Claim</th>
                            <th style="width: 150px;">Action</th>
                        </tr>
                    </thead>
                    <tbody id="tbodyCompanyClaimsListing">
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

    <!-- The Modal -->
    <div id="myModal" class="modal">

        <!-- Modal content -->
        <div class="modal-content">
            <span id="spnClose" class="close">&times;</span>
            <h4>Register Claim Number</h4>
            <div class="">
                <div class="form-row">
                    <div class="form-left-box1">
                        <label>Dealer Code : <span id="spnDealerCode"></span></label>
                        <label>Employee Name : <span id="spnEmployeeName"></span></label>
                        <%--//nav--%>
                        <label>Estimated Loss(Rs) : <span id="spnLoss"></span></label>
                        <label>Nature of Claim : <span id="spnClamNature"></span></label>

                    </div>
                </div>
                <div class="form-row">
                    <div class="form-left-box1">
                        <label>Enter Claim Number</label>
                        <input id="txtClaimNumber" class="sanction-textbox validate[required]" type="text">
                    </div>
                </div>
            </div>
            <span class="upload-records">
                <input class="hover-blue green-btn" id="btnSaveClaimNo" value="SAVE" type="button">
            </span>

        </div>
    </div>
</asp:Content>
