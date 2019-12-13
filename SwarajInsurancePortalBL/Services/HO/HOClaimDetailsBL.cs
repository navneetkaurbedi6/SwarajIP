using SwarajInsurancePortalBO.Models.HO;
using SwarajInsurancePortalDA.Common;
using SwarajInsurancePortalDA.Repository.HO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwarajInsurancePortalBL.Services.HO
{
    public class HOClaimDetailsBL
    {
        /// <summary>
        /// RejectClaimByHO
        /// </summary>
        /// <param name="claimId"></param>
        /// <param name="HORemarksListing"></param>
        /// <returns></returns>
        public int RejectClaimByHO(int claimId, List<HoRemarksModel> HORemarksListing,string Reason)
        {
            try
            {
                HOClaimsDetailsDA objHOClaimsDetailsDA = new HOClaimsDetailsDA();
                int result = 0;
                result = objHOClaimsDetailsDA.RejectClaimByHO(claimId, HORemarksListing,Reason);
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
