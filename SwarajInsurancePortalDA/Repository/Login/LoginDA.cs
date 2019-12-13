using System;
using System.Data;
using System.Data.SqlClient;
using SwarajInsurancePortalBO.Models.Login;
using SwarajInsurancePortalDA.Common;
using Microsoft.ApplicationBlocks.Data;

namespace SwarajInsurancePortalDA.Repository.Login
{
    public class LoginDA : Connect
    {
        /// <summary>
        /// Login
        /// </summary>
        /// <param name="objBO"></param>
        /// <returns></returns>
        public DataTable Login(LoginModel objBO)
        {
            try
            {
                using (SqlConnection sqlcon = Connection)
                {
                    DataTable dt = new DataTable();
                    SqlParameter[] param = new SqlParameter[2];
                    param[0] = new SqlParameter("@emailId", objBO.emailId);
                    param[1] = new SqlParameter("@password", objBO.password);
                    dt = SqlHelper.ExecuteDataset(sqlcon, CommandType.StoredProcedure, DbConstant.Usp_Login, param).Tables[0];
                    Connection.Dispose();
                    return dt;
                }
            }
            catch (Exception e)
            {
                CollectionHelper.ExcepLog(e);
                throw e;
            }
        }
    }
}
