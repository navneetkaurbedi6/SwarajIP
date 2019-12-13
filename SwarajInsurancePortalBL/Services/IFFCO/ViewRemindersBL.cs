using SwarajInsurancePortalBO.ViewModels;
using SwarajInsurancePortalDA.Common;
using SwarajInsurancePortalDA.Repository.IFFCO;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwarajInsurancePortalBL.Services.IFFCO
{
    public class ViewRemindersBL
    {
        /// <summary>
        /// GetCompanyClaimsListing
        /// </summary>
        /// <param name="status"></param>
        /// <param name="pageNumber"></param>
        /// <param name="pageSize"></param>
        /// <param name="sort"></param>
        /// <param name="dealerCode"></param>
        /// <param name="searchKeyword"></param>
        /// <returns></returns>
        public List<RemindersModel> GetAllReminders(int claimId, string pageNumber, string pageSize, string sort, string dealerCode, string searchKeyword)
        {
            try
            {
                ViewRemindersDA objRemindersDA = new ViewRemindersDA();
                List<RemindersModel> lstClaims = new List<RemindersModel>();

                DataTable dt = objRemindersDA.GetAllReminders( claimId, pageNumber, pageSize, sort, dealerCode, searchKeyword);
                if(dt.Rows.Count > 0)
                {
                    lstClaims = CollectionHelper.ConvertTo<RemindersModel>(dt);
                }
                return lstClaims;
            }
            catch (Exception e)
            {
                CollectionHelper.ExcepLog(e);
                throw e;
            }


        }


    }
}
