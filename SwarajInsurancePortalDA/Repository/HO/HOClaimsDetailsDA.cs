using Microsoft.ApplicationBlocks.Data;
using SwarajInsurancePortalBO.Models.HO;
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
    public class HOClaimsDetailsDA : Connect
    {
        /// <summary>
        /// RejectClaimByHO
        /// </summary>
        /// <param name="claimId"></param>
        /// <param name="HORemarksListing"></param>
        /// <returns></returns>
        public int RejectClaimByHO(int claimId,List<HoRemarksModel> HORemarksListing,string Reason)
        {
            try
            {
                using (SqlConnection sqlcon = Connection)
                {
                    DataTable userDcumentsTable = new DataTable();
                    userDcumentsTable.Columns.Add("documentId", typeof(int));
                    userDcumentsTable.Columns.Add("HORemarks", typeof(string));
                    userDcumentsTable = CollectionHelper.ToDataTable(HORemarksListing);

                    SqlParameter[] param = new SqlParameter[3];
                    param[0] = new SqlParameter("@claimId", claimId);
                    param[1] = new SqlParameter("@tempHORemarksTable", userDcumentsTable);
                    param[2] = new SqlParameter("@rejectReason", Reason);
                    int result = Convert.ToInt32(SqlHelper.ExecuteScalar(sqlcon, CommandType.StoredProcedure, DbConstant.Usp_RejectClaimByHO, param));
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
