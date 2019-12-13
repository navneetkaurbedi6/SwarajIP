using SwarajInsurancePortalBL.Common;
using SwarajInsurancePortalBL.Services.IFFCO;
using SwarajInsurancePortalBO.Models;
using SwarajInsurancePortalBO.Models.IFFCO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SwarajInsurancePortal.Views.IFFCO
{
    public partial class CompanyClaimDetails : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod(EnableSession = true)]
        public static int UpdateCompanyStatus(int status, int claimId, List<CompanyRemarksModel> CompanyRemarksListing)
        {
            int result = 0;
            if (HttpContext.Current.Session != null)
            {
                result = new CompanyClaimDetailsBL().UpdateCompanyStatus(status, claimId, CompanyRemarksListing);
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
                    if (status == 5)
                    {
                        subject = "InsurancePortal: Claim Approved By Insurance Company.";
                        message = "Claim Approved By Insurance Company.";
                    }
                    else
                    {
                        subject = "InsurancePortal: Claim sent back for updation.";
                        message = "Claim sent back for updation.";
                    }

                    bool mail = Utility.sendingMail(subject, toEmails, message);
                }
            }
            return result;
        }

        [WebMethod(EnableSession = true)]
        public static int Acknowledge(int claimId)
        {
            int result = 0;
            if (HttpContext.Current.Session != null)
            {
                result = new CompanyClaimDetailsBL().Acknowledge(claimId);
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


                    string subject = "InsurancePortal: Company Acknowldeged";
                    string message = "All the documents are received.";


                    bool mail = Utility.sendingMail(subject, toEmails, message);
                }
            }
            return result;
        }
    }
}