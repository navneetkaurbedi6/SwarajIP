using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwarajInsurancePortalBO.ViewModels
{
    public class LoginDetailsModel
    {
        public int id { get; set; }
        public string dealerCode { get; set; }
        public string name { get; set; }
        public string emailId { get; set; }
        public string phoneNo { get; set; }
        public string roleId { get; set; }
        public string role { get; set; }
        public int status { get; set; }

    }
}
