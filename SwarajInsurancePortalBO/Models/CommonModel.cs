using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwarajInsurancePortalBO.Models
{
    public class CommonModel
    {
        public List<DealerMails> dealerMails { get; set; }
        public List<HoMails> HoMailss { get; set; }
        public List<CompanyMails> companyMails { get; set; }
    }
    public class DealerMails
    {
        public string emailId { get; set; }
    }
    public class HoMails
    {
        public string emailId { get; set; }
    }
    public class CompanyMails
    {
        public string emailId { get; set; }
    }
}

