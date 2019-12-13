using SwarajInsurancePortalBL.Services.Dealer;
using SwarajInsurancePortalBL.Services.HO;
using SwarajInsurancePortalBO.ViewModels;
using SwarajInsurancePortalBO.ViewModels.Dealer;
using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Services;

namespace SwarajInsurancePortal.Views.HO
{
    public partial class HODashboard : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        /// <summary>
        /// GetDashboardCount
        /// </summary>
        /// <param name="finYear"></param>
        /// <param name="dealerCode"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public static DashboardCountModel GetDashboardCount(string finYear,string dealerCode)
        {
            DashboardCountModel objDashboardCountModel = new DashboardCountModel();
            if (HttpContext.Current.Session != null)
            {
                objDashboardCountModel = new HODashboardBL().GetDashboardCount(dealerCode, finYear);
            }
            return objDashboardCountModel;
        }
        
    }
}