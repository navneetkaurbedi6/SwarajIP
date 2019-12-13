using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SwarajInsurancePortalDA.Repository.Dealer;
using SwarajInsurancePortalDA.Common;
using SwarajInsurancePortalBO.Models.Dealer;
using System.Data;

namespace SwarajInsurancePortalBL.Services.Dealer
{
    public class CreateClaimBL
    {
        CreateClaimDA objClaimDA = new CreateClaimDA();
        /// <summary>
        /// GetNatureOfClaims
        /// </summary>
        /// <returns></returns>
        public List<NatureofClaimsModel> GetNatureOfClaims()
        {
            try
            {

                List<NatureofClaimsModel> lstJoblst = new List<NatureofClaimsModel>();

                System.Data.DataTable dt = objClaimDA.GetNatureOfClaims();
                if (dt.Rows.Count > 0)
                {
                    lstJoblst = CollectionHelper.ConvertTo<NatureofClaimsModel>(dt);
                }
                return lstJoblst;
            }
            catch (Exception e)
            {
                CollectionHelper.ExcepLog(e);
                throw e;
            }
        }
        /// <summary>
        /// CreateClaim
        /// </summary>
        /// <param name="objClaimModel"></param>
        /// <returns></returns>
        public int CreateClaim(ClaimModel objClaimModel)
        {
            try
            {
                int result = 0;
                DataTable dt = new DataTable();
                dt = objClaimDA.CreateClaim(objClaimModel);

                if (dt != null && dt.Rows.Count > 0 && Convert.ToInt32(dt.Rows[0]["Status"]) == 1)
                {
                    result = Convert.ToInt32(dt.Rows[0]["Status"]);
                }
                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }


    }
}
