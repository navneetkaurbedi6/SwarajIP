using SwarajInsurancePortalBL.Common;
using SwarajInsurancePortalBL.Services.IFFCO;
using SwarajInsurancePortalBO.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SwarajInsurancePortal.Views.IFFCO
{
    public partial class ReminderListing : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        /// <summary>
        /// SaveReminder
        /// </summary>
        /// <param name="dealerCode"></param>
        /// <param name="claimId"></param>
        /// <param name="claimNo"></param>
        /// <param name="dealerEmail"></param>
        /// <param name="reminderDesc"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public static int SaveReminder(string dealerCode, int claimId, string claimNo, string dealerEmail, string reminderDesc)
        {
            int result = 0;
            if (HttpContext.Current.Session != null)
            {
                result = new ReminderListingBL().SaveReminder(dealerCode, claimId, claimNo, dealerEmail, reminderDesc);
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

                    subject = "InsurancePortal: Gentle Reminder for sending courier details.";
                    message = reminderDesc;

                    bool mail = Utility.sendingMail(subject, toEmails, message);
                }
            }
            return result;
        }
    }
}