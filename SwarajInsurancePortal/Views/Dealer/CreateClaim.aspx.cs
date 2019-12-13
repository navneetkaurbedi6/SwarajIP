using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using SwarajInsurancePortalBO.Models.Dealer;
using SwarajInsurancePortalBL.Services.Dealer;
using SwarajInsurancePortalBL.Common;
using SwarajInsurancePortalBO.Models;

namespace SwarajInsurancePortal.Views.Dealer
{
    public partial class CreateClaim : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        /// <summary>
        /// GetNatureOfClaims
        /// </summary>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public static List<NatureofClaimsModel> GetNatureOfClaims()
        {
            List<NatureofClaimsModel> lstclaims = new List<NatureofClaimsModel>();
            if (HttpContext.Current.Session != null)
            {
                lstclaims = new CreateClaimBL().GetNatureOfClaims();
            }
   
            return lstclaims;
        }

        /// <summary>
        /// InsertClaim
        /// </summary>
        /// <param name="id"></param>
        /// <param name="employeeId"></param>
        /// <param name="employeeName"></param>
        /// <param name="employeeDOAccident"></param>
        /// <param name="employeePlaceofAccident"></param>
        /// <param name="employeePhone"></param>
        /// <param name="employeeNatureofClaim"></param>
        /// <param name="employeeLateRemarks"></param>
        /// <param name="employeeEstimatedCost"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public static int InsertClaim(int id, string employeeId, string employeeName, string employeeDOAccident, string employeePlaceofAccident,
                                      string employeePhone, string employeeNatureofClaim, string employeeLateRemarks, decimal employeeEstimatedCost = 0)
        {
            try
            {
                int result = 0;
                string dealerCode = Convert.ToString(HttpContext.Current.Session["DealerCode"]);
                ClaimModel objModel = new ClaimModel
                {
                    id = id,
                    dealerCode = dealerCode,
                    employeeId = employeeId,
                    employeeName = employeeName,
                    employeeDOAccident = employeeDOAccident,
                    employeePlaceofAccident = employeePlaceofAccident,
                    employeePhone = employeePhone,
                    employeeNatureofClaim = employeeNatureofClaim,
                    employeeEstimatedCost = employeeEstimatedCost,
                    employeeLateRemarks = employeeLateRemarks
                };


                if (HttpContext.Current.Session != null)
                {
                    result = new CreateClaimBL().CreateClaim(objModel);

                    if (result == 1)
                    {
                        CommonFunction objFunction = new CommonFunction();
                        CommonModel objBO = new CommonModel();
                        int claimId = 0;
                        objBO = objFunction.GetEmailsForSend(claimId);
                        string toHOEmails = string.Empty;
                        string toCompanyEmails = string.Empty;
                        string toEmails = string.Empty;


                        foreach (var item in objBO.HoMailss)
                        {
                            toHOEmails = string.Join(",", item.emailId);
                        }
                        foreach (var item in objBO.companyMails)
                        {
                            toCompanyEmails = string.Join(",", item.emailId);
                        }
                        toEmails = toHOEmails + "," + toCompanyEmails;


                        string subject = "InsurancePortal: Claim Submitted";
                        string message = "New Claim sub,itted by :" + dealerCode + "of" + employeeName;

                        bool mail = Utility.sendingMail(subject, toEmails, message);

                    }

                }
                return result;
            }
            catch (Exception ex)
            {

                throw ex;
            }


        }

    }
}