tokens = myLocalStorage.getItem(TOKENS);
const accessToken = tokens.access.token ;
console.log(accessToken);

const accountsData = "http://134.209.106.33:8888/v1/users"
var myHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
}
var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

fetch(accountsData,requestOptions)
.then(function (response) {
    response.json().then(function (data){
        console.log(data.results);
        var table = document.getElementById('accounts')
        for (var j = 0; j < data.results.length; j++){
            if (data.results[j].isEmailVerified === true){
                var active = `Active`;
            }
            else{
                var active = `Not Active`;
            }
            var row = `<tr>
            <td>${j + 1}</td>
            <td>${data.results[j].id}</td>
            <td>${data.results[j].name}</td>
            <td>${data.results[j].email}</td>
            <td>${data.results[j].role}</td>
            <td>${active}</td>
            <td style = "width: 100px; text-align: center">
                <button onclick="editAccountbyID('${data.results[j].id}')" type="button" data-toggle="modal" data-target="#edit" class="update btn-warning btn-sm"><span class="glyphicon glyphicon-pencil"></span></button>
		        <button onclick="deleteAccountbyID('${data.results[j].id}')" type="button" data-toggle="modal" data-target="#delete" class="delete btn-danger btn-sm"><span class="glyphicon glyphicon-trash"></span></button></td>
        </tr>`
        table.innerHTML += row
        }
        })
        .catch(function (err){
            console.log('error:' + err);
        })
})

function addAccountApi(data){
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokens.access.token}`
    }
    let addOptions = {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
      };

      fetch(accountsData,addOptions)
      .then(function (response){     
        response.json();
        alert("Successfully Added");
        window.location.reload();
        })
      .catch((err) => {
        console.log(err);
      });
}

function addAccount(){
    var email = document.getElementById('addEmail').value;
    var name = document.getElementById('addName').value;
    var password = document.getElementById('addPass').value;
    var role = document.getElementById('addRole').value;
    var formData ={
        email : email,
        password :password,
        name : name ,
        role : role
    };
    console.log(formData);
    addAccountApi(formData);
}

function deleteAccountbyID(id){
    var btnDelele = document.getElementById('btnDelete');
    btnDelele.addEventListener('click' , async (e) => {
        e.preventDefault();
        function deleteDivisionApi(id){
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokens.access.token}`
            }
            let addOptions = {
                method: 'DELETE',
                headers
              };
        
              fetch(accountsData + '/' + id,addOptions)
              .then(function (response){     
                response.text();
                alert("Successfully Deleted");
                window.location.reload();
                })
              .catch((err) => {
                console.log(err);
              });
        }
        deleteDivisionApi(id);
    })
}

function editAccountbyID(id){
    fetch(accountsData + '/' + id,requestOptions)
    .then(function(response){
        response.json().then(function (data) {
            console.log(data);
            editID.innerHTML = `${data.id}`;
            editEmail.innerHTML = `${data.email}`;
            editName.innerHTML = `${data.name}`;
        })
    })
    .catch((err) => {
        console.log(err);
    });
    let btnEdit = document.getElementById('btnEdit');
        btnEdit.addEventListener('click' ,async (e) =>{
            e.preventDefault();
            var email = document.getElementById('editEmail').value;
            var name = document.getElementById('editName').value;
            var password = document.getElementById('editPass').value;
            var formData ={
                email : email,
                password :password,
                name : name
            };
            console.log(id);
            console.log(formData);
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokens.access.token}`
            }
            let addOptions = {
                method: 'PATCH',
                headers,
                body: JSON.stringify(formData),
            };
            fetch(accountsData + '/' + id,addOptions)
            .then(function (response){     
                response.json();
                alert("Successfully Edited");
                window.location.reload();
                })
            .catch((err) => {
                console.log(err);
            });

        })
}