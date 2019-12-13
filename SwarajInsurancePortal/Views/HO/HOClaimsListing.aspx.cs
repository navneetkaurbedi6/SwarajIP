using SwarajInsurancePortalBO.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using SwarajInsurancePortalBL.Services.HO;
using SwarajInsurancePortalDA.Common;
using System.Data;
using SwarajInsurancePortalBL.Common;

namespace SwarajInsurancePortal.Views.HO
{
    public partial class HOClaimsListing : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        /// <summary>
        /// GetHOClaimsListing
        /// </summary>
        /// <param name="status"></param>
        /// <param name="pageNumber"></param>
        /// <param name="pageSize"></param>m
        /// <param name="sort"></param>
        /// <param name="dealerCode"></param>
        /// <param name="searchKeyword"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public static List<ClaimsListingModel> GetHOClaimsListing(int natureofClaim,int claimStatus, string status,string pageNumber, string pageSize, string sort, string dealerCode, string searchKeyword)
        {

            //dealerCode = Convert.ToString(HttpContext.Current.Session["DealerCode"]);
            List<ClaimsListingModel> lstClaims = new List<ClaimsListingModel>();
            if (HttpContext.Current.Session != null)
            {
                lstClaims = new HOClaimsListingBL().GetHOClaimsListing( natureofClaim,  claimStatus, status, pageNumber, pageSize, sort, dealerCode, searchKeyword);
            }
            return lstClaims;
        }
        /// <summary>
        /// GetAllDealers
        /// </summary>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public static List<DealerModel> GetAllDealers()
        {
            List<DealerModel> lstDealers = new List<DealerModel>();
            CommonFunction objBL = new CommonFunction();
            lstDealers = objBL.GetAllDealers();
            return lstDealers;
        }

        /// <summary>
        /// GetAllStatus
        /// </summary>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public static List<StatusModel> GetAllStatus()
        {
            List<StatusModel> lstDealers = new List<StatusModel>();
            CommonFunction objBL = new CommonFunction();
            lstDealers = objBL.GetAllStatus();
            return lstDealers;
        }
    }
}