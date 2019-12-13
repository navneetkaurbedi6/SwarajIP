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
    public class CompanyClaimsListingDA : Connect
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
        public DataTable GetCompanyClaimsListing(int natureofClaim, int claimStatus, string status, string pageNumber, string pageSize, string sort, string dealerCode, string searchKeyword)
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
                    dt = (SqlHelper.ExecuteDataset(sqlcon, CommandType.StoredProcedure, DbConstant.Usp_GetCompanyClaimsListing, param).Tables[0]);
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
        /// SaveClaimId
        /// </summary>
        /// <param name="claimId"></param>
        /// <param name="registerNumber"></param>
        /// <returns></returns>
        public int SaveClaimId(int claimId, string registerNumber)
        {
            try
            {
                using (SqlConnection sqlcon = Connection)
                {
                    DataTable dt = new DataTable();
                    SqlParameter[] param = new SqlParameter[2];
                    param[0] = new SqlParameter("@claimId", claimId);
                    param[1] = new SqlParameter("@registerNumber", registerNumber);
                    int result = Convert.ToInt16(SqlHelper.ExecuteScalar(sqlcon, CommandType.StoredProcedure, DbConstant.Usp_SaveClaimId, param));
                    Connection.Dispose();
                    return result;
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
