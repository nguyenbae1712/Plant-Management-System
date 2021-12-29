tokens = myLocalStorage.getItem(TOKENS);
// console.log(tokens);
const accessToken = tokens.access.token ;
console.log(accessToken);
function deleteDivisionID(id){
    var btnDelele = document.getElementById('btnDelete');
    const userProfile = myLocalStorage.getItem(USER_PROFILE);
    const eraser = userProfile.name;
    btnDelele.addEventListener('click' , async (e) => {
        e.preventDefault();
        // console.log(id);
        function deleteDivisionApi(id ,eraser){
            const divisionID = "http://134.209.106.33:8888/v1/familia";
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
    var divisionSuggest = document.getElementById('divisionSuggest').value;
    var myHeaders = new Headers();

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };
    fetch("http://134.209.106.33:8888/v1/ordo/getByName" + '/' + divisionSuggest, requestOptions)
    .then( function (response) {
        response.json().then ( function (data) {
            console.log(data);
            var divisioId = data[0].id ;       
            var formData ={
                Ten_KH : tenKH,
                Ten_TV :tenTV,
                Mo_Ta : mota ,
                idBo : divisioId,
            };
            addDivisionApi(formData);
        })
    })
}

function showResults() {
    var edValue = document.getElementById("divisionSuggest");

    var s = edValue.value;
    console.log(s);
    mes = document.getElementById("message");
    res = document.getElementById("resultSuggest");
    res.innerHTML = '';
    if (s == '') {
      return;
    }
    let list = '';
    const suggest = "http://134.209.106.33:8888/v1/ordo/suggest/";
    let myHeaders = new Headers();
    let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };
    fetch(suggest + s,requestOptions).then(
     function (response) {
       return response.json();
     }).then(function (data) {
       for (i=0; i<data.length; i++) {
         list += '<li >' + data[i] + '</li>';
       }
       res.innerHTML = '<ul id="test">' + list + '</ul>';
       test = document.getElementById('test');
       function getEventTarget(e) {
        e = e || window.event;
        return e.target || e.srcElement; 
        }
       test.onclick = function (event){
        var target = getEventTarget(event);
        edValue.value = target.innerHTML ;
        res.innerHTML = '';
       };
       if (!data.length){
        // mes.innerHTML = 'Division not found';
    }
    //    return true;
     }).catch(function (err) {
       console.warn('Something went wrong.', err);
       return false;
     });
  }

function addDivisionApi(data){
    const divisionID = "http://134.209.106.33:8888/v1/familia";
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

const divisionData = "http://134.209.106.33:8888/v1/familia?page=1";
var myHeaders = new Headers();
var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

let totalPages = 0;

function pagination(c, m) {
    var paginationTest = document.getElementById('paginationDivision');
    paginationTest.innerHTML = '';
    var current = c,
        last = m,
        delta = 2,
        left = current - delta,
        right = current + delta + 1,
        range = [],
        rangeWithDots = [],
        l;

    for (let i = 1; i <= last; i++) {
        if (i == 1 || i == last || i >= left && i < right) {
            range.push(i);
        }
    }

    for (let i of range) {
        if (l) {
            if (i - l === 2) {
                rangeWithDots.push(l + 1);
                paginationTest.innerHTML += '<a class="page-number" href="#">' + (l + 1) + '</a>';
            } else if (i - l !== 1) {
                rangeWithDots.push('...');
                paginationTest.innerHTML += '<a>' + '...' + '</a>';
            }
        }
        rangeWithDots.push(i);
        paginationTest.innerHTML += '<a class="page-number" href="#">' + i + '</a>';
        l = i;
    }
    console.log('form getOrder: ' + rangeWithDots)
}

function renderfamily (page){
    var divisionDataPage = "http://134.209.106.33:8888/v1/familia?page=" + page;
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
                <td data-toggle="modal" data-target="#view" onclick="getClassbyID('${data.results[j].id}')">${data.results[j].Ten_KH}</td>
                <td>${data.results[j].Ten_TV}</td>
                <td style = "width: 150px; text-align: center">
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

fetch(divisionData,requestOptions)
    .then(function (response){
        response.json().then(function (data) {

            localStorage.setItem('totalPages', data.totalPages);
            var table = document.getElementById('divisionBody')  
            for (var j = 0; j < data.results.length; j++)
            {
                    var row = `<tr >
                    <td>${j + 1}</td>
                    <td>${data.results[j].id}</td>
                    <td data-toggle="modal" data-target="#view" onclick="getClassbyID('${data.results[j].id}')">${data.results[j].Ten_KH}</td>
                    <td>${data.results[j].Ten_TV}</td>
                    <td style = "width: 150px; text-align: center">
                    <button onclick="editDivisionbyID('${data.results[j].id}')" type="button" data-toggle="modal" data-target="#edit" class="update btn-warning btn-sm"><span class="glyphicon glyphicon-pencil"></span></button>
                    <button onclick="viewHistoryDivisionID('${data.results[j].id}')" type="button" data-toggle="modal" data-target="#viewHistory" class="btn-primary btn-sm"><i class="fa fa-history" aria-hidden="true"></i></button>
                    <button onclick="deleteDivisionID('${data.results[j].id}')" type="button" data-toggle="modal" data-target="#delete" class="delete btn-danger btn-sm"><span class="glyphicon glyphicon-trash"></span></button>
                    </td>
                    </tr>`
                table.innerHTML += row
            }
            totalPages = data.totalPages;

            pagination(1, parseInt(data.totalPages));
            
            $('.page-number').click(function (e) {
                e.preventDefault();
                console.log('pagin clicked on ' + $(this).text())
                renderfamily($(this).text());
                pagination(parseInt($(this).text()), parseInt(data.totalPages));
                $('#add-js-file').append(`<script src="/scripts/handlePagination.js"></script>`);
            });
})
    })
    .catch(function (err) {
        console.log('error: ' + err);
    })

function editDivisionbyID(id){
        var editSuggest =document.getElementById('editSuggest');
        const divisionID = "http://134.209.106.33:8888/v1/familia";
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
            if( data.idBo == undefined){
                getDivisionbyID(data.Bo);
            }
            else{
                getDivisionbyID(data.idBo);
            }

            function getDivisionbyID(id){
                const divisionDatabyId = "http://134.209.106.33:8888/v1/ordo";
                let myHeaders = new Headers();
                let requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
                };
                fetch(divisionDatabyId + '/' + id,requestOptions)
                .then( function (response) {
                    response.json().then( function (data){            
                        editSuggest.value = data.Ten_KH;                      
                    })
                })
                .catch(function (err) {
                    console.log('error: ' + err);
                })
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
            let editNganh = document.getElementById('editSuggest').value;
            var myHeaders = new Headers();
                var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
                };
                fetch("http://134.209.106.33:8888/v1/ordo/getByName" + '/' + editNganh, requestOptions)
                .then( function (response) {
                    response.json().then ( function (data) {
                        console.log(data);
                        var divisioId = data[0].id ;       
                        var formData ={
                            Ten_KH : tenKH,
                            Ten_TV :tenTV,
                            Mo_Ta : mota ,
                            idBo : divisioId,
                        };
                        console.log(id);
                        console.log(formData);
                        const divisionID = "http://134.209.106.33:8888/v1/familia";
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
                            })

            

        })
}
function getClassbyID(id){
    const divisionDatabyId = "http://134.209.106.33:8888/v1/familia";
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
            if( data.idBo == undefined){
                getDivisionbyID(data.Bo);
            }
            else{
                getDivisionbyID(data.idBo);
            }
            // getDivisionbyID(data.idNganh);
            function getDivisionbyID(id){
                const divisionDatabyId = "http://134.209.106.33:8888/v1/ordo";
                let myHeaders = new Headers();
                let requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
                };
                fetch(divisionDatabyId + '/' + id,requestOptions)
                .then( function (response) {
                    response.json().then( function (data){
                        // console.log(data);
                        txtLop.innerHTML = `${data.Ten_KH}`;
                    })
                })
                .catch(function (err) {
                    console.log('error: ' + err);
                })
            }
        })
    })
    .catch(function (err) {
        console.log('error: ' + err);
    })
}

