// Sign in inputs
var signInEmail = document.getElementById("signInEmail");
var signInPassword = document.getElementById("signInPassword");
var logInBtn = document.getElementById("logInBtn");
// sign in messages
var incorrectPassword = document.getElementById("incorrectPassword");
var incorrectEmail = document.getElementById("incorrectEmail");


// Sign up inputs
var signUpName = document.getElementById("signUpName");
var signUpEmail = document.getElementById("signUpEmail");
var signUpPassword = document.getElementById("signUpPassword");
var signUpBtn = document.getElementById("signUpBtn");
//sign up messages
var success = document.getElementById("success");
var emailExist = document.getElementById("emailExist");
var inputsRequired = document.getElementById("inputsRequired");

//The Array that holds all the credentials
var credentials = [];

//Checking if there is memory stored in the local storage and if so we copy it
if (localStorage.getItem("credentials") != null) {
    credentials = JSON.parse(localStorage.getItem("credentials"));
}

function setLocalStorage() {
    localStorage.setItem("credentials", JSON.stringify(credentials));
}

//The sign up button function
function addCredential() {
    removeSignUpMessages();
    
    //Handling if the email already exists
    if (alreadyExist(signUpEmail.value)) {
        emailExist.classList.replace("d-none", "d-block");
        return;
    }
    
    //if validations are ok, add a new credential
    if (validate(signUpEmail) && validate(signUpPassword)  && validate(signUpName)) {
        
        //Creating object of the credential values to push into the array
        var credential = {
            signUpName: signUpName.value,
            signUpEmail: signUpEmail.value,
            signUpPassword: signUpPassword.value
        }
        
        credentials.push(credential);
        setLocalStorage();
        
        success.classList.replace("d-none", "d-block");
        removeSignUpValidationFormat();
    }
    else
    {
        inputsRequired.classList.replace("d-none", "d-block");
        return;
    }

    clearSignUpForm();
    removeSignUpValidationFormat();
}

//The log in button function
function LogIn() {

    removeLogInMessages();
    //Check if there is an invalid field
    if (validate(signInEmail) && validate(signInPassword)) {
        if (isMember(signInEmail.value, signInPassword.value)) {
            console.log("exist");
            console.log("valid ");
            return true;
        }
        else {
            console.log("doesn't exist");
            return false;
        }


    }
    else {
        console.log("is-invalid ");
        return false;
    }
}


// ====================== clearing and formating functions ===================== 
function removeLogInMessages() {
    incorrectEmail.classList.replace("d-block", "d-none");
    incorrectPassword.classList.replace("d-block", "d-none");
}
function removeSignUpMessages() {
    success.classList.replace("d-block", "d-none");
    emailExist.classList.replace("d-block", "d-none");
    inputsRequired.classList.replace("d-block", "d-none");
}
function removeSignUpValidationFormat()
{
    signUpEmail.classList.remove("is-valid");
    signUpEmail.classList.remove("is-invalid");

    signUpPassword.classList.remove("is-valid");
    signUpPassword.classList.remove("is-invalid");

    signUpName.classList.remove("is-valid");
    signUpName.classList.remove("is-invalid");
}
function clearSignUpForm()
{
    signUpName.value = "";
    signUpEmail.value = "";
    signUpPassword.value = "";
}






// ===================================== Checking & validating functions ============================
function validate(element) {

    var regex = {
        // Sign in regex
        signInEmail: /^[\w]+@[a-zA-Z]+\.com$/i,
        signInPassword: /^[\w]+$/,

        // Sign up regex
        signUpName: /^[\w]{4,}$/,
        signUpEmail: /^[\w]+@[a-zA-Z]+\.com$/i,
        signUpPassword: /^[\w]+$/
    }

    if (regex[element.id].test(element.value)) {
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
        return true;
    }
    else {
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
        return false;
    }

}

//Checking if the sign up email already exist
function alreadyExist(email) {
    var exist = false;
    for (let i = 0; i < credentials.length; i++) {
        if (credentials[i].signUpEmail == email) {
            exist = true
        }
    }

    return exist;
}

//Checking if the log in credentials are correct
function isMember(email, password) {

    var exist = false;
    var index;

    //Checking if the email exists
    for (let i = 0; i < credentials.length; i++) {
        if (credentials[i].signUpEmail.toLowerCase() == email.toLowerCase()) {
            exist = true
            index = i;
        }
    }

    if (exist) {
        if (credentials[index].signUpPassword == password) {
            return true;
        }
        else {
            incorrectPassword.classList.replace("d-none", "d-block");
            return false;
        }
    }
    else {
        incorrectEmail.classList.replace("d-none", "d-block");
    }
}

//===============================================Event listeners=================================

//================== sign up page ======================
if (signUpName) {
    signUpName.addEventListener("input", function (evenInfo) {
        validate(evenInfo.target);
    }
    )
}

if (signUpEmail) {
    signUpEmail.addEventListener("input", function (evenInfo) {
        validate(evenInfo.target);
    }
    )
}

if (signUpPassword) {
    signUpPassword.addEventListener("input", function (evenInfo) {
        validate(evenInfo.target);
    }
    )
}

if (signUpBtn) {
    signUpBtn.addEventListener("click", addCredential);
}

//==================== sign in page ==================
if (signInEmail) {
    signInEmail.addEventListener("input", function (evenInfo) {
        validate(evenInfo.target);
    }
    )
}

if (signInPassword) {
    signInPassword.addEventListener("input", function (evenInfo) {
        validate(evenInfo.target);
    }
    )
}

if (logInBtn) {
    logInBtn.addEventListener("click", function () {
        if (LogIn()) {
            window.location.href = "Welcome.html";
        }
    }
    )
}

