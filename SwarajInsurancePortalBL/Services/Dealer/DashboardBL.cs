using SwarajInsurancePortalBO.ViewModels;
using SwarajInsurancePortalBO.ViewModels.Dealer;
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
    public class DashboardBL
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
                DashboardDA objJoblistingDA = new DashboardDA();
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


        /// <summary>
        /// BindFinancialYears
        /// </summary>
        /// <returns></returns>
        public List<FinancialYearModel> BindFinancialYears()
        {
            try
            {
                DashboardDA objJoblistingDA = new DashboardDA();
                List<FinancialYearModel> objFinancialYearModel = new List<FinancialYearModel>();

                DataTable dt = objJoblistingDA.BindFinancialYears();
                if (dt.Rows.Count > 0)
                {
                    objFinancialYearModel = CollectionHelper.ConvertTo<FinancialYearModel>(dt);
                }
                return objFinancialYearModel;
            }
            catch (Exception e)
            {
                CollectionHelper.ExcepLog(e);
                throw e;
            }


        }

    }
}
