﻿using System;
using System.Configuration;
using System.IO;
using System.Net;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;

namespace SwarajInsurancePortalBL.Common
{
    public class Utility
    {
        private static Utility current;
        private static readonly Random Random = new Random();
        public static Utility Current()
        {
            if (current == null)
            {
                current = new Utility();
            }
            return current;

        }

        /// <summary>
        /// send mail
        /// </summary>
        /// <param name="to"></param>
        /// <param name="subject"></param>
        /// <param name="body"></param>
        public static void sendMail(string to, string subject, string body)
        {
            try
            {
                MailMessage msg = new MailMessage
                {
                    From = new MailAddress("no-reply@TextToTicket.com")
                };
                msg.To.Add(to);
                msg.Subject = subject;
                msg.IsBodyHtml = true;
                msg.Body = body;
                SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com")
                {
                    Port = 587,
                    EnableSsl = true,
                    Credentials = new NetworkCredential("no-reply@TextToTicket.com", "Olympious911!")
                };
                SmtpServer.Send(msg);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }


        /// <summary>
        /// send mail
        /// </summary>
        /// <param name="to"></param>
        /// <param name="subject"></param>
        /// <param name="body"></param>
        public static bool sendingMail(string subject, string to, string message,string pathofFile= "")
        {
            try
            {
                string fromemail = ConfigurationManager.AppSettings["fromemail"].ToString();
                string[] Email = to.Split(',');

                foreach (var item in Email)
                {                 
                    MailAddress fromMailAddress = new MailAddress(fromemail, "Swaraj - Dealer Insurance");
                    MailAddress toMailAddress = new MailAddress(item, "Swaraj");

                    using (MailMessage msg = new MailMessage(fromMailAddress, toMailAddress))
                    {
                        string host = ConfigurationManager.AppSettings["Host"].ToString();
                        int port = Convert.ToInt32(ConfigurationManager.AppSettings["Port"]);
                        msg.Subject = subject;
                        msg.Body = message;
                        msg.IsBodyHtml = true;
                        SmtpClient smtp = new SmtpClient(host, port);
                        string username = ConfigurationManager.AppSettings["UserName"].ToString();
                        string password = ConfigurationManager.AppSettings["Password"].ToString();
                        if (username != null)
                        {
                            smtp.Credentials = new NetworkCredential(username, password);
                            smtp.UseDefaultCredentials = false;
                            smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                            smtp.EnableSsl = false;
                        }
                        smtp.Send(msg);
                    }
                }

           
            }
            catch (Exception ex)
            {
                return false;
            }
            return true;
        }





        /// <summary>
        /// get encryption key
        /// </summary>
        /// <returns></returns>
        private static string GetEncrypionKey()
        {
            return ConfigurationManager.AppSettings["EncryptionKey"].ToString();
        }

        /// <summary>
        /// encrypt the text
        /// </summary>
        /// <param name="clearText"></param>
        /// <returns></returns>
        public static string Encrypt(string clearText)
        {
            string EncryptionKey = GetEncrypionKey();
            byte[] clearBytes = Encoding.Unicode.GetBytes(clearText);
            using (Aes encryptor = Aes.Create())
            {
                Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
                encryptor.Key = pdb.GetBytes(32);
                encryptor.IV = pdb.GetBytes(16);
                using (MemoryStream ms = new MemoryStream())
                {
                    using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateEncryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(clearBytes, 0, clearBytes.Length);
                        cs.Close();
                    }
                    clearText = Convert.ToBase64String(ms.ToArray());
                }
            }
            return clearText;
        }

        /// <summary>
        /// decrypt text
        /// </summary>
        /// <param name="cipherText"></param>
        /// <returns></returns>
        public static string Decrypt(string cipherText)
        {
            string EncryptionKey = GetEncrypionKey();
            cipherText = cipherText.Replace(" ", "+");
            byte[] cipherBytes = Convert.FromBase64String(cipherText);
            using (Aes encryptor = Aes.Create())
            {
                Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
                encryptor.Key = pdb.GetBytes(32);
                encryptor.IV = pdb.GetBytes(16);
                using (MemoryStream ms = new MemoryStream())
                {
                    using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateDecryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(cipherBytes, 0, cipherBytes.Length);
                        cs.Close();
                    }
                    cipherText = Encoding.Unicode.GetString(ms.ToArray());
                }
            }
            return cipherText;
        }

        /// <summary>
        /// encrypt password using MD5
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public static string CreateMD5(string input)
        {
            using (System.Security.Cryptography.MD5 md5 = System.Security.Cryptography.MD5.Create())
            {
                byte[] inputBytes = System.Text.Encoding.ASCII.GetBytes(input);
                byte[] hashBytes = md5.ComputeHash(inputBytes);

                // Convert the byte array to hexadecimal string
                StringBuilder sb = new StringBuilder();
                for (int i = 0; i < hashBytes.Length; i++)
                {
                    sb.Append(hashBytes[i].ToString("X2"));
                }
                return sb.ToString();
            }
        }

        /// <summary>
        /// set site path
        /// </summary>
        /// <returns></returns>
        public static string SitePath()
        {
            return System.Configuration.ConfigurationManager.AppSettings["SitePath"].ToString();
        }

    }
}
