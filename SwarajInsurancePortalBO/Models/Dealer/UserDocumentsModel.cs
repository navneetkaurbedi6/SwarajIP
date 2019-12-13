using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwarajInsurancePortalBO.Models.Dealer
{
    public class UserDocumentsModel
    {
        public int status { get; set; }
        public int claimId { get; set; }
        public bool isDraft { get; set; }
        public int claimStatus { get; set; }
        public List<DocumentList> documentLists { get; set; }

    }


    public class DocumentList
    {
        public int documentId { get; set; }
        public string fileName { get; set; }
        public string remarks { get; set; }
        public string HORemarks { get; set; }
        public string CompanyRemarks { get; set; }
        public string courierDetails { get; set; }
        public string filePath { get; set; }
        public string documentName { get; set; }

    }

}
