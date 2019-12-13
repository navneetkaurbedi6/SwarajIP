using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using System.Web;
using SwarajInsurancePortalDA.Common;
using SwarajInsurancePortalBO.Models.Login;
using SwarajInsurancePortalDA.Repository.Login;
using SwarajInsurancePortalBO.ViewModels;

namespace SwarajInsurancePortalBL.Services.Login
{
    public class LoginBL
    {

        LoginDA objDA = new LoginDA();
        /// <summary>
        /// Login
        /// </summary>
        /// <param name="objBO"></param>
        /// <returns></returns>
        public LoginDetailsModel Login(LoginModel objBO)
        {
            try
            {

                LoginDetailsModel objloginDetailsModel = new LoginDetailsModel();
                UserSessionBO objSessionBO = new UserSessionBO();
                DataTable dt = new DataTable();
                int result = 0;
                dt = objDA.Login(objBO);

                if (dt != null && dt.Rows.Count > 0 && Convert.ToInt32(dt.Rows[0]["Status"]) == 1)
                {
                    result = 1;
                    objSessionBO.name = Convert.ToString(dt.Rows[0]["Name"]);
                    objSessionBO.roleId = Convert.ToInt32(dt.Rows[0]["RoleId"]);
                    objSessionBO.emailId = Convert.ToString(dt.Rows[0]["EmailId"]);
                    objSessionBO.role = Convert.ToString(dt.Rows[0]["RoleName"]);
                    objSessionBO.dealerCode = Convert.ToString(dt.Rows[0]["DealerCode"]);


                    objloginDetailsModel.roleId = Convert.ToString(dt.Rows[0]["RoleId"]);
                    objloginDetailsModel.name = Convert.ToString(dt.Rows[0]["Name"]);
                    objloginDetailsModel.status = Convert.ToInt32(dt.Rows[0]["Status"]);
                    HttpContext.Current.Session["UserSession"] = objSessionBO;
                }
                else
                {
                    objloginDetailsModel.status = Convert.ToInt32(dt.Rows[0]["Status"]);
                    return objloginDetailsModel;
                }
             
                return objloginDetailsModel;
            }
            catch (Exception e)
            {
                CollectionHelper.ExcepLog(e);
                throw e;
            }
        }
    }
}
