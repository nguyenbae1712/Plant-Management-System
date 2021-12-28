tokens = myLocalStorage.getItem(TOKENS);
const accessToken = tokens.access.token ;
function deleteDivisionID(id){
    var btnDelele = document.getElementById('btnDelete');
    const userProfile = myLocalStorage.getItem(USER_PROFILE);
    const eraser = userProfile.name;
    btnDelele.addEventListener('click' , async (e) => {
        e.preventDefault();
        function deleteDivisionApi(id ,eraser){
            const divisionID = "http://134.209.106.33:8888/v1/species";
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
    var addTenKh = document.getElementById('addTenKh').value;
    var addTenTV = document.getElementById('addTenTV').value;
    var addDacdiem = document.getElementById('addDacdiem').value;
    var addSinhhoc = document.getElementById('addSinhhoc').value;
    var addPhanbo = document.getElementById('addPhanbo').value;
    var addGiatri = document.getElementById('addGiatri').value;
    var addTinhtrang = document.getElementById('addTinhtrang').value;
    var addBienphap = document.getElementById('addBienphap').value;
    var addDangsong = document.getElementById('addDangsong').value;
    var divisionSuggest = document.getElementById('divisionSuggest').value;
    var myHeaders = new Headers();

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch("http://134.209.106.33:8888/v1/genus/getByName" + '/' + divisionSuggest, requestOptions)
    .then( function (response) {
        response.json().then ( function (data) {
            console.log(data);
            var divisioId = data[0].id ;       
            var formData = {
                Ten_KH : addTenKh,
                Ten_TV :addTenTV,
                Dac_Diem_Nhan_Dang : addDacdiem ,
                Sinh_Hoc_Sinh_Thai : addSinhhoc,
                Phan_Bo : addPhanbo,
                Gia_Tri : addGiatri,
                Tinh_Trang : addTinhtrang ,
                Bien_Phap_BV : addBienphap,
                Dang_Song : addDangsong,
                idChi : divisioId,
            };
            addDivisionApi(formData);
            console.log(formData);
        })
    })
}

function showResults() {
    var edValue = document.getElementById("divisionSuggest");

    var s = edValue.value;
    // console.log(s);
    mes = document.getElementById("message");
    res = document.getElementById("resultSuggest");
    res.innerHTML = '';
    if (s == '') {
      return;
    }
    let list = '';
    const suggest = "http://134.209.106.33:8888/v1/genus/suggest/";
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
    const divisionID = "http://134.209.106.33:8888/v1/species";
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

const divisionData = "http://134.209.106.33:8888/v1/species?page=1";
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
                paginationTest.innerHTML += '<a class="page-number-order" href="#">' + (l + 1) + '</a>';
            } else if (i - l !== 1) {
                rangeWithDots.push('...');
                paginationTest.innerHTML += '<a>' + '...' + '</a>';
            }
        }
        rangeWithDots.push(i);
        paginationTest.innerHTML += '<a class="page-number-order" href="#">' + i + '</a>';
        l = i;
    }
    // console.log('form getOrder: ' + rangeWithDots)
}

