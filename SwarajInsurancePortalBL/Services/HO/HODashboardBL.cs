using SwarajInsurancePortalBO.ViewModels;
using SwarajInsurancePortalBO.ViewModels.Dealer;
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
    public class HODashboardBL
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
                HODashboardDA objJoblistingDA = new HODashboardDA();
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
        /// BindDealers
        /// </summary>
        /// <returns></returns>
        public List<DealerModel> BindDealers()
        {
            try
            {
                HODashboardDA objHODashboardModel = new HODashboardDA();
                List<DealerModel> objDealerModel = new List<DealerModel>();
                DataTable dt = objHODashboardModel.BindDealers();
                if(dt.Rows.Count>0)
                {
                    objDealerModel = CollectionHelper.ConvertTo<DealerModel>(dt);
                }
                return objDealerModel;
            }
            catch(Exception e)
            {
                CollectionHelper.ExcepLog(e);
                throw e;
            }
        }
    }
}
