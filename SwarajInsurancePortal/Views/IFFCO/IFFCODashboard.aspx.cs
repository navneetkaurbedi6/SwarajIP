using SwarajInsurancePortalBL.Services.Dealer;
using SwarajInsurancePortalBL.Services.IFFCO;
using SwarajInsurancePortalBO.ViewModels.Dealer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SwarajInsurancePortal.Views.IFFCO
{
    public partial class IFFCODashboard : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        /// <summary>
        /// GetDashboardCount
        /// </summary>
        /// <returns></returns>
        
        [WebMethod(EnableSession =true)]
        public static DashboardCountModel GetDashboardCount(string finYear,string dealerCode)
        {
            DashboardCountModel objDashboardCountModel = new DashboardCountModel();
            if(HttpContext.Current.Session != null)
            {
                objDashboardCountModel = new CompanyDashboardBL().GetDashboardCount(dealerCode, finYear);
            }
            return objDashboardCountModel;
        }
    }
}