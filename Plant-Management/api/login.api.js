function register(){
  window.open("../registerPage/index.html") ;
  alert("Hello")
}

const form = {
  email: document.getElementById("email"),
  password: document.getElementById("password"),
  submit: document.getElementById("btnLogin"),
  // messages: document.getElementById("form-messages"),
};
let button = form.submit.addEventListener("click", (e) => {
  e.preventDefault();
  if (email.value == 0 || password.value == 0){
    alert("Vui lòng nhập đầy đủ email và password");
  }
  else{
   login = "http://134.209.106.33:8888/v1/auth/login";

  fetch(login, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: form.email.value,
      password: form.password.value,
    }),
  })
    .then(
      function(response){
        if (response.status !== 200) {
          alert("Email và tài khoản không tồn tại")
          
            responconsole.log('Looks like there was a problem. Status Code: ' +se.status);
          return;
        }
        else {
          window.location.replace("../adminPage/index.html");
        }
        response.json().then(function(data) {
          console.log(data);
        });
      }
    )
    .catch((err) => {
      console.log(err);
    });
  }
});