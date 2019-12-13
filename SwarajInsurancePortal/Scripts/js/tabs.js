function openCity(evt, cityName, classElement) {
    
    var i, tabcontent, tablinks;
    //tabcontent = document.getElementsByClassName("tabcontent");
	tabcontent = document.querySelectorAll(".tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    //tablinks = document.getElementsByClassName("tablinks");
	tablinks = document.querySelectorAll(".tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
	
    //document.getElementById(cityName).style.display = "block";
    //document.getElementById(cityName).className += " active";  
    //$(".tablinks").removeClass('active');
    //evt.currentTarget.className += " active";
}