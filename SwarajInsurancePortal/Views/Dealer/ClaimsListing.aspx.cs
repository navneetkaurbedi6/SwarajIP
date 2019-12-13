using SwarajInsurancePortalBO.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using SwarajInsurancePortalBL.Services.Dealer;
using SwarajInsurancePortalBL.Common;

namespace SwarajInsurancePortal.Views.Dealer
{
    public partial class ClaimsListing : System.Web.UI.Page
    {
        public static string _SitePath = "";
        protected void Page_Load(object sender, EventArgs e)
        {
            _SitePath = Utility.SitePath();
        }
        /// <summary>
        /// GetClaimsListing
        /// </summary>
        /// <param name="natureofClaim"></param>
        /// <param name="status"></param>
        /// <param name="pageNumber"></param>
        /// <param name="pageSize"></param>
        /// <param name="sort"></param>
        /// <param name="dealerCode"></param>
        /// <param name="searchKeyword"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public static List<ClaimsListingModel> GetClaimsListing(int natureofClaim, string status, string pageNumber, string pageSize, string sort, string dealerCode, string searchKeyword)
        {

            dealerCode = Convert.ToString(HttpContext.Current.Session["DealerCode"]);
            List<ClaimsListingModel> lstClaims = new List<ClaimsListingModel>();
            if (HttpContext.Current.Session != null)
            {
                lstClaims = new ClaimsListingBL().GetClaimsListing(natureofClaim, status, pageNumber, pageSize, sort, dealerCode, searchKeyword);
            }
            return lstClaims;
        }

    }
}