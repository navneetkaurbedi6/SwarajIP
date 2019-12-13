using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using SwarajInsurancePortalDA.Common;
using Microsoft.ApplicationBlocks.Data;

namespace SwarajInsurancePortalDA.Repository.Dealer
{
    public class ManpowerListingDA : Connect
    {
        /// <summary>
        /// GetManpowerListing
        /// </summary>
        /// <param name="pageNumber"></param>
        /// <param name="pageSize"></param>
        /// <param name="sort"></param>
        /// <param name="dealerCode"></param>
        /// <param name="searchKeyword"></param>
        /// <returns></returns>
        public DataTable GetManpowerListing(string pageNumber, string pageSize, string sort, string dealerCode, string searchKeyword, int status)
        {
            try
            {
                using (SqlConnection sqlcon = Connection)
                {
                    DataTable dt = new DataTable();
                    SqlParameter[] param = new SqlParameter[6];
                    param[0] = new SqlParameter("@dealerCode", dealerCode);
                    param[1] = new SqlParameter("@pageSize", pageSize);
                    param[2] = new SqlParameter("@pageNo", pageNumber);
                    param[3] = new SqlParameter("@searchKeyword", searchKeyword);
                    param[4] = new SqlParameter("@sort", sort);
                    param[5] = new SqlParameter("@status", status);
                    dt = (SqlHelper.ExecuteDataset(sqlcon, CommandType.StoredProcedure, DbConstant.Usp_GetManpowerListing, param).Tables[0]);
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
