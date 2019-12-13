using SwarajInsurancePortalBL.Common;
using SwarajInsurancePortalBL.Services.Dealer;
using SwarajInsurancePortalBO.Models;
using SwarajInsurancePortalBO.Models.Dealer;
using SwarajInsurancePortalBO.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Formatting;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SwarajInsurancePortal.Views.Dealer
{
    public partial class DocumentUploads : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        /// <summary>
        /// GetDocumentsCheckList
        /// </summary>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public static List<DocumentsListModel> GetDocumentsCheckList()
        {
            List<DocumentsListModel> lstclaims = new List<DocumentsListModel>();
            if (HttpContext.Current.Session != null)
            {
                lstclaims = new DocumentUploadsBL().GetDocumentsCheckList();
            }
            return lstclaims;
        }
        /// <summary>
        /// GetClaimDetailsById
        /// </summary>
        /// <param name="claimId"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public static ClaimDetailsModel GetClaimDetailsById(int claimId)
        {
            ClaimDetailsModel objClaimDetails = new ClaimDetailsModel();
            if (HttpContext.Current.Session != null)
            {
                objClaimDetails = new DocumentUploadsBL().GetClaimDetailsById(claimId);
            }
            return objClaimDetails;
        }
        /// <summary>
        /// GetUploadedDocumentsByClaimId
        /// </summary>
        /// <param name="claimId"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public static UserDocumentsModel GetUploadedDocumentsByClaimId(int claimId)
        {
            UserDocumentsModel lstdocuments = new UserDocumentsModel();
            if (HttpContext.Current.Session != null)
            {
                lstdocuments = new DocumentUploadsBL().GetUploadedDocumentsByClaimId(claimId);
            }
            return lstdocuments;
        }
        /// <summary>
        /// SaveCourierDetails
        /// </summary>
        /// <param name="claimId"></param>
        /// <param name="courierDetailsLiting"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public static int SaveCourierDetails(int claimId, List<CourierDetailsModel> courierDetailsLiting)
        {
            int result = 0;
            if (HttpContext.Current.Session != null)
            {
                result = new DocumentUploadsBL().SaveCourierDetails(claimId, courierDetailsLiting);
                if (result == 1)
                {
                    CommonFunction objFunction = new CommonFunction();
                    CommonModel objBO = new CommonModel();

                    objBO = objFunction.GetEmailsForSend(claimId);

                    string toEmails = string.Empty;
                    string toCompanyEmails = string.Empty;
                    string toDealerEmails = string.Empty;


                    foreach (var item in objBO.companyMails)
                    {
                        toCompanyEmails = string.Join(",", item.emailId);
                    }
                    foreach (var item in objBO.dealerMails)
                    {
                        toDealerEmails = string.Join(",", item.emailId);
                    }

                    toEmails = toDealerEmails + "," + toCompanyEmails;
                    string subject = string.Empty;
                    string message = string.Empty;

                    subject = "InsurancePortal: Claim Approved By Insurance Company.";
                    message = "Claim Approved By Insurance Company.";


                    bool mail = Utility.sendingMail(subject, toEmails, message);
                }
            }
            return result;
        }
    }
}