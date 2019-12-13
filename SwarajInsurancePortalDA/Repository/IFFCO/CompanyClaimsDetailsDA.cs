using Microsoft.ApplicationBlocks.Data;
using SwarajInsurancePortalBO.Models.HO;
using SwarajInsurancePortalBO.Models.IFFCO;
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
    public class CompanyClaimsDetailsDA : Connect
    {
        /// <summary>
        /// UpdateCompanyStatus
        /// </summary>
        /// <param name="status"></param>
        /// <param name="claimId"></param>
        /// <param name="CompanyRemarksListing"></param>
        /// <returns></returns>
        public int UpdateCompanyStatus(int status, int claimId, List<CompanyRemarksModel> CompanyRemarksListing)
        {
            try
            {
                using (SqlConnection sqlcon = Connection)
                {
                    DataTable userDcumentsTable = new DataTable();
                    userDcumentsTable.Columns.Add("documentId", typeof(int));
                    userDcumentsTable.Columns.Add("CompanyRemarks", typeof(string));                 
                    userDcumentsTable = CollectionHelper.ToDataTable(CompanyRemarksListing);


                    SqlParameter[] param = new SqlParameter[3];
                    param[0] = new SqlParameter("@claimId", claimId);
                    param[1] = new SqlParameter("@status", status);
                    param[2] = new SqlParameter("@tempCompanyRemarksTable", userDcumentsTable);
                    int result = Convert.ToInt32(SqlHelper.ExecuteScalar(sqlcon, CommandType.StoredProcedure, DbConstant.Usp_UpdateStatusByCompany, param));
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
        /// <summary>
        /// Acknowledge
        /// </summary>
        /// <param name="claimId"></param>
        /// <returns></returns>
        public int Acknowledge(int claimId)
        {
            try
            {
                using (SqlConnection sqlcon = Connection)
                {
                    SqlParameter[] param = new SqlParameter[3];
                    param[0] = new SqlParameter("@claimId", claimId);
                    int result = Convert.ToInt32(SqlHelper.ExecuteScalar(sqlcon, CommandType.StoredProcedure, DbConstant.Usp_SaveAcknowledgement, param));
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
