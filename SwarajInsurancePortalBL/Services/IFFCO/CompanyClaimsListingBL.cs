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
    public class CompanyClaimsListingBL
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
        public List<ClaimsListingModel> GetCompanyClaimsListing(int natureofClaim, int claimStatus, string status, string pageNumber, string pageSize, string sort, string dealerCode, string searchKeyword)
        {
            try
            {
                CompanyClaimsListingDA objCompanyClaimsListing = new CompanyClaimsListingDA();
                List<ClaimsListingModel> lstClaims = new List<ClaimsListingModel>();

                DataTable dt = objCompanyClaimsListing.GetCompanyClaimsListing( natureofClaim,  claimStatus, status, pageNumber, pageSize, sort, dealerCode, searchKeyword);
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
                CompanyClaimsListingDA objCompanyClaimsListingDA = new CompanyClaimsListingDA();
                int result = objCompanyClaimsListingDA.SaveClaimId(claimId, registerNumber);
                return result;
            }
            catch (Exception e)
            {
                CollectionHelper.ExcepLog(e);
                throw e;
            }


        }

    }
}
