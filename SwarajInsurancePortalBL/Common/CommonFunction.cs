using SwarajInsurancePortalBO.Models;
using SwarajInsurancePortalBO.ViewModels;
using SwarajInsurancePortalDA.Common;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwarajInsurancePortalBL.Common
{
    public class CommonFunction
    {
        /// <summary>
        /// GetAllDealers
        /// </summary>
        /// <param name="claimId"></param>
        /// <returns></returns>
        public CommonModel GetEmailsForSend(int claimId)
        {
            CommonModel objMails = new CommonModel();
            CommonFunctionDA objDA = new CommonFunctionDA();
            DataSet ds = new DataSet();
            ds = objDA.GetEmailsForSend(claimId);

            if(ds.Tables.Count > 0)
            {
                if(ds.Tables[0].Rows.Count > 0)
                {
                    objMails.dealerMails = CollectionHelper.ConvertTo<DealerMails>(ds.Tables[0]);

                }
                if (ds.Tables[0].Rows.Count > 0)
                {
                    objMails.HoMailss = CollectionHelper.ConvertTo<HoMails>(ds.Tables[1]);
                }
                if (ds.Tables[0].Rows.Count > 0)
                {
                    objMails.companyMails = CollectionHelper.ConvertTo<CompanyMails>(ds.Tables[2]);
                }
            }
            else
            {
                return objMails;
            }
            return objMails;
        }

        /// <summary>
        /// GetAllDealers
        /// </summary>
        /// <returns></returns>
        public List<DealerModel> GetAllDealers()
        {
            List<DealerModel> objDealers = new List<DealerModel>();
            CommonFunctionDA objDA = new CommonFunctionDA();
            DataTable dt = new DataTable();
            dt = objDA.GetAllDealers();
            objDealers = CollectionHelper.ConvertTo<DealerModel>(dt);
            return objDealers;
        }

        public List<StatusModel> GetAllStatus()
        {
            List<StatusModel> objDealers = new List<StatusModel>();
            CommonFunctionDA objDA = new CommonFunctionDA();
            DataTable dt = new DataTable();
            dt = objDA.GetAllStatus();
            objDealers = CollectionHelper.ConvertTo<StatusModel>(dt);
            return objDealers;
        }

    }
}
