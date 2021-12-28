tokens = myLocalStorage.getItem(TOKENS);
const accessToken = tokens.access.token ;
console.log(accessToken);
function deleteDivisionID(id){
    var btnDelele = document.getElementById('btnDelete');
    const userProfile = myLocalStorage.getItem(USER_PROFILE);
    const eraser = userProfile.name;
    console.log(userProfile.name);
    btnDelele.addEventListener('click' , async (e) => {
        e.preventDefault();
        function deleteDivisionApi(id, eraser){
            const divisionID = "http://134.209.106.33:8888/v1/divisio";
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokens.access.token}`
            }
            let addOptions = {
                method: 'DELETE',
                headers
              };
        
              fetch(divisionID + '/' + id + '/' + eraser,addOptions)
              .then(function (response){     
                response.text();
                alert("Successfully Deleted");
                window.location.reload();
                })
              .catch((err) => {
                console.log(err);
              });
        }
        deleteDivisionApi(id, eraser);
        
    })
}

function addDivision(){
    var tenKH = document.getElementById('addTenKh').value;
    var tenTV = document.getElementById('addTenTV').value;
    var mota = document.getElementById('addMota').value;
    var formData ={
        Ten_KH : tenKH,
        Ten_TV :tenTV,
        Mo_Ta : mota ,
    };
    console.log(formData);
    addDivisionApi(formData);
}
function addDivisionApi(data){
    const divisionID = "http://134.209.106.33:8888/v1/divisio";
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokens.access.token}`
    }
    let addOptions = {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
      };

      fetch(divisionID,addOptions)
      .then(function (response){     
        response.json();
        alert("Successfully Added");
        window.location.reload();
        })
      .catch((err) => {
        console.log(err);
      });
}

const divisionData = "http://134.209.106.33:8888/v1/divisio?page=1";
var myHeaders = new Headers();
var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

fetch(divisionData,requestOptions)
    .then(function (response){
        response.json().then(function (data) {
            var table = document.getElementById('divisionBody')  
            for (var j = 0; j < data.results.length; j++)
            {
                    var row = `<tr>
                    <td>${j + 1}</td>
                    <td>${data.results[j].id}</td>
                    <td data-toggle="modal" data-target="#view" onclick="getDivisionbyID('${data.results[j].id}')">${data.results[j].Ten_KH}</td>
                    <td>${data.results[j].Ten_TV}</td>
                    <td style = "width: 150px; text-align: center">
                    <button onclick="editDivisionbyID('${data.results[j].id}')" type="button" data-toggle="modal" data-target="#edit" class="update btn-warning btn-sm"><span class="glyphicon glyphicon-pencil"></span></button>
                    <button onclick="viewHistoryDivisionID('${data.results[j].id}')" type="button" data-toggle="modal" data-target="#viewHistory" class="btn-primary btn-sm"><i class="fa fa-history" aria-hidden="true"></i></button>
		            <button onclick="deleteDivisionID('${data.results[j].id}')" type="button" data-toggle="modal" data-target="#delete" class="delete btn-danger btn-sm"><span class="glyphicon glyphicon-trash"></span></button>
                    </td>
                </tr>`
                table.innerHTML += row
            }
            
            function renderpagination (){
            var pagin = document.getElementById('paginationDivision')
            for(var i = 1; i <= data.totalPages; i++){
                pagin.innerHTML += '<a class="page-number" href="#">' + i + '</a>'
            }
        };
        function renderdivision (page){
        var divisionDataPage = "http://134.209.106.33:8888/v1/divisio?page=" + page;
        fetch(divisionDataPage,requestOptions)
        .then(function (response){
            response.json().then(function (data) {

            var table = document.getElementById('divisionBody')  
            var idShow = (page - 1) * 10 + 1
            for (var j = 0; j < data.results.length; j++)
            {
                    var row = `<tr >
                    <td>${idShow}</td>
                    <td>${data.results[j].id}</td>
                    <td data-toggle="modal" data-target="#view" onclick="getDivisionbyID('${data.results[j].id}')">${data.results[j].Ten_KH}</td>
                    <td>${data.results[j].Ten_TV}</td>
                    <td style = "width: 150px; text-align: center;">
                    <button onclick="editDivisionbyID('${data.results[j].id}')" type="button" data-toggle="modal" data-target="#edit" class="update btn-warning btn-sm"><span class="glyphicon glyphicon-pencil"></span></button>
                    <button onclick="viewHistoryDivisionID('${data.results[j].id}')" type="button" data-toggle="modal" data-target="#viewHistory" class="btn-primary btn-sm"><i class="fa fa-history" aria-hidden="true"></i></button>
                    <button onclick="deleteDivisionID('${data.results[j].id}')" type="button" data-toggle="modal" data-target="#delete" class="delete btn-danger btn-sm"><span class="glyphicon glyphicon-trash"></span></button>
                    </td>
                </tr>`
                idShow += 1
                if (j == 0) {
                    table.innerHTML = row
                } else {
                    table.innerHTML += row
                }
            }
        })
    })
};


renderpagination();

$('.page-number').click( function(e) {
    e.preventDefault();
    renderdivision($(this).text());
    return false; 
});
})
    })
    .catch(function (err) {
        console.log('error: ' + err);
    })

function editDivisionbyID(id){
        const divisionID = "http://134.209.106.33:8888/v1/divisio";
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
            };
        fetch(divisionID + '/' + id,requestOptions)
        .then(function (response){     
            response.json().then( function (data){
            editID.innerHTML = `${data.id}`;
            editTenKH.innerHTML = `${data.Ten_KH}`;
            if (data.Mo_ta == undefined){
                editMota.innerHTML = `${data.Mo_Ta}`;
                if(data.Mo_Ta == undefined){    
                editMota.innerHTML = `Chưa có thông tin`;
                }
            }
            else{
                editMota.innerHTML = `${data.Mo_ta}`;
            }
            if( data.Ten_Latin == undefined){
                editTenTV.innerHTML = `${data.Ten_TV}`;
            }
            else{
                editTenTV.innerHTML = `${data.Ten_Latin}`;
            }
            })
        })
        .catch((err) => {
            console.log(err);
        });
        console.log(id);

        let btnEdit = document.getElementById('btnEdit');
        btnEdit.addEventListener('click' ,async (e) =>{
            e.preventDefault();
            // alert("ok");
            let tenKH = document.getElementById('editTenKH').value;
            let tenTV = document.getElementById('editTenTV').value;
            let mota = document.getElementById('editMota').value;
            let formData ={
                Ten_KH : tenKH,
                Ten_TV :tenTV,
                Mo_Ta : mota ,
                };
            console.log(id);
            console.log(formData);
            const divisionID = "http://134.209.106.33:8888/v1/divisio";
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokens.access.token}`
            }
            let addOptions = {
                method: 'PATCH',
                headers,
                body: JSON.stringify(formData),
            };

            fetch(divisionID + '/' + id,addOptions)
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

function getDivisionbyID(id){
    const divisionDatabyId = "http://134.209.106.33:8888/v1/divisio";
    let myHeaders = new Headers();
    let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };
    fetch(divisionDatabyId + '/' + id,requestOptions)
    .then( function (response) {
        response.json().then( function (data){
            console.log(data);
                txtID.innerHTML = `${data.id}`;
                txtTenKH.innerHTML = `${data.Ten_KH}`;
            if (data.Mo_ta == undefined){
                txtMota.innerHTML = `${data.Mo_Ta}`;
                if(data.Mo_Ta == undefined){    
                    
                    txtMota.innerHTML = `Chưa có thông tin`;
                }
            }
            else{
                txtMota.innerHTML = `${data.Mo_ta}`;
            }
            if( data.Ten_Latin == undefined){
                txtTenTV.innerHTML = `${data.Ten_TV}`;
            }
            else{
                txtTenTV.innerHTML = `${data.Ten_Latin}`;
            }
        })
    })
    .catch(function (err) {
        console.log('error: ' + err);
    })
}


function viewHistoryDivisionID(id){
    historyBody.innerHTML = '';
    message.innerHTML = '' ;
    const divisionDatabyId = "http://134.209.106.33:8888/v1/divisio/getHistoryDivisio";
    let myHeaders = new Headers();
    let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };
    fetch(divisionDatabyId + '/' + id,requestOptions)
    .then( function (response) {
        response.json().then( function (data){
            if(data.length == 0){
                message.innerHTML = 'Empty edit history' ;
            }
            else{
                    for (var j = 0; j < data.length; j++){
                        var check  = 0;
                        for (var i = 0; i < data[j].modifications.length; i++) {
                            check +=1;
                        var time = '';
                        var restore = '';
                            if(check==1){
                                time = `${data[j].timestamp}`;
                            }
                    var tbody = `
                    Field: ${data[j].modifications[i].field}
                <br>
                OldValue: ${data[j].modifications[i].oldValue}<br>
                NewValue: ${data[j].modifications[i].newValue}
                `
                var restore = `<button onclick="restoreDivisionbyID('${[id]}','${[data[j].modifications[i].field]}', '${[data[j].modifications[i].oldValue]}')" type="button" data-toggle="modal" data-target="#restore" class="btn-info btn-sm"><span class="glyphicon glyphicon-repeat"></span></button>`
                historyBody.innerHTML += `<tr>
                <td>${time}</td>
                <td>${tbody}</td>
                <td style = "text-align: center">${restore}</td>
                </tr>` ;
                }
            }
            }
        })
    })
    .catch(function (err) {
        console.log('error: ' + err);
    })
}

function restoreDivisionbyID(id, field, oldValue){
    console.log(id);
    const formData = {
        [field] : oldValue
    }
    console.log(formData);
    btnRestore.addEventListener('click' , async (e) => {
        e.preventDefault();
        console.log(id);
            console.log(formData);
            const divisionID = "http://134.209.106.33:8888/v1/divisio";
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokens.access.token}`
            }
            let addOptions = {
                method: 'PATCH',
                headers,
                body: JSON.stringify(formData),
            };

            fetch(divisionID + '/' + id,addOptions)
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