function editResults() {
    var editSuggest = document.getElementById("editSuggest");
    s = editSuggest.value ;
    res = document.getElementById("editResult");
    res.innerHTML = '';
    if (s == '') {
      return;
    }
    let list = '';
    const suggest = "http://134.209.106.33:8888/v1/ordo/suggest/";
    let myHeaders = new Headers();
    let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };
    fetch(suggest + s,requestOptions).then(
     function (response) {
       return response.json();
     }).then(function (data) {
       for (i=0; i<data.length; i++) {
         list += '<li >' + data[i] + '</li>';
       }
       res.innerHTML = '<ul id="test">' + list + '</ul>';
       test = document.getElementById('test');
       function getEventTarget(e) {
        e = e || window.event;
        return e.target || e.srcElement; 
        }
       test.onclick = function (event){
        var target = getEventTarget(event);
        editSuggest.value = target.innerHTML ;
        res.innerHTML = '';
       };
       if (!data.length){
        // mes.innerHTML = 'Division not found';
    }
     }).catch(function (err) {
       console.warn('Something went wrong.', err);
       return false;
     });
  }


  function viewHistoryDivisionID(id){
    historyBody.innerHTML = '';
    messageFamily.innerHTML = '' ;
    const divisionDatabyId = "http://134.209.106.33:8888/v1/familia/getHistoryFamilia";
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
                messageFamily.innerHTML = 'Empty edit history' ;
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
            const divisionID = "http://134.209.106.33:8888/v1/familia";
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
