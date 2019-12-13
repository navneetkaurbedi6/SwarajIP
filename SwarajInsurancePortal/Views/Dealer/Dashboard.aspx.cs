using SwarajInsurancePortalBL.Services.Dealer;
using SwarajInsurancePortalBO.ViewModels;
using SwarajInsurancePortalBO.ViewModels.Dealer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SwarajInsurancePortal.Views.Dealer
{
    public partial class Dashboard : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        /// <summary>
        /// GetDashboardCount
        /// </summary>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public static DashboardCountModel GetDashboardCount(string finYear)
        {

           string dealerCode = Convert.ToString(HttpContext.Current.Session["DealerCode"]);
           DashboardCountModel objDashboardCountModel = new DashboardCountModel();
            if (HttpContext.Current.Session != null)
            {
                objDashboardCountModel = new DashboardBL().GetDashboardCount(dealerCode, finYear);
            }
            return objDashboardCountModel;
        }

        /// <summary>
        /// BindFinancialYears
        /// </summary>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public static List<FinancialYearModel> BindFinancialYears()
        {
            List<FinancialYearModel> objFinancialYearModel = new List<FinancialYearModel>();
            if (HttpContext.Current.Session != null)
            {
                objFinancialYearModel = new DashboardBL().BindFinancialYears();
            }
            return objFinancialYearModel;
        }

    }
}