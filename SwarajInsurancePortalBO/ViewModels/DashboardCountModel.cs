using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwarajInsurancePortalBO.ViewModels.Dealer
{
    public class DashboardCountModel
    {

        public string status { get; set; }
        public string noOfManpowerCount { get; set; }
        public string noOfManpowerInsuredCount { get; set; }
        public string noOfClaimsCreated { get; set; }
        public string noOfClaimsPending { get; set; }
        public string noOfClaimsAcknowlwdged { get; set; }

        
    }
}
