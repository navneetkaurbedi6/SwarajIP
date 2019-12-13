using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwarajInsurancePortalBO.Models.Dealer
{
    public class ClaimModel
    {

        public int id { get; set; }
        public string dealerCode { get; set; }
        public string employeeId { get; set; }
        public string employeeName { get; set; }
        public string employeeDOAccident { get; set; }
        public string employeePlaceofAccident { get; set; }
        public string employeePhone { get; set; }
        public string employeeNatureofClaim { get; set; }
        public decimal employeeEstimatedCost { get; set; }
        public string employeeLateRemarks { get; set; }        

    }
}
