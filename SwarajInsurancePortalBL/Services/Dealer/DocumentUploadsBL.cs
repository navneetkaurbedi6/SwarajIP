using SwarajInsurancePortalBO.Models.Dealer;
using SwarajInsurancePortalBO.ViewModels;
using SwarajInsurancePortalDA.Common;
using SwarajInsurancePortalDA.Repository.Dealer;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace SwarajInsurancePortalBL.Services.Dealer
{
    public class DocumentUploadsBL
    {

        DocumentUploadsDA objdocumentUploadsDA = new DocumentUploadsDA();
        /// <summary>
        /// GetDocumentsCheckList
        /// </summary>
        /// <returns></returns>
        public List<DocumentsListModel> GetDocumentsCheckList()
        {
            try
            {
                List<DocumentsListModel> lstJoblst = new List<DocumentsListModel>();
                DataTable dt = objdocumentUploadsDA.GetDocumentsCheckList();
                if (dt.Rows.Count > 0)
                {
                    lstJoblst = CollectionHelper.ConvertTo<DocumentsListModel>(dt);
                }
                return lstJoblst;
            }
            catch (Exception e)
            {
                CollectionHelper.ExcepLog(e);
                throw e;
            }
        }
        /// <summary>
        /// GetClaimDetailsById
        /// </summary>
        /// <param name="claimId"></param>
        /// <returns></returns>
        public ClaimDetailsModel GetClaimDetailsById(int claimId)
        {
            try
            {
                ClaimDetailsModel objClaimDetails = new ClaimDetailsModel();
                DataTable dt = objdocumentUploadsDA.GetClaimDetailsById(claimId);
                if (dt.Rows.Count > 0)
                {
                    objClaimDetails = CollectionHelper.ConvertToObject<ClaimDetailsModel>(dt);
                }
                return objClaimDetails;
            }
            catch (Exception e)
            {
                CollectionHelper.ExcepLog(e);
                throw e;
            }
        }
        /// <summary>
        /// InsertDocuments
        /// </summary>
        /// <param name="objModel"></param>
        /// <returns></returns>
        public int InsertDocuments(UserDocumentsModel objModel)
        {
            try
            {
                int result = 0;
                result = objdocumentUploadsDA.InsertDocuments(objModel);                
                return result;
            }
            catch (Exception e)
            {
                CollectionHelper.ExcepLog(e);
                throw e;
            }
        }
        /// <summary>
        /// GetUploadedDocumentsByClaimId
        /// </summary>
        /// <param name="claimId"></param>
        /// <returns></returns>
        public UserDocumentsModel GetUploadedDocumentsByClaimId(int claimId)
        {
            try
            {
                UserDocumentsModel objdocuments = new UserDocumentsModel();
                List<DocumentList> lstDocuments = new List<DocumentList>();

                DataTable dt = objdocumentUploadsDA.GetUploadedDocumentsByClaimId(claimId);


                if (dt != null && dt.Rows.Count > 0 && Convert.ToInt32(dt.Rows[0]["status"]) == 1)
                {
                    objdocuments.status = Convert.ToInt32(dt.Rows[0]["status"]);
                    objdocuments.claimId = Convert.ToInt32(dt.Rows[0]["claimId"]);
                    objdocuments.isDraft = Convert.ToBoolean(dt.Rows[0]["isDraft"]);
                    objdocuments.claimStatus = Convert.ToInt32(dt.Rows[0]["claimStatus"]);


                    string Sitepath = System.Configuration.ConfigurationManager.AppSettings["SitePath"].ToString();
                    for (var i = 0; i < dt.Rows.Count; i++)
                    {
                        string document = Convert.ToString(dt.Rows[i]["DocAbbrevation"]);
                        string path = Sitepath + Convert.ToInt32(dt.Rows[i]["documentId"]) + document + '/' +  Convert.ToString(dt.Rows[i]["fileName"]);

                        lstDocuments.Add(new DocumentList
                        {
                            documentId = Convert.ToInt32(dt.Rows[i]["documentId"]),
                            fileName = Convert.ToString(dt.Rows[i]["fileName"]),
                            remarks = Convert.ToString(dt.Rows[i]["UserRemarks"]),
                            HORemarks = Convert.ToString(dt.Rows[i]["HORemarks"]),
                            CompanyRemarks = Convert.ToString(dt.Rows[i]["CompanyRemarks"]),
                            courierDetails = Convert.ToString(dt.Rows[i]["CourierDetails"]),
                            filePath = path
                        });
                    }
                    objdocuments.documentLists = lstDocuments;
                }


                return objdocuments;
            }
            catch (Exception e)
            {
                CollectionHelper.ExcepLog(e);
                throw e;
            }
        }
        /// <summary>
        /// SaveCourierDetails
        /// </summary>
        /// <param name="claimId"></param>
        /// <param name="courierDetailsLiting"></param>
        /// <returns></returns>
        public int SaveCourierDetails(int claimId, List<CourierDetailsModel> courierDetailsLiting)
        {
            try
            {
                int result = 0;
                result = objdocumentUploadsDA.SaveCourierDetails(claimId, courierDetailsLiting);
                return result;
            }
            catch (Exception e)
            {
                CollectionHelper.ExcepLog(e);
                throw e;
            }


        }
    }
}
