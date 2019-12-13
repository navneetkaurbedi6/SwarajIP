using SwarajInsurancePortalBL.Services.IFFCO;
using SwarajInsurancePortalBO.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SwarajInsurancePortal.Views.IFFCO
{
    public partial class ViewReminders : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        /// <summary>
        /// GetAllReminders
        /// </summary>
        /// <param name="pageNumber"></param>
        /// <param name="pageSize"></param>
        /// <param name="sort"></param>
        /// <param name="dealerCode"></param>
        /// <param name="searchKeyword"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public static List<RemindersModel> GetAllReminders(int claimId,string pageNumber, string pageSize, string sort, string dealerCode, string searchKeyword)
        {

            dealerCode = Convert.ToString(HttpContext.Current.Session["DealerCode"]);
            List<RemindersModel> lstClaims = new List<RemindersModel>();
            if (HttpContext.Current.Session != null)
            {
                lstClaims = new ViewRemindersBL().GetAllReminders( claimId, pageNumber, pageSize, sort, dealerCode, searchKeyword);
            }
            return lstClaims;
        }
    }
}