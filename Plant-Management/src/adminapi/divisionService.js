tokens = myLocalStorage.getItem(TOKENS);
const accessToken = tokens.access.token ;
console.log(accessToken);
function deleteDivisionID(id){
    var btnDelele = document.getElementById('btnDelete');
    btnDelele.addEventListener('click' , async (e) => {
        e.preventDefault();
        function deleteDivisionApi(id){
            const divisionID = "http://134.209.106.33:8888/v1/divisio";
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokens.access.token}`
            }
            let addOptions = {
                method: 'DELETE',
                headers
              };
        
              fetch(divisionID + '/' + id ,addOptions)
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
                    <td style = "width: 130px;">
                    <button onclick="editDivisionbyID('${data.results[j].id}')" type="button" data-toggle="modal" data-target="#edit" class="update btn btn-warning btn-sm"><span class="glyphicon glyphicon-pencil"></span></button>
		            <button onclick="deleteDivisionID('${data.results[j].id}')" type="button" data-toggle="modal" data-target="#delete" class="delete btn btn-danger btn-sm"><span class="glyphicon glyphicon-trash"></span></button></td>
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
                if (data.results[j].Ten_Latin == undefined){
                    var row = `<tr >
                    <td>${idShow}</td>
                    <td>${data.results[j].id}</td>
                    <td data-toggle="modal" data-target="#view" onclick="getDivisionbyID('${data.results[j].id}')">${data.results[j].Ten_KH}</td>
                    <td>${data.results[j].Ten_TV}</td>
                    <td style = "width: 130px;">
                    <button onclick="editDivisionbyID('${data.results[j].id}')" type="button" data-toggle="modal" data-target="#edit" class="update btn btn-warning btn-sm"><span class="glyphicon glyphicon-pencil"></span></button>
                    <button onclick="deleteDivisionID('${data.results[j].id}')" type="button" data-toggle="modal" data-target="#delete" class="delete btn btn-danger btn-sm"><span class="glyphicon glyphicon-trash"></span></button>
                    </td>
                </tr>`
                }
                else{
                    var row = `<tr >
                    <td>${idShow}</td>
                    <td>${data.results[j].id}</td>
                    <td data-toggle="modal" data-target="#view" onclick="getDivisionbyID('${data.results[j].id}')">${data.results[j].Ten_KH}</td>
                    <td>${data.results[j].Ten_Latin}</td>
                    <td style = "width: 130px;">
                    <button onclick="editDivisionbyID('${data.results[j].id}')" type="button" data-toggle="modal" data-target="#edit" class="update btn btn-warning btn-sm"><span class="glyphicon glyphicon-pencil"></span></button>
                    <button onclick="deleteDivisionID('${data.results[j].id}')" type="button" data-toggle="modal" data-target="#delete" class="delete btn btn-danger btn-sm"><span class="glyphicon glyphicon-trash"></span></button>
                    </td>
                </tr>`
                }
                
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
            // editMota.innerHTML = `${data.Mo_ta}`
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


// function showResults() {
//     var edValue = document.getElementById("testSuggest");
//     var s = edValue.value;
//     console.log(s);
//     res = document.getElementById("resultSuggest");
//     res.innerHTML = '';
//     if (s == '') {
//       return;
//     }
//     let list = '';
//     const suggest = "http://localhost:8888/v1/divisio/suggest/";
//     let myHeaders = new Headers();
//     let requestOptions = {
//     method: 'GET',
//     headers: myHeaders,
//     redirect: 'follow'
//     };
//     fetch(suggest + s,requestOptions).then(
//      function (response) {
//        return response.json();
//      }).then(function (data) {
//        for (i=0; i<data.length; i++) {
//          list += '<li>' + data[i] + '</li>';
//        }
//        res.innerHTML = '<ul>' + list + '</ul>';
//        return true;
//      }).catch(function (err) {
//        console.warn('Something went wrong.', err);
//        return false;
//      });
//   }