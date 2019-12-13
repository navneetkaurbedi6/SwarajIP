using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwarajInsurancePortalBO.ViewModels
{
    public class ClaimDetailsModel
    {
        public int Id { get; set; }
        public string DealerCode { get; set; }
        public string EmployeeId { get; set; }
        public string ClaimId { get; set; }
        public string totalDays { get; set; }        
        public string Name { get; set; }
        public string DateOfAccident { get; set; }
        public string PlaceofAccident { get; set; }
        public string MobileNo { get; set; }
        public string NatureofClaim { get; set; }
        public string EstimatedCost { get; set; }
        public string lateRemarks { get; set; }
        public string claimStatus { get; set; }        
        public string Status { get; set; }
        public string HORejectReason { get; set; }        
        public string CreatedDate { get; set; }
        public string ModifiedDate { get; set; }

    }
}
