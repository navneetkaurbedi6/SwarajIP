using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwarajInsurancePortalBO.ViewModels
{
    public class ManpowerListingModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Gender { get; set; }
        public string PolicyNo { get; set; }
        public string Nominee { get; set; }
        public string NomineeRelationship { get; set; }
        public string PhoneNumber { get; set; }
        public string DOB { get; set; }
        public string Location { get; set; }
        public string DealershipName { get; set; }
        public string DealerCode { get; set; }
        public string Role { get; set; }
        public string Total { get; set; }
        public string RowNum { get; set; }
    }
}
