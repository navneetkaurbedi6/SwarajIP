using SwarajInsurancePortalBO.Models.HO;
using SwarajInsurancePortalBO.Models.IFFCO;
using SwarajInsurancePortalDA.Common;
using SwarajInsurancePortalDA.Repository.HO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwarajInsurancePortalBL.Services.IFFCO
{
    public class CompanyClaimDetailsBL
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
                CompanyClaimsDetailsDA objHOClaimsDetailsDA = new CompanyClaimsDetailsDA();
                int result = 0;
                result = objHOClaimsDetailsDA.UpdateCompanyStatus(status, claimId, CompanyRemarksListing);
                return result;
            }
            catch (Exception e)
            {
                CollectionHelper.ExcepLog(e);
                throw e;
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
                CompanyClaimsDetailsDA objHOClaimsDetailsDA = new CompanyClaimsDetailsDA();
                int result = 0;
                result = objHOClaimsDetailsDA.Acknowledge(claimId);
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
