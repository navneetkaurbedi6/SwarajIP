using SwarajInsurancePortalBO.ViewModels;
using SwarajInsurancePortalBO.ViewModels.Dealer;
using SwarajInsurancePortalDA.Common;
using SwarajInsurancePortalDA.Repository.Dealer;
using SwarajInsurancePortalDA.Repository.IFFCO;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwarajInsurancePortalBL.Services.IFFCO
{
    public class CompanyDashboardBL
    {
        /// <summary>
        /// GetDashboardCount
        /// </summary>
        /// <param name="dealerCode"></param>
        /// <returns></returns>
        public DashboardCountModel GetDashboardCount(string dealerCode, string finYear)
        {
            try
            {
                CompanyDashboardDA objJoblistingDA = new CompanyDashboardDA();
                DashboardCountModel objdashboardCountModel = new DashboardCountModel();

                DataTable dt = objJoblistingDA.GetDashboardCount(dealerCode,  finYear);
                if (dt.Rows.Count > 0)
                {
                    objdashboardCountModel = CollectionHelper.ConvertToObject<DashboardCountModel>(dt);
                }
                return objdashboardCountModel;
            }
            catch (Exception e)
            {
                CollectionHelper.ExcepLog(e);
                throw e;
            }


        }

    }
}
