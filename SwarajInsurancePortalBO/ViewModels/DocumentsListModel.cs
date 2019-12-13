using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwarajInsurancePortalBO.ViewModels
{
    public class DocumentsListModel
    {
        public int id { get; set; }
        public string documentName { get; set; }
        public string docAbbrevation { get; set; }


    }


    public class DocumentViewList
    {
        public int documentId { get; set; }
        public string fileName { get; set; }
        public string remarks { get; set; }
        public string filePath { get; set; }
        public string documentName { get; set; }

    }
}
