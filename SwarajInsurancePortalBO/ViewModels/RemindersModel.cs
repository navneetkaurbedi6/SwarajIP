using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwarajInsurancePortalBO.ViewModels
{
    public class RemindersModel
    {
        public int id { get; set; }
        public string claimId { get; set; }
        public string dealerCode { get; set; }
        public string claimNo { get; set; }
        public string dealerEmail { get; set; }
        public string reminderDescription { get; set; }
        public string createdDate { get; set; }
        public int Total { get; set; }
    }
}
