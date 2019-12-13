using Microsoft.ApplicationBlocks.Data;
using SwarajInsurancePortalDA.Common;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwarajInsurancePortalDA.Repository.HO
{
    public class HODashboardDA : Connect
    {
        /// <summary>
        /// GetDashboardCount
        /// </summary>
        /// <param name="dealerCode"></param>
        /// <returns></returns>
        public DataTable GetDashboardCount(string dealerCode, string finYear)
        {
            try
            {
                using (SqlConnection sqlcon = Connection)
                {
                    DataTable dt = new DataTable();
                    SqlParameter[] param = new SqlParameter[2];
                    param[0] = new SqlParameter("@dealerCode", dealerCode);
                    param[1] = new SqlParameter("@finYear", finYear);
                    dt = (SqlHelper.ExecuteDataset(sqlcon, CommandType.StoredProcedure, DbConstant.Usp_GetDashboardCounts_HO, param).Tables[0]);
                    Connection.Dispose();
                    return dt;
                }
            }
            catch (Exception ex)
            {
                CollectionHelper.ExcepLog(ex);
                throw ex;
            }
        }

        /// <summary>
        /// BindDealers
        /// </summary>
        /// <returns></returns>
        public DataTable BindDealers()
        {
            try
            {
                using (SqlConnection sqlcon = Connection)
                {
                    DataTable dt = new DataTable();
                    dt = (SqlHelper.ExecuteDataset(sqlcon, CommandType.StoredProcedure, DbConstant.Usp_GetAllDealers).Tables[0]);
                    Connection.Dispose();
                    return dt;
                }
            }
            catch(Exception e)
            {
                CollectionHelper.ExcepLog(e);
                throw e;
            }
        }
    }
}
