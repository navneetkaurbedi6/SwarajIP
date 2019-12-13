using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SwarajInsurancePortalDA.Common
{
    public class DbConstant
    {
        #region Login
        public const string Usp_Login = "Usp_Login";
        #endregion

        #region Dealer
        public const string Usp_GetManpowerListing = "Usp_GetManpowerListing";
        public const string Usp_GetNatureofClaims = "Usp_GetNatureofClaims";
        public const string Usp_CreateClaim = "Usp_CreateClaim";
        public const string Usp_GetClaimsListing = "Usp_GetClaimsListing";
        public const string Usp_GetDashboardCounts = "Usp_GetDashboardCounts";
        public const string Usp_GetDocumentsCheckList = "Usp_GetDocumentsCheckList";
        public const string Usp_GetClaimDetailsById = "Usp_GetClaimDetailsById";
        public const string Usp_InsertDocuments = "Usp_InsertDocuments";
        public const string USP_GetUploadedDocuments = "USP_GetUploadedDocuments";
        public const string Usp_SavecourierDetails = "Usp_SavecourierDetails";
        public const string Usp_GetAllDealers = "Usp_GetAllDealers";
        #endregion


        #region HO
        public const string Usp_GetHOClaimsListing = "Usp_GetHOClaimsListing";
        public const string Usp_RejectClaimByHO = "Usp_RejectClaimByHO";
        public const string Usp_GetDashboardCounts_HO = "Usp_GetDashboardCounts_HO";        
        #endregion


        #region IFFCO
        public const string Usp_GetCompanyClaimsListing = "Usp_GetCompanyClaimsListing";
        public const string Usp_SaveClaimId = "Usp_SaveClaimId";
        public const string Usp_UpdateStatusByCompany = "Usp_UpdateStatusByCompany";
        public const string Usp_SaveAcknowledgement = "Usp_SaveAcknowledgement";
        public const string USP_SaveReminder = "USP_SaveReminder";
        public const string Usp_GetAllReminders = "Usp_GetAllReminders";       
        #endregion


        #region Common
        public const string Usp_GetEmailsForSend = "Usp_GetEmailsForSend";
        public const string Usp_GetDealerListing = "Usp_GetDealerListing";
        public const string Usp_GetAllStatus = "Usp_GetAllStatus";
        public const string Usp_GetFinancialYears = "Usp_GetFinancialYears";      

        #endregion
    }
}
