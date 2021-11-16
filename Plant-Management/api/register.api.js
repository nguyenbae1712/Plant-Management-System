// function validate(){
//     var username = document.getElementById("nameRes").value;
//     var email= document.getElementById("emailRes").value;
//     var password= document.getElementById("password").value;
//     var submit= document.getElementById("btnCreate");
//     var messages= document.getElementById("message");
//     submit.onclick = function(){
//         // e.preventDefault();
//     if (username.length == 0) {
//         messages.innerHTML = "You must enter a true name."
//         messages.style.display = 'block';
//         return false;
//     }
//     else{
//     if (email.length == 0 || email.length > 200) {
//         messages.innerHTML = "You must enter a true email."
//         messages.style.display = 'block';
//         return false;
//     }
//     else{
//     if (password.length == 0) {
//         messages.innerHTML = "You must enter a true password."
//         messages.style.display = 'block';
//         return false;
//     }
//     else {
//         return true;
//     }
// }
    
// }
// }
// }
// validate();
handleForm()
function handleForm(){
    var btnCreate = document.querySelector('#btnCreate') ;
    btnCreate.onclick = function(){
        // alert("Ok");
    var name = document.querySelector('input[name="name"]').value;
    var email = document.querySelector('input[name="email"]').value;
    var password = document.querySelector('input[name="password"]').value;
    
    if(name == 0 || email == 0 || password == 0){
        alert('Please enter your full information !!!');
    }
    else{
        // console.log(name);
        // console.log(email);
        // console.log(password);
        var formData ={
            name : name,
            email : email,
            password :password
        };
        console.log(formData);
        registerApi(formData);
    }
    }
}
function registerApi(data){
    register = "http://134.209.106.33:8888/v1/auth/register";
    var options = {
        method: 'POST',
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
        body : JSON.stringify(data)
    };
    fetch(register,options)
    .then(function(response){
        if (response.status !== 200) {
            alert("Email và tài khoản đã tồn tại")
            // responconsole.log('Looks like there was a problem. Status Code: ' +se.status);
            return;
        }
        else {
            alert("Đăng ký thành công, Vui lòng đăng nhập")
            window.location.replace("../loginPage/index.html");
        }
        response.json();
    })
    .catch((err) => {
        console.log(err);
      });
}