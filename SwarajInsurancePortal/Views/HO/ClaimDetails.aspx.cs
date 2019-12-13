using SwarajInsurancePortalBL.Common;
using SwarajInsurancePortalBL.Services.HO;
using SwarajInsurancePortalBO.Models;
using SwarajInsurancePortalBO.Models.HO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SwarajInsurancePortal.Views.HO
{
    public partial class ClaimDetails : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        /// <summary>
        /// RejectClaimByHO
        /// </summary>
        /// <param name="claimId"></param>
        /// <param name="HORemarksListing"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public static int RejectClaimByHO(int claimId,List<HoRemarksModel> HORemarksListing,string Reason)
        {
            int result = 0;
            if (HttpContext.Current.Session != null)
            {
                result = new HOClaimDetailsBL().RejectClaimByHO(claimId, HORemarksListing,Reason);

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


                    string subject = "InsurancePortal: Claim Rejected By HO";
                    string message = "Claim Rejected By HO";

                    bool mail = Utility.sendingMail(subject, toEmails, message);
                }
            }
            return result;
        }
    }
}