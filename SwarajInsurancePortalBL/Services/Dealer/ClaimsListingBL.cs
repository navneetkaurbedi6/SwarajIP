using SwarajInsurancePortalBO.ViewModels;
using SwarajInsurancePortalDA.Common;
using SwarajInsurancePortalDA.Repository.Dealer;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwarajInsurancePortalBL.Services.Dealer
{
    public class ClaimsListingBL
    {
        /// <summary>
        /// GetClaimsListing
        /// </summary>
        /// <param name="status"></param>
        /// <param name="pageNumber"></param>
        /// <param name="pageSize"></param>
        /// <param name="sort"></param>
        /// <param name="dealerCode"></param>
        /// <param name="searchKeyword"></param>
        /// <returns></returns>
        public List<ClaimsListingModel> GetClaimsListing(int natureofClaim, string status, string pageNumber, string pageSize, string sort, string dealerCode, string searchKeyword)
        {
            try
            {
                ClaimsListingDA objJoblistingDA = new ClaimsListingDA();
                List<ClaimsListingModel> lstJoblst = new List<ClaimsListingModel>();

                DataTable dt = objJoblistingDA.GetClaimsListing( natureofClaim, status, pageNumber, pageSize, sort, dealerCode, searchKeyword);
                if(dt.Rows.Count > 0)
                {
                    lstJoblst = CollectionHelper.ConvertTo<ClaimsListingModel>(dt);             
                }
                return lstJoblst;
            }
            catch (Exception e)
            {
                CollectionHelper.ExcepLog(e);
                throw e;
            }


        }
    }
}
