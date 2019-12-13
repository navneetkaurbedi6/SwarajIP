using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace SwarajInsurancePortalBO.Models.Login
{
    public class UserSessionBO
    {
        public int userId { get; set; }
        public string dealerCode { get; set; }
        public string name { get; set; }
        public string status { get; set; }
        public int roleId { get; set; }
        public string emailId { get; set; }
        public string role { get; set; }
    }
}
