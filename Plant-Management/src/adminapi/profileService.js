const user = myLocalStorage.getItem(USER_PROFILE);
console.log(user);
txtName.innerHTML = user.name;
txtEmail.innerHTML = user.email;
txtRole.innerHTML = user.role;