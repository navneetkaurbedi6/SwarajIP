using Microsoft.ApplicationBlocks.Data;
using SwarajInsurancePortalDA.Common;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwarajInsurancePortalDA.Repository.IFFCO
{
    public class ViewRemindersDA : Connect
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="status"></param>
        /// <param name="pageNumber"></param>
        /// <param name="pageSize"></param>
        /// <param name="sort"></param>
        /// <param name="dealerCode"></param>
        /// <param name="searchKeyword"></param>
        /// <returns></returns>
        public DataTable GetAllReminders(int claimId, string pageNumber, string pageSize, string sort, string dealerCode, string searchKeyword)
        {
            try
            {
                using (SqlConnection sqlcon = Connection)
                {
                    DataTable dt = new DataTable();
                    SqlParameter[] param = new SqlParameter[6];
                    param[0] = new SqlParameter("@claimId", claimId);
                    param[1] = new SqlParameter("@dealerCode", dealerCode);
                    param[2] = new SqlParameter("@pageSize", pageSize);
                    param[3] = new SqlParameter("@pageNo", pageNumber);
                    param[4] = new SqlParameter("@searchKeyword", searchKeyword);
                    param[5] = new SqlParameter("@sort", sort);
                    dt = (SqlHelper.ExecuteDataset(sqlcon, CommandType.StoredProcedure, DbConstant.Usp_GetAllReminders, param).Tables[0]);
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
