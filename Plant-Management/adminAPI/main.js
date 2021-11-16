function getUser(){
    var user = localStorage.getItem("user");
    emailUser.innerHTML = `<span id="emailUser">${user}</span>`
}

main();

function main(){
    getUser();
}
