using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SwarajInsurancePortalBL.Common;
using SwarajInsurancePortalBO.Models.Login;

namespace SwarajInsurancePortal
{
    public partial class SiteMaster : MasterPage
    {
        public static string _SitePath = "";
        protected void Page_Load(object sender, EventArgs e)
        {

            _SitePath = Utility.SitePath();
            hdnSitePath.Value = Utility.SitePath();

            UserSessionBO objUserSession = new UserSessionBO();
            if (HttpContext.Current.Session["UserSession"] != null)
            {
                objUserSession = (UserSessionBO)HttpContext.Current.Session["UserSession"];
                Session["UserId"] = objUserSession.emailId;
                Session["RoleId"] = objUserSession.roleId;
                Session["Name"] = objUserSession.name;  
                Session["RoleName"] = objUserSession.role;
                Session["DealerCode"] = objUserSession.dealerCode;
            }
            else
            {
                Response.Redirect(_SitePath + "Views/Login.aspx");
            }
        }
     
    }
}