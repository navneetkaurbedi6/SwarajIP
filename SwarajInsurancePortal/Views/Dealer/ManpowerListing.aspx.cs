using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using SwarajInsurancePortalBO.ViewModels;
using SwarajInsurancePortalBL.Services.Dealer;
using SwarajInsurancePortalBO.Models.Login;

namespace SwarajInsurancePortal.Views.Dealer
{
    public partial class ManpowerListing : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        /// <summary>
        /// GetManpowerListing
        /// </summary>
        /// <param name="pageNumber"></param>
        /// <param name="pageSize"></param>
        /// <param name="sort"></param>
        /// <param name="dealerCode"></param>
        /// <param name="searchKeyword"></param>
        /// <param name="status"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public static List<ManpowerListingModel> GetManpowerListing(string pageNumber, string pageSize, string sort, string dealerCode, string searchKeyword,int status)
        {

            dealerCode = Convert.ToString(HttpContext.Current.Session["DealerCode"]);
            List<ManpowerListingModel> lstjobs = new List<ManpowerListingModel>();
            if (HttpContext.Current.Session != null)
            {
                lstjobs = new ManpowerListingBL().GetManpowerListing(pageNumber, pageSize, sort, dealerCode, searchKeyword,  status);
            }
            return lstjobs;
        }
    }
}