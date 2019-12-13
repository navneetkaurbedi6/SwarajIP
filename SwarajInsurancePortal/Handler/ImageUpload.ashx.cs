using SwarajInsurancePortalBL.Services.Dealer;
using SwarajInsurancePortalBO.Models.Dealer;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;

namespace SwarajInsurancePortal.Handler
{
    /// <summary>
    /// Summary description for ImageUpload
    /// </summary>
    public class ImageUpload : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            try
            {
                UserDocumentsModel userDocuments = new UserDocumentsModel();
                List<DocumentList> lstdocuments = new List<DocumentList>();
                HttpFileCollection files = context.Request.Files;
                var documents = HttpContext.Current.Request.Params["documentId"];
                var documentIds = documents.Split(',');
                var documentsName = HttpContext.Current.Request.Params["documentName"];
                var documentNames = documentsName.Split(',');
                var claimId = HttpContext.Current.Request.Params["claimId"];

                var UserRemarks = HttpContext.Current.Request.Params["remarks"];
                var isDraft = HttpContext.Current.Request.Params["isDraft"];

                

                var remarks = UserRemarks.Split(',');

                for (int i = 0; i < files.Count; i++)
                {

                    int documentId = Convert.ToInt16(documentIds[i]);
                    string document = Convert.ToString(documentNames[i]);
                    string documentName = Regex.Replace(document, @"\s+", "_");
                    string finalremarks = remarks[i];
                    HttpPostedFile file = files[i];
                    // if (!Directory.Exists(HttpContext.Current.Server.MapPath("~/UploadedFiles/")))


                    string folderName = "~/" + documentId + documentName + "/";
                    if (!Directory.Exists(HttpContext.Current.Server.MapPath(folderName)))
                    {
                        System.IO.Directory.CreateDirectory(HttpContext.Current.Server.MapPath(folderName));
                    }

                    Guid uniqueName = Guid.NewGuid();

                    var fileExt = files[i].FileName.Split('.');
                    var extension = fileExt[1];

                    string fileName = Convert.ToString(documentId) + "_" + "claimId-" + claimId + "_" + uniqueName + "." + extension;
                    string fname = context.Server.MapPath(folderName + fileName);
                   file.SaveAs(fname);
      
                    lstdocuments.Add(new DocumentList
                    {
                        documentId = documentId,
                        fileName=fileName,
                        remarks = finalremarks
                });
                }
                userDocuments.claimId = Convert.ToInt32(claimId);
                userDocuments.isDraft = Convert.ToBoolean(Convert.ToInt16(isDraft));

          
                userDocuments.documentLists = lstdocuments;
                DocumentUploadsBL objBL = new DocumentUploadsBL();
                int result = objBL.InsertDocuments(userDocuments);
            }
            catch (Exception)
            {

                throw;
            }

        }
        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}