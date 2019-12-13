using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SwarajInsurancePortalBO.ViewModels;
using System.Data;
using SwarajInsurancePortalDA.Common;
using SwarajInsurancePortalDA.Repository.Dealer;

namespace SwarajInsurancePortalBL.Services.Dealer
{
    public class ManpowerListingBL
    {
        /// <summary>
        /// GetManpowerListing
        /// </summary>
        /// <param name="pageNumber"></param>
        /// <param name="pageSize"></param>
        /// <param name="sort"></param>
        /// <param name="dealerCode"></param>
        /// <param name="searchKeyword"></param>
        /// <returns></returns>
        public List<ManpowerListingModel> GetManpowerListing(string pageNumber, string pageSize, string sort, string dealerCode, string searchKeyword, int status)
        {
            try
            {
                ManpowerListingDA objJoblistingDA = new ManpowerListingDA();
                List<ManpowerListingModel> lstJoblst = new List<ManpowerListingModel>();

                DataTable dt = objJoblistingDA.GetManpowerListing(pageNumber, pageSize, sort, dealerCode, searchKeyword,  status);
                if (dt.Rows.Count > 0)
                {
                    lstJoblst = CollectionHelper.ConvertTo<ManpowerListingModel>(dt);
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
