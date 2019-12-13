using Microsoft.ApplicationBlocks.Data;
using SwarajInsurancePortalBO.Models.Dealer;
using SwarajInsurancePortalDA.Common;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SwarajInsurancePortalDA.Repository.Dealer
{
    public class DocumentUploadsDA : Connect
    {
        /// <summary>
        /// GetDocumentsCheckList
        /// </summary>
        /// <returns></returns>
        public DataTable GetDocumentsCheckList()
        {
            try
            {
                using (SqlConnection sqlcon = Connection)
                {
                    DataTable dt = new DataTable();
                    dt = (SqlHelper.ExecuteDataset(sqlcon, CommandType.StoredProcedure, DbConstant.Usp_GetDocumentsCheckList).Tables[0]);
                    Connection.Dispose();
                    return dt;
                }
            }
            catch (Exception ex)
            {
                CollectionHelper.ExcepLog(ex);
                throw ex;
            }
        }
        /// <summary>
        /// GetClaimDetailsById
        /// </summary>
        /// <param name="claimId"></param>
        /// <returns></returns>
        public DataTable GetClaimDetailsById(int claimId)
        {
            try
            {
                using (SqlConnection sqlcon = Connection)
                {
                    DataTable dt = new DataTable();
                    SqlParameter[] param = new SqlParameter[1];
                    param[0] = new SqlParameter("@claimId", claimId);
                    dt = (SqlHelper.ExecuteDataset(sqlcon, CommandType.StoredProcedure, DbConstant.Usp_GetClaimDetailsById, param).Tables[0]);
                    Connection.Dispose();
                    return dt;
                }
            }
            catch (Exception ex)
            {
                CollectionHelper.ExcepLog(ex);
                throw ex;
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
                using (SqlConnection sqlcon = Connection)
                {


                    DataTable userDcumentsTable = new DataTable();
                    userDcumentsTable.Columns.Add("documentId", typeof(int));
                    userDcumentsTable.Columns.Add("fileName", typeof(string));
                    userDcumentsTable.Columns.Add("remarks", typeof(string));
                    userDcumentsTable = CollectionHelper.ToDataTable<DocumentList>(objModel.documentLists);
                    userDcumentsTable.Columns.Remove("filePath");
                    userDcumentsTable.Columns.Remove("documentName");
                    userDcumentsTable.Columns.Remove("HORemarks");
                    userDcumentsTable.Columns.Remove("CompanyRemarks");
                    userDcumentsTable.Columns.Remove("courierDetails");

                    SqlParameter[] param = new SqlParameter[3];
                    param[0] = new SqlParameter("@claimId", objModel.claimId);
                    param[1] = new SqlParameter("@isDraft", objModel.isDraft);
                    param[2] = new SqlParameter("@tempDocumentTable", userDcumentsTable);
                    int result = Convert.ToInt32(SqlHelper.ExecuteScalar(sqlcon, CommandType.StoredProcedure, DbConstant.Usp_InsertDocuments, param));
                    Connection.Dispose();
                    return result;
                }
            }
            catch (Exception ex)
            {
                CollectionHelper.ExcepLog(ex);
                throw ex;
            }
        }
        /// <summary>
        /// GetUploadedDocumentsByClaimId
        /// </summary>
        /// <param name="claimId"></param>
        /// <returns></returns>
        public DataTable GetUploadedDocumentsByClaimId(int claimId)
        {
            try
            {
                using (SqlConnection sqlcon = Connection)
                {
                    DataTable dt = new DataTable();
                    SqlParameter[] param = new SqlParameter[1];
                    param[0] = new SqlParameter("@claimId", claimId);
                    dt = (SqlHelper.ExecuteDataset(sqlcon, CommandType.StoredProcedure, DbConstant.USP_GetUploadedDocuments, param).Tables[0]);
                    Connection.Dispose();
                    return dt;
                }
            }
            catch (Exception ex)
            {
                CollectionHelper.ExcepLog(ex);
                throw ex;
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
                using (SqlConnection sqlcon = Connection)
                {
                    DataTable userDcumentsTable = new DataTable();
                    userDcumentsTable.Columns.Add("documentId", typeof(int));
                    userDcumentsTable.Columns.Add("courierDetails", typeof(string));
                    userDcumentsTable = CollectionHelper.ToDataTable(courierDetailsLiting);


                    SqlParameter[] param = new SqlParameter[2];
                    param[0] = new SqlParameter("@claimId", claimId);
                    param[1] = new SqlParameter("@tempCourierDetailsTable", userDcumentsTable);
                    int result = Convert.ToInt32(SqlHelper.ExecuteScalar(sqlcon, CommandType.StoredProcedure, DbConstant.Usp_SavecourierDetails, param));
                    Connection.Dispose();
                    return result;
                }
            }
            catch (Exception ex)
            {
                CollectionHelper.ExcepLog(ex);
                throw ex;
            }
        }
    }
}