function renderdivision (page){
    var divisionDataPage = "http://134.209.106.33:8888/v1/species?page=" + page;
    fetch(divisionDataPage,requestOptions)
    .then(function (response){
        response.json().then(function (data) {

        var table = document.getElementById('divisionBody')  
        var idShow = (page - 1) * 10 + 1
        for (var j = 0; j < data.results.length; j++)
        {
            if (data.results[j].Ten_TV != undefined){
                var row = `<tr>
                <td>${idShow}</td>
                <td>${data.results[j].id}</td>
                <td data-toggle="modal" data-target="#view" onclick="getClassbyID('${data.results[j].id}')">${data.results[j].Ten_KH}</td>
                <td>${data.results[j].Ten_TV}</td>
                <td style = "width: 150px; text-align: center">
                    <button onclick="editDivisionbyID('${data.results[j].id}')" type="button" data-toggle="modal" data-target="#edit" class="update btn-warning btn-sm"><span class="glyphicon glyphicon-pencil"></span></button>
                    <button onclick="viewHistoryDivisionID('${data.results[j].id}')" type="button" data-toggle="modal" data-target="#viewHistory" class="btn-primary btn-sm"><i class="fa fa-history" aria-hidden="true"></i></button>
		            <button onclick="deleteDivisionID('${data.results[j].id}')" type="button" data-toggle="modal" data-target="#delete" class="delete btn-danger btn-sm"><span class="glyphicon glyphicon-trash"></span></button>
                    </td>
                <tr>`
        }
        else { var row = `<tr>
                <td>${idShow}</td>
                <td>${data.results[j].id}</td>
                <td data-toggle="modal" data-target="#view" onclick="getClassbyID('${data.results[j].id}')">${data.results[j].Ten_KH}</td>
                <td>Chưa có thông tin</td>
                <td style = "width: 150px; text-align: center">
                    <button onclick="editDivisionbyID('${data.results[j].id}')" type="button" data-toggle="modal" data-target="#edit" class="update btn-warning btn-sm"><span class="glyphicon glyphicon-pencil"></span></button>
                    <button onclick="viewHistoryDivisionID('${data.results[j].id}')" type="button" data-toggle="modal" data-target="#viewHistory" class="btn-primary btn-sm"><i class="fa fa-history" aria-hidden="true"></i></button>
		            <button onclick="deleteDivisionID('${data.results[j].id}')" type="button" data-toggle="modal" data-target="#delete" class="delete btn-danger btn-sm"><span class="glyphicon glyphicon-trash"></span></button>
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

fetch(divisionData,requestOptions)
    .then(function (response){
        response.json().then(function (data) {
            localStorage.setItem('totalPages', data.totalPages);
            localStorage.setItem('totalPages', data.totalPages);
            var table = document.getElementById('divisionBody')
            for (var j = 0; j < data.results.length; j++)
            {
                if (data.results[j].Ten_Latin == undefined){
                    var row = `<tr>
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
                    if (data.results[j].Ten_TV == undefined){
                        var row = `<tr>
                    <td>${j + 1}</td>
                    <td>${data.results[j].id}</td>
                    <td data-toggle="modal" data-target="#view" onclick="getClassbyID('${data.results[j].id}')">${data.results[j].Ten_KH}</td>
                    <td>Chưa có thông tin</td>
                    <td style = "width: 150px; text-align: center">
                    <button onclick="editDivisionbyID('${data.results[j].id}')" type="button" data-toggle="modal" data-target="#edit" class="update btn-warning btn-sm"><span class="glyphicon glyphicon-pencil"></span></button>
                    <button onclick="viewHistoryDivisionID('${data.results[j].id}')" type="button" data-toggle="modal" data-target="#viewHistory" class="btn-primary btn-sm"><i class="fa fa-history" aria-hidden="true"></i></button>
		            <button onclick="deleteDivisionID('${data.results[j].id}')" type="button" data-toggle="modal" data-target="#delete" class="delete btn-danger btn-sm"><span class="glyphicon glyphicon-trash"></span></button>
                    </td>
                </tr>`
                    }
                }
                
                else{
                    var row = `<tr onclick="loadSpeciesById('${data.results[j].id}')"  >
                    <td>${idShow}</td>
                    <td>${data.results[j].id}</td>
                    <td>${data.results[j].Ten_KH}</td>
                    <td>${data.results[j].Ten_Latin}</td>
                </tr>`
                }
                table.innerHTML += row
            }
            
            totalPages = data.totalPages;

            pagination(1, parseInt(data.totalPages));

            $('.page-number-order').click(function (e) {
                e.preventDefault();
                console.log('pagin clicked on ' + $(this).text())
                renderdivision($(this).text());
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
        const divisionID = "http://134.209.106.33:8888/v1/species";
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
            };
        fetch(divisionID + '/' + id,requestOptions)
        .then(function (response){     
            response.json().then( function (data){
            console.log(data);
            getImage(id);
            editID.innerHTML = `${data.id}`;
            editTenKH.innerHTML = `${data.Ten_KH}`;
            if( data.Ten_TV == undefined){
                editTenTV.innerHTML = `Chưa có thông tin`;
            }
            else{
                editTenTV.innerHTML = `${data.Ten_TV}`;
            }
            if (data.idChi != 404){
                getDivisionbyID(data.idChi);
                }
            else{
                editSuggest.innerHTML = `Chưa có thông tin`;
            }
            if (data.Dac_Diem_Nhan_Dang == undefined){
                editDacdiem.innerHTML = `Chưa có thông tin`;
            }
            else { 
                editDacdiem.innerHTML = `${data.Dac_Diem_Nhan_Dang}`;
            }
            if (data.Sinh_Hoc_Sinh_Thai == undefined){
                editSinhhoc.innerHTML = `Chưa có thông tin`;
            }
            else { 
                editSinhhoc.innerHTML = `${data.Sinh_Hoc_Sinh_Thai}`;
            }
            if (data.Phan_Bo == undefined){
                editPhanbo.innerHTML = `Chưa có thông tin`;
            }
            else { 
                editPhanbo.innerHTML = `${data.Phan_Bo}`;
            }
            if (data.Gia_Tri == undefined){
                editGiatri.innerHTML = `Chưa có thông tin`;
            }
            else { 
                editGiatri.innerHTML = `${data.Gia_Tri}`;
            }
            if (data.Tinh_Trang == undefined){
                editTinhtrang.innerHTML = `Chưa có thông tin`;
            }
            else { 
                editTinhtrang.innerHTML = `${data.Tinh_Trang}`;
            }
            if (data.Bien_Phap_BV == undefined){
                editBaove.innerHTML = `Chưa có thông tin`;
            }
            else { 
                editBaove.innerHTML = `${data.Bien_Phap_BV}`;
            }
            if (data.Dang_Song == undefined){
                editDangsong.innerHTML = `Chưa có thông tin`;
            }
            else { 
                editDangsong.innerHTML = `${data.Dang_Song}`;
            }
            function getDivisionbyID(id){
                const divisionDatabyId = "http://134.209.106.33:8888/v1/genus";
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
            let tenKH = document.getElementById('editTenKH').value;
            let tenTV = document.getElementById('editTenTV').value;
            let editNganh = document.getElementById('editSuggest').value;
            let dacdiem = document.getElementById('editDacdiem').value;
            let sinhhoc = document.getElementById('editSinhhoc').value;
            let phanbo = document.getElementById('editPhanbo').value;
            let giatri = document.getElementById('editGiatri').value;
            let tinhtrang = document.getElementById('editTinhtrang').value;
            let baove = document.getElementById('editBaove').value;
            let dangsong = document.getElementById('editDangsong').value;
            var myHeaders = new Headers();
                var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
                };
                console.log(editNganh);
                fetch("http://134.209.106.33:8888/v1/genus/getByName" + '/' + editNganh, requestOptions)
                .then( function (response) {
                    response.json().then ( function (data) {
                        console.log(data);
                        var divisioId = data[0].id ;       
                        var formData ={
                            Ten_KH : tenKH,
                            Ten_TV :tenTV,
                            Dac_Diem_Nhan_Dang : dacdiem,
                            Sinh_Hoc_Sinh_Thai : sinhhoc,
                            Phan_Bo : phanbo,
                            Gia_Tri : giatri,
                            Tinh_Trang : tinhtrang,
                            Bien_Phap_BV : baove,
                            Dang_Song : dangsong,
                            idChi : divisioId
                            };
                        console.log(id);
                        console.log(formData);
                        const divisionID = "http://134.209.106.33:8888/v1/species";
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
    const divisionDatabyId = "http://134.209.106.33:8888/v1/species";
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
            getImage(id);
                txtID.innerHTML = `${data.id}`;
                txtTenKH.innerHTML = `${data.Ten_KH}`;
                txtTenTV.innerHTML =`${data.Ten_TV}`;
            if (data.Ten_TV == undefined){
                txtTenTV.innerHTML = `Chưa có thông tin`;
            }
            if (data.Dac_Diem_Nhan_Dang == undefined){
                txtDacdiem.innerHTML = `Chưa có thông tin`;
            }
            else { 
                txtDacdiem.innerHTML = `${data.Dac_Diem_Nhan_Dang}`;
            }
            if (data.idChi != 404){
            getDivisionbyID(data.idChi);
            }
            else{
                txtChi.innerHTML = `Chưa có thông tin`;
            }
            if (data.Sinh_Hoc_Sinh_Thai == undefined){
                txtSinhhoc.innerHTML = `Chưa có thông tin`;
            }
            else { 
                txtSinhhoc.innerHTML = `${data.Sinh_Hoc_Sinh_Thai}`;
            }
            if (data.Phan_Bo == undefined){
                txtPhanbo.innerHTML = `Chưa có thông tin`;
            }
            else { 
                txtPhanbo.innerHTML = `${data.Phan_Bo}`;
            }
            if (data.Gia_Tri == undefined){
                txtGiatri.innerHTML = `Chưa có thông tin`;
            }
            else { 
                txtGiatri.innerHTML = `${data.Gia_Tri}`;
            }
            if (data.Tinh_Trang == undefined){
                txtTinhtrang.innerHTML = `Chưa có thông tin`;
            }
            else { 
                txtTinhtrang.innerHTML = `${data.Tinh_Trang}`;
            }
            if (data.Bien_Phap_BV == undefined){
                txtBaove.innerHTML = `Chưa có thông tin`;
            }
            else { 
                txtBaove.innerHTML = `${data.Bien_Phap_BV}`;
            }
            if (data.Dang_Song == undefined){
                txtDangsong.innerHTML = `Chưa có thông tin`;
            }
            else { 
                txtDangsong.innerHTML = `${data.Dang_Song}`;
            }
            function getDivisionbyID(id){
                const divisionDatabyId = "http://134.209.106.33:8888/v1/genus";
                let myHeaders = new Headers();
                let requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
                };
                fetch(divisionDatabyId + '/' + id,requestOptions)
                .then( function (response) {
                    response.json().then( function (data){
                        txtChi.innerHTML = `${data.Ten_KH}`;
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
    const suggest = "http://134.209.106.33:8888/v1/genus/suggest/";
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
    }
     }).catch(function (err) {
       console.warn('Something went wrong.', err);
       return false;
     });
  }

function getImage(a){
      const GenusAPI = "http://134.209.106.33:8888/v1/image/getByIdLoai"
      var myHeaders = new Headers();
      var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
      };
  
      fetch(GenusAPI + '/' + a,requestOptions)
      .then( function (response){
            if(response.status == 200){
                response.text().then( function (data){
                    console.log(data)
                    image.innerHTML = `<img src="${data}">`;
                    imageEdit.innerHTML = `<img src="${data}">`;
                }
                )
            }
            else{
                image.innerHTML = `<h5>Chưa có hình ảnh</h5>`;
                imageEdit.innerHTML = `
                <button style="margin-left: 20px" onclick="addImageforSpecies('${a}')" type="button" data-toggle="modal" data-target="#addImage" class="btn-sm"><i class="fa fa-camera-retro" aria-hidden="true"></i></button>`;
            }
      })
}

function viewHistoryDivisionID(id){
    historyBody.innerHTML = '';
    messageSpecie.innerHTML = '' ;
    const divisionDatabyId = "http://134.209.106.33:8888/v1/species/getHistorySpecies";
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
                messageSpecie.innerHTML = 'Empty edit history' ;
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
            const divisionID = "http://134.209.106.33:8888/v1/species";
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

function addImageforSpecies(id){
    console.log(id);
    let btnImage = document.getElementById('btnAddImage');
    btnImage.addEventListener('click', (e) => {
        e.preventDefault();
        let urlImage = document.getElementById('AddImageURL').value;
        let formData = {
        URL : urlImage,
        idLoai : id
    }
    console.log(formData);
        const imageData = "http://134.209.106.33:8888/v1/image";
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokens.access.token}`
        }
        let addOptions = {
            method: 'POST',
            headers,
            body: JSON.stringify(formData),
        };
        fetch(imageData,addOptions)
        .then( function (response){
            response.json();
            alert("Successfully Added");
            window.location.reload();
        })
        .catch((err) => {
            console.log(err);
        })
    })
}