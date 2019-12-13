using SwarajInsurancePortalBO.ViewModels;
using SwarajInsurancePortalDA.Common;
using SwarajInsurancePortalDA.Repository.Dealer;
using SwarajInsurancePortalDA.Repository.HO;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwarajInsurancePortalBL.Services.HO
{
    public class HOClaimsListingBL
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
        public List<ClaimsListingModel> GetHOClaimsListing(int natureofClaim, int claimStatus, string status, string pageNumber, string pageSize, string sort, string dealerCode, string searchKeyword)
        {
            try
            {
                HOClaimsListingDA objHOClaimsListing = new HOClaimsListingDA();
                List<ClaimsListingModel> lstClaims = new List<ClaimsListingModel>();

                DataTable dt = objHOClaimsListing.GetHOClaimsListing( natureofClaim,  claimStatus, status, pageNumber, pageSize, sort, dealerCode, searchKeyword);
                if(dt.Rows.Count > 0)
                {
                    lstClaims = CollectionHelper.ConvertTo<ClaimsListingModel>(dt);
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
