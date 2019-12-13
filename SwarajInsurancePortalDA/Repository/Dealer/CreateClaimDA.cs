using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using SwarajInsurancePortalDA.Common;
using Microsoft.ApplicationBlocks.Data;
using SwarajInsurancePortalBO.Models.Dealer;

namespace SwarajInsurancePortalDA.Repository.Dealer
{
    public class CreateClaimDA : Connect
    {
        /// <summary>
        /// GetNatureOfClaims
        /// </summary>
        /// <returns></returns>
        public DataTable GetNatureOfClaims()
        {
            try
            {
                using (SqlConnection sqlcon = Connection)
                {
                    DataTable dt = new DataTable();
                    dt = (SqlHelper.ExecuteDataset(sqlcon, CommandType.StoredProcedure, DbConstant.Usp_GetNatureofClaims).Tables[0]);
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
        /// CreateClaim
        /// </summary>
        /// <param name="objClaimModel"></param>
        /// <returns></returns>
        public DataTable CreateClaim(ClaimModel objClaimModel)
        {
            try
            {
                using (SqlConnection sqlcon = Connection)
                {
                    DataTable dt = new DataTable();
                    SqlParameter[] param = new SqlParameter[10];

                    param[0] = new SqlParameter("@Id", objClaimModel.id);
                    param[1] = new SqlParameter("@dealerCode", objClaimModel.dealerCode);
                    param[2] = new SqlParameter("@employeeId", objClaimModel.employeeId);
                    param[3] = new SqlParameter("@employeeName", objClaimModel.employeeName);
                    param[4] = new SqlParameter("@employeeDOAccident", objClaimModel.employeeDOAccident);
                    param[5] = new SqlParameter("@employeePlaceofAccident", objClaimModel.employeePlaceofAccident);
                    param[6] = new SqlParameter("@employeePhone", objClaimModel.employeePhone);
                    param[7] = new SqlParameter("@employeeNatureofClaim", objClaimModel.employeeNatureofClaim);
                    param[8] = new SqlParameter("@employeeEstimatedCost", objClaimModel.employeeEstimatedCost);
                    param[9] = new SqlParameter("@employeeLateRemarks", objClaimModel.employeeLateRemarks);
                    dt = (SqlHelper.ExecuteDataset(sqlcon, CommandType.StoredProcedure, DbConstant.Usp_CreateClaim, param).Tables[0]);
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
