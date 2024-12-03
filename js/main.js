const nameSu = document.getElementById("name-su");

const emailSu = document.getElementById("email-su");

const passwordSu = document.getElementById("password-su");

const btnSignUp = document.getElementById("sign-up");
const btnSignIn = document.getElementById("sign-in"); //
const btnGoSignIn = document.getElementById("g-s");
const btnGoSignUp = document.getElementById("g-s-u");
const emailSi = document.getElementById("email-si");

const passwordSi = document.getElementById("password-si");

let cn = /^[A-Za-z][A-Za-z0-9_]{7,29}$/.test(nameSu.value);

let ce =/^[^@]+@[^@]+\.[^@]+$/.test(emailSu.value);

let cp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(passwordSu.value);
let users = [];


// get users from local storage

let storedUsers = JSON.parse(localStorage.getItem("users"));
if (storedUsers) {
  users = storedUsers;
}

// signup
function sigUp() {
  let user = {
    name: nameSu.value,

    email: emailSu.value,

    password: passwordSu.value,
  };

  //check if condition if the user already exists

  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  suces();
  clearForm();
}

// sign in
function sigIn(){
    let user = users.find((u) => u.email === emailSi.value);
    if (user && user.password === passwordSi.value) {
        document.getElementById('sign-page').classList.add('visually-hidden')
        document.getElementById('sign-in-page').classList.add('visually-hidden')
        document.getElementById('home-page').classList.remove('visually-hidden')
        document.getElementById('user-name').innerHTML = user.name;
    }
}
function sigOut(){
    document.getElementById('sign-page').classList.remove('visually-hidden')
    document.getElementById('sign-in-page').classList.remove('visually-hidden')
    document.getElementById('home-page').classList.add('visually-hidden')
    clearForm();
}
// clear form

function clearForm() {
    nameSu.value = "";
    emailSu.value = "";
    passwordSu.value = "";

   
}

// created successfully

function suces() {
  document.getElementById("err").classList.add("d-none");
  document.getElementById("suc").classList.remove("d-none");
  btnSignUp.classList.remove("bg-danger");
  btnSignUp.classList.add("bg-success");
  let errs = document.querySelectorAll(".error");
  for (let i = 0; i < errs.length; i++) {
    errs[i].classList.add("d-none");
  }
}

// show error

function error(msg) {
  let err = document.querySelectorAll(".error");
  for (let i = 0; i < err.length; i++) {
    err[i].innerHTML = `<p>${msg}</p>`;
    err[i].classList.remove("d-none");
  }
  document.getElementById("suc").classList.add("d-none");
  document.getElementById("err").classList.remove("d-none");
  btnSignUp.classList.remove("bg-success");
  btnSignUp.classList.add("bg-danger");
}


 
 

// event listener




btnSignUp.addEventListener("click", function () {
  if (
    document.getElementById("name-su").value === "" ||
    document.getElementById("email-su").value === "" ||
    document.getElementById("password-su").value === ""
  ) {
    error("fill the fields");
    return;
  } else if (
    users.some(
      (user) => user.email === document.getElementById("email-su").value
    )
  ) {
    error("the email already exists");
    return;
  }
 
    sigUp();
  

  
  
});
function goSignIn(){
    document.getElementById('sign-up-page').classList.add('visually-hidden')
    document.getElementById('sign-in-page').classList.remove('visually-hidden')
    btnSignUp.classList.remove('bg-success');
    document.getElementById("suc").classList.add("d-none");
   
    
}
function goSignUp(){
    document.getElementById('sign-up-page').classList.remove('visually-hidden');
    document.getElementById('sign-in-page').classList.add('visually-hidden');
    let err = document.querySelectorAll(".error");
    for (let i = 0; i < err.length; i++) {
     
      err[i].classList.add("d-none");
    }
    btnSignUp.classList.remove("bg-danger");
    document.getElementById("err").classList.add("d-none");

}


btnGoSignIn.addEventListener("click", function () {
    goSignIn();
});

btnGoSignUp.addEventListener("click", function () {
    goSignUp();
});

btnSignIn.addEventListener("click", function () {
    sigIn();
});
document.getElementById('log-out').addEventListener("click", function () {
    sigOut();
});