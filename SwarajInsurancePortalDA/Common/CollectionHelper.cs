using System;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using System.Text;
using System.Reflection;
using System.IO;
using System.Web;

namespace SwarajInsurancePortalDA.Common
{
    public class CollectionHelper
    {
        /// <summary>
        /// Converts datatable to genric class
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="datatable"></param>
        /// <returns></returns>
        public static List<T> ConvertTo<T>(DataTable datatable) where T : new()
        {
            List<T> Temp = new List<T>();
            try
            {
                List<string> columnsNames = new List<string>();
                foreach (DataColumn DataColumn in datatable.Columns)
                    columnsNames.Add(DataColumn.ColumnName);
                Temp = datatable.AsEnumerable().ToList().ConvertAll<T>(row => getObject<T>(row, columnsNames));
                return Temp;
            }
            catch
            {
                return Temp;
            }

        }
        public static T getObject<T>(DataRow row, List<string> columnsName) where T : new()
        {
            T obj = new T();
            try
            {
                string columnname = "";
                string value = "";
                PropertyInfo[] Properties;
                Properties = typeof(T).GetProperties();
                foreach (PropertyInfo objProperty in Properties)
                {
                    columnname = columnsName.Find(name => name.ToLower() == objProperty.Name.ToLower());


                    if (!string.IsNullOrEmpty(columnname))
                    {
                        value = row[columnname].ToString();
                        if (!string.IsNullOrEmpty(value))
                        {
                            if (Nullable.GetUnderlyingType(objProperty.PropertyType) != null)
                            {
                                value = row[columnname].ToString().Replace("$", "").Replace(",", "");
                                objProperty.SetValue(obj, Convert.ChangeType(value, Type.GetType(Nullable.GetUnderlyingType(objProperty.PropertyType).ToString())), null);
                            }
                            else
                            {
                                value = row[columnname].ToString().Replace("%", "");
                                if (objProperty.PropertyType == Type.GetType("System.Boolean"))
                                    // objProperty.SetValue(obj, Convert.ChangeType(Convert.ToBoolean(Convert.ToInt32(value)), Type.GetType(objProperty.PropertyType.ToString())), null);
                                    objProperty.SetValue(obj, Convert.ChangeType(Convert.ToBoolean(value), Type.GetType(objProperty.PropertyType.ToString())), null);
                                else if (objProperty.CanWrite)
                                    objProperty.SetValue(obj, Convert.ChangeType(value, Type.GetType(objProperty.PropertyType.ToString())), null);
                            }
                        }
                    }
                }

            }
            catch
            {
                //return obj;
            }
            return obj;
        }
        /// <summary>
        /// Convert Genric Class to DataTable
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="collection"></param>
        /// <returns></returns>
        public static DataTable ToDataTable<T>(IEnumerable<T> collection)
        {
            DataTable newDataTable = new DataTable();
            Type impliedType = typeof(T);
            PropertyInfo[] _propInfo = impliedType.GetProperties();
            foreach (PropertyInfo pi in _propInfo)
                newDataTable.Columns.Add(pi.Name, Nullable.GetUnderlyingType(
            pi.PropertyType) ?? pi.PropertyType);

            foreach (T item in collection)
            {
                DataRow newDataRow = newDataTable.NewRow();
                newDataRow.BeginEdit();
                foreach (PropertyInfo pi in _propInfo)
                {
                    object piValue = pi.GetValue(item, null);
                    newDataRow[pi.Name] = piValue == null ? DBNull.Value : piValue;
                }
                newDataRow.EndEdit();
                newDataTable.Rows.Add(newDataRow);
            }
            return newDataTable;
        }
        /// <summary>
        /// To get the single object from datatable having single record
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="datatable"></param>
        /// <returns></returns>
        public static T ConvertToObject<T>(DataTable datatable) where T : new()
        {
            List<T> Temp = new List<T>();
            try
            {
                List<string> columnsNames = new List<string>();
                foreach (DataColumn DataColumn in datatable.Columns)
                    columnsNames.Add(DataColumn.ColumnName);
                Temp = datatable.AsEnumerable().ToList().ConvertAll<T>(row => getObject<T>(row, columnsNames));
                return Temp.FirstOrDefault();
            }
            catch
            {
                return Temp.FirstOrDefault();
            }

        }

        /// <summary>
        /// Exception Handling
        /// </summary>
        /// <param name="ex"></param>
        public static void ExcepLog(Exception ex)
        {
            if (!Directory.Exists(HttpContext.Current.Server.MapPath("~/LogInfo/")))
            {
                System.IO.Directory.CreateDirectory(HttpContext.Current.Server.MapPath("~/LogInfo/"));
            }
            string strPath = HttpContext.Current.Server.MapPath("~/LogInfo/info.txt");
            if (!File.Exists(strPath))
            {
                File.Create(strPath).Dispose();
            }
            using (StreamWriter sw = File.AppendText(strPath))
            {
                sw.WriteLine("=====Error Log ==");
                sw.WriteLine("===Start===" + DateTime.Now);
                sw.WriteLine("Error Message : " + ex.Message);
                sw.WriteLine("Stack Trace : " + ex.StackTrace);
                sw.WriteLine("===End=== " + DateTime.Now);
                sw.WriteLine("");
                sw.WriteLine("");
            }


        }
    }
}
