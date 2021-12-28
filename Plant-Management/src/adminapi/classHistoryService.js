tokens = myLocalStorage.getItem(TOKENS);
const accessToken = tokens.access.token ;
console.log(accessToken);
function deleteDivisionID(id){
    var btnDelele = document.getElementById('btnDelete');
    btnDelele.addEventListener('click' , async (e) => {
        e.preventDefault();
        function deleteDivisionApi(id){
            const divisionID = "http://134.209.106.33:8888/v1/classis";
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
            const divisionID = "http://134.209.106.33:8888/v1/classis/restore";
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




const divisionData = "http://134.209.106.33:8888/v1/classis?deleted=1&page=1";
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
        var divisionDataPage = "http://134.209.106.33:8888/v1/classis?deleted=1&page=" + page;
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
    const divisionDatabyId = "http://134.209.106.33:8888/v1/classis";
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
