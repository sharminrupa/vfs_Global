function validate(){
    // e.preventDefault();
    var fname = document.getElementById("f_name").value;
    var lname = document.getElementById("l_name").value;
    var email = document.getElementById("email").value;
    var mobile = document.getElementById("mobile").value;
    var gen = document.getElementById("gender").value;
    var html = document.getElementById("html").value;
    var css = document.getElementById("css").value;
    var js = document.getElementById("js").value;
    var country = document.getElementById("country").value;
    var match = email.match(/@/i);
    var match2 = email.match(/.com/i);
    var result = "";
    var isValid = true;
    
    if((fname.length >0 && fname.length<=20) == (lname.length >0 && lname.length<=20)){
        result += "Name: " + fname + ' ' + lname +"<br>";
    }else{
        isValid=false;
        console.log("name is not valid");
    }
    if(match == '@' && match2 == ".com"){
        result += "Email: " + email + "<br>";
    }else{
        isValid=false;
        console.log("Email is not valid");
    }
    
    if(mobile.length >0 && mobile.length<=11) {
        result += "Mobile: " + mobile + "<br>";
    }else{
        isValid=false;
        console.log("mobile is not valid");
    }
    
    if(isValid) {
        result += "Gender: " + gen + "<br>";
    }else{
        isValid=false;
        console.log("mobile is not valid");
    }
    
    if(isValid) {
        result += "course: " + html + ' ' + css + ' ' + js +"<br>";
    }else{
        isValid=false;
        console.log("not valid", fname);
    }
    
    if(isValid) {
        result += "Country: " + country + "<br>";
    }else{
        isValid=false;
        console.log("not valid");
    }
    
    // if(isValid) {

    //    // window.location.href = "resul.html";
    //      var w = window.open();
    //      var html = "<html>";
    //     html += "<head>";
    //     html += "</head>";
    //     html += "<body>";
    //     html += "<p>"+ result;
    //     html += "</p>";
    //     html += "</body>";
    //     html += "</html>"
    //     w.document.write(html);
    //    // w.location.href = "result.html";
    // }else{
    //     isValid=false;
    //     console.log("form is not valid");
    // }
    
    form.addEventListener('submit', function(e){
        e.preventDefault();

        //sessionStorage.setItem('myObject', JSON.stringify([fname, lname]));

         localStorage.setItem('first-name', fname);
         localStorage.setItem('email', email);
         localStorage.setItem('mobile', mobile);
         localStorage.setItem('gen', gen);
         localStorage.setItem('html', html);
         localStorage.setItem('css', css);
         localStorage.setItem('js', js);
         localStorage.setItem('country', country);
         //localStorage.setItem('lname', lname);
        window.location.href = "result.html"
    });


}

const fName = localStorage.getItem('first-name');
//const lName = localStorage.getItem('lname');
const eMail = localStorage.getItem('email');
const mObile = localStorage.getItem('mobile');
const gEnder = localStorage.getItem('gen');
const cOuntry = localStorage.getItem('country');
const hTml = localStorage.getItem('html');
const cSs = localStorage.getItem('css');
const jS = localStorage.getItem('js');
//const l_name = document.getElementById('last-name').textContent;

document.getElementById('first-names').textContent = fName ;
//document.getElementById('last-names').textContent = lName ;
document.getElementById('email').textContent = eMail ;
document.getElementById('mobile').textContent = mObile ;
document.getElementById('gender').textContent = gEnder ;
document.getElementById('country').textContent = cOuntry ;
document.getElementById('html').textContent = hTml ;
document.getElementById('css').textContent = cSs ;
document.getElementById('js').textContent = jS;