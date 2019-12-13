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
    public class HOClaimsListingDA : Connect
    {
        /// <summary>
        /// GetHOClaimsListing
        /// </summary>
        /// <param name="status"></param>
        /// <param name="pageNumber"></param>
        /// <param name="pageSize"></param>
        /// <param name="sort"></param>
        /// <param name="dealerCode"></param>
        /// <param name="searchKeyword"></param>
        /// <returns></returns>
        public DataTable GetHOClaimsListing(int natureofClaim, int claimStatus, string status, string pageNumber, string pageSize, string sort, string dealerCode, string searchKeyword)
        {
            try
            {
                using (SqlConnection sqlcon = Connection)
                {
                    DataTable dt = new DataTable();
                    SqlParameter[] param = new SqlParameter[8];
                    param[0] = new SqlParameter("@natureofClaim", natureofClaim);
                    param[1] = new SqlParameter("@claimStatus", claimStatus);
                    param[2] = new SqlParameter("@status", status);
                    param[3] = new SqlParameter("@dealerCode", dealerCode);
                    param[4] = new SqlParameter("@pageSize", pageSize);
                    param[5] = new SqlParameter("@pageNo", pageNumber);
                    param[6] = new SqlParameter("@searchKeyword", searchKeyword);
                    param[7] = new SqlParameter("@sort", sort);
                    dt = (SqlHelper.ExecuteDataset(sqlcon, CommandType.StoredProcedure, DbConstant.Usp_GetHOClaimsListing, param).Tables[0]);
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
