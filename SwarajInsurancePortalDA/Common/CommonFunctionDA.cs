using Microsoft.ApplicationBlocks.Data;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwarajInsurancePortalDA.Common
{
    public class CommonFunctionDA : Connect
    {
        /// <summary>
        /// GetEmailsForSend
        /// </summary>
        /// <param name="claimId"></param>
        /// <returns></returns>
        public DataSet GetEmailsForSend(int claimId = 0)
        {
            try
            {
                using (SqlConnection sqlcon = Connection)
                {
                    DataSet ds = new DataSet();
                    SqlParameter[] param = new SqlParameter[1];
                    param[0] = new SqlParameter("@claimId", claimId);
                    ds = (SqlHelper.ExecuteDataset(sqlcon, CommandType.StoredProcedure, DbConstant.Usp_GetEmailsForSend, param));
                    Connection.Dispose();
                    return ds;
                }
            }
            catch (Exception ex)
            {
                CollectionHelper.ExcepLog(ex);
                throw ex;
            }
        }


        public DataTable GetAllDealers()
        {
            try
            {
                using (SqlConnection sqlcon = Connection)
                {
                    DataTable dt = new DataTable();
                    dt = (SqlHelper.ExecuteDataset(sqlcon, CommandType.StoredProcedure, DbConstant.Usp_GetDealerListing).Tables[0]);
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

        public DataTable GetAllStatus()
        {
            try
            {
                using (SqlConnection sqlcon = Connection)
                {
                    DataTable dt = new DataTable();
                    dt = (SqlHelper.ExecuteDataset(sqlcon, CommandType.StoredProcedure, DbConstant.Usp_GetAllStatus).Tables[0]);
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

    }
}
