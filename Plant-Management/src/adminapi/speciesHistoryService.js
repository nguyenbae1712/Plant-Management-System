tokens = myLocalStorage.getItem(TOKENS);
const accessToken = tokens.access.token ;
console.log(accessToken);
function deleteDivisionID(id){
    var btnDelele = document.getElementById('btnDelete');
    btnDelele.addEventListener('click' , async (e) => {
        e.preventDefault();
        function deleteDivisionApi(id){
            const divisionID = "http://134.209.106.33:8888/v1/species";
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokens.access.token}`
            }
            let addOptions = {
                method: 'DELETE',
                headers
              };
        
              fetch(divisionID + '/' + id,addOptions)
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

function restoreDivisionbyID(id){
    var btnDelele = document.getElementById('btnRestore');
    btnDelele.addEventListener('click' , async (e) => {
        e.preventDefault();
        function restoreDivisionApi(id) {
            const divisionID = "http://134.209.106.33:8888/v1/species/restore";
            const headers = new Headers();
            let addOptions = {
                method: 'PATCH',
                headers
            };
        
            fetch(divisionID + '/' + id ,addOptions)
            .then(function (response){     
            response.text();
            alert("Successfully Restore");
            window.location.reload();
            })
            .catch((err) => {
            console.log(err);
            });
        }
        restoreDivisionApi(id);
    })
}




const divisionData = "http://134.209.106.33:8888/v1/species?deleted=1&page=1";
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
                <td>${data.results[j].deletedBy}</td>
                <td>${data.results[j].deletedAt}</td>
                <td style = "width: 100px; text-align: center">
                <button onclick="restoreDivisionbyID('${data.results[j].id}')" type="button" data-toggle="modal" data-target="#restore" class="btn-info btn-sm"><span class="glyphicon glyphicon-repeat"></span></button>
                <button onclick="deleteDivisionID('${data.results[j].id}')" type="button" data-toggle="modal" data-target="#delete" class="delete btn-danger btn-sm"><span class="glyphicon glyphicon-trash"></span></button></td>
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
        var divisionDataPage = "http://134.209.106.33:8888/v1/species?deleted=1&page=" + page;
        fetch(divisionDataPage,requestOptions)
        .then(function (response){
            response.json().then(function (data) {

            var table = document.getElementById('divisionBody')  
            var idShow = (page - 1) * 10 + 1
            for (var j = 0; j < data.results.length; j++)
            {
                    var row = `<tr>
                    <td>${j + 1}</td>
                    <td>${data.results[j].id}</td>
                    <td data-toggle="modal" data-target="#view" onclick="getDivisionbyID('${data.results[j].id}')">${data.results[j].Ten_KH}</td>
                    <td>${data.results[j].Ten_TV}</td>
                    <td>${data.results[j].deletedBy}</td>
                    <td>${data.results[j].deletedAt}</td>
                    <td style = "width: 100px; text-align: center">
                    <button onclick="restoreDivisionbyID('${data.results[j].id}')" type="button" data-toggle="modal" data-target="#restore" class="btn-info btn-sm"><span class="glyphicon glyphicon-repeat"></span></button>
                    <button onclick="deleteDivisionID('${data.results[j].id}')" type="button" data-toggle="modal" data-target="#delete" class="delete btn-danger btn-sm"><span class="glyphicon glyphicon-trash"></span></button></td>
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
function getDivisionbyID(id){
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
                    txtBo.innerHTML = `Chưa có thông tin`;
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
                            txtBo.innerHTML = `${data.Ten_KH}`;
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
                  imageHistory.innerHTML = `<img src="${data}">`;
              }
              )
          }
          else{imageHistory.innerHTML = `<h5>Chưa có hình ảnh</h5>`;}
    })
}
