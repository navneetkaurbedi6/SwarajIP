using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SwarajInsurancePortalBO.Models.Login;
using SwarajInsurancePortalBL.Services.Login;
using SwarajInsurancePortalBO.ViewModels;
using SwarajInsurancePortalBL.Common;
using System.Web.Services;

namespace SwarajInsurancePortal.Views
{
    public partial class Login : System.Web.UI.Page
    {
        public static string _SitePath = "";
        protected void Page_Load(object sender, EventArgs e)
        {
            _SitePath = Utility.SitePath();
            hdnSitePath.Value = Utility.SitePath();
        }

        /// <summary>
        /// LoginUser
        /// </summary>
        /// <param name="emailId"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public static LoginDetailsModel LoginUser(string emailId, string password)
        {
            LoginDetailsModel objloginDetailsModel = new LoginDetailsModel();
            LoginModel objModel = new LoginModel();
            objModel.emailId = emailId;
            objModel.password = password;
            DataTable dt = new DataTable();
            LoginBL objBL = new LoginBL();
            objloginDetailsModel = objBL.Login(objModel);
            return objloginDetailsModel;            
        }

        [WebMethod(EnableSession = true)]
        public static int LogoutUser()
        {
            int status = 0;
            if (HttpContext.Current.Session["UserSession"] != null)
            {
                UserSessionBO objUserSession = (UserSessionBO)HttpContext.Current.Session["UserSession"];
                // status = Convert.ToInt32(objUserSession.RoleId);
                status = 1;
            }
            HttpContext.Current.Session.Clear();
            HttpContext.Current.Session.RemoveAll();
            HttpContext.Current.Session.Abandon();
            return status;
        }

    }
}