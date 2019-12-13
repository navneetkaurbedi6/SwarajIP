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
    public class ReminderListingDA : Connect
    {
        /// <summary>
        /// SaveReminder
        /// </summary>
        /// <param name="claimId"></param>
        /// <param name="claimNo"></param>
        /// <param name="dealerEmail"></param>
        /// <param name="reminderDesc"></param>
        /// <returns></returns>
        public int SaveReminder(string dealerCode, int claimId, string claimNo, string dealerEmail, string reminderDesc)
        {
            try
            {
                using (SqlConnection sqlcon = Connection)
                {
                    SqlParameter[] param = new SqlParameter[5];
                    param[0] = new SqlParameter("@dealerCode", dealerCode);
                    param[1] = new SqlParameter("@claimId", claimId);
                    param[2] = new SqlParameter("@claimNo", claimNo);
                    param[3] = new SqlParameter("@dealerEmail", dealerEmail);
                    param[4] = new SqlParameter("@reminderDesc", reminderDesc);
                    int result = Convert.ToInt32(SqlHelper.ExecuteScalar(sqlcon, CommandType.StoredProcedure, DbConstant.USP_SaveReminder, param));
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
