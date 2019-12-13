<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="SwarajInsurancePortal.Views.Login" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="X-UA-Compatible" content="IE=9" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Dealer Insurance Portal</title>
    <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,400i,500,600,700" rel="stylesheet">
    <link href="../Content/css/style.css" rel="stylesheet" />
    <link href="../Content/validationEngine.jquery.css" rel="stylesheet" />
    <link href="../Scripts/toastr/toastr.css" rel="stylesheet" />
    <style type="text/css">
        .error {
            color: red
        }
    </style>
    <!--[if lt IE 9]>
        <link href="../Content/css/ie8.css" rel="stylesheet" />
	<![endif]-->
    <script src="../Scripts/jquery-3.3.1.min.js"></script>
    <script src="../Scripts/js/tabs.js"></script>
    <script src="../Scripts/js/html5shiv.min.js"></script>
    <script src="../Scripts/js/respond.js"></script>
    <script src="../Scripts/js/placeholder.js"></script>
    <script src="../Scripts/js/custom.js"></script>
    <script src="../Scripts/Plugin/jquery.validationEngine-en.js"></script>
    <script src="../Scripts/Plugin/jquery.validationEngine.js"></script>
    <script src="../Scripts/toastr/toastr.js"></script>
    <script src="../Scripts/Custom/Login/Login.js"></script>
</head>
<body>
    <style type="text/css">
        .login-bg {
            -ms-behavior: url(backgroundsize.min.htc);
        }
    </style>
    <input type="hidden" id="hdnSitePath" runat="server" clientidmode="static" />
    <form id="form1" runat="server">
        <div class="wrapper login-bg">
            <div class="header login-header">
                <div class="s-container">
                    <div class="logo login-logo">
                        <a href="#">
                            <img src="<%=_SitePath%>images/logo.png" alt="company-logo" title="company-logo" /></a>
                    </div>
                    <span class="center-header login-logo">Dealer Insurance Portal</span>

                </div>
                <!-- Container Ends -->
            </div>
            <!-- Header Ends -->

            <div class="main-content">
                <div class="s-container">
                    <div class="text-center">
                        <div class="asset-outer">
                            <div class="img-left">
                                <div class="box-inner">
                                    <span class="box-left">
                                        <a href="#">
                                            <img src="<%=_SitePath%>images/login-circle.png" alt="logo" title="logo"></a>
                                    </span>
                                    <span class="box-rt">
                                        <p>
                                            Dealer 
			                                <span>Insurance</span>
                                            <span>Portal</span>
                                        </p>
                                    </span>
                                </div>
                            </div>
                            <div class="login-form placeholder-example">
                                <h4>Login</h4>
                               <%-- <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum <span>facilisis nulla mollis.</span></p>--%>
                                <div class="input-box">
                                    <input type="text" id="txtEmail" placeholder="Username" name="email" class="validate[required]" />
                                    <span class="error"></span>
                                </div>
                                <div class="input-box">
                                    <input type="password" id="txtPassword" placeholder="Password" name="password" class="validate[required]" />
                                    <span class="error"></span>
                                </div>
                                <%--<div class="input-box input-box2">
                                    <label>
                                        <input type="checkbox">Remeber Me</label>
                                </div>--%>
                                <input class="submit" type="button" id="btnLogin" value="login" />
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Container Ends -->
                <div class="footer">
                    <div class="s-container">
                        <p>&copy; 2019  Swaraj. All rights reserved.</p>
                    </div>
                    <!-- Container Ends -->
                </div>
                <!-- Footer Ends -->
            </div>
            <!-- Main Content Ends -->
            <div class="mahindra-pin">
                <img src="<%=_SitePath%>images/mahindra_rise.png" alt="" />
            </div>
        </div>
    </form>
</body>
</html>
