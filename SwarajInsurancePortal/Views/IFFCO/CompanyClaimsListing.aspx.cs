using SwarajInsurancePortalBO.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using SwarajInsurancePortalBL.Services.IFFCO;

namespace SwarajInsurancePortal.Views.IFFCO
{
    public partial class CompanyClaimsListing : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [WebMethod(EnableSession = true)]
        public static List<ClaimsListingModel> GetCompanyClaimsListing(int natureofClaim, int claimStatus, string status,string pageNumber, string pageSize, string sort, string dealerCode, string searchKeyword)
        {

            //dealerCode = Convert.ToString(HttpContext.Current.Session["DealerCode"]);
            List<ClaimsListingModel> lstClaims = new List<ClaimsListingModel>();
            if (HttpContext.Current.Session != null)
            {
                lstClaims = new CompanyClaimsListingBL().GetCompanyClaimsListing( natureofClaim,  claimStatus, status,pageNumber, pageSize, sort, dealerCode, searchKeyword);
            }
            return lstClaims;
        }
        [WebMethod(EnableSession = true)]
        public static int SaveClaimId(int claimId,string registerNumber)
        {
            int result = 0;
            if (HttpContext.Current.Session != null)
            {
                result = new CompanyClaimsListingBL().SaveClaimId(claimId, registerNumber);
            }
            return result;
        }
    }
}