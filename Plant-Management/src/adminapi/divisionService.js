function loadDivsionDetail(x) {
    console.log(x);
    // localStorage.setItem("idDivision",x);
    // window.location.replace("divisionDetail.html");
}

function deleteDivision(){
    alert("ok");
    window.location.reload();
}

function addDivision(){
    // var ID = document.getElementById('addID').value;
    var tenKH = document.getElementById('addTenKh').value;
    var tenTV = document.getElementById('addTenTV').value;
    var mota = document.getElementById('addMota').value;
    var formData ={
        Ten_KH : tenKH,
        Ten_Latin :tenTV,
        Mo_Ta : mota ,
    };
    console.log(formData);
    addDivisionApi(formData);
}
function addDivisionApi(data){
    const division = "http://134.209.106.33:8888/v1/divisio";
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTdhY2M5YmM3MjI2NzAwMmYwNWI2ZGIiLCJpYXQiOjE2MzU0NDEyODUsImV4cCI6MTYzNTQ0NDg4NSwidHlwZSI6ImFjY2VzcyJ9.-0okY8gs2m-LPdhVHEi5JqYLLBcD2GqMRPzkv8LQlZU");
    let addOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(data),
      };

      fetch(division,addOptions)
      .then(function (response){     
        response.json();
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
                var row = `<tr onclick="loadDivsionDetail('${data.results[j].id}')">
                
                    <td>${j + 1}</td>
                    <td>${data.results[j].id}</td>
                    <td>${data.results[j].Ten_KH}</td>
                    <td>${data.results[j].Ten_TV}</td>
                    <td style = "width: 130px;">
                    <button onclick="getDivisionbyID('${data.results[j].id}')" type="button" data-toggle="modal" data-target="#edit" class="update btn btn-warning btn-sm"><span class="glyphicon glyphicon-pencil"></span></button>
		            <button type="button" data-toggle="modal" data-target="#delete" class="delete btn btn-danger btn-sm"><span class="glyphicon glyphicon-trash"></span></button></td>
                </tr>`
                table.innerHTML += row
            }
            
            // let perPage = 10;
            function renderpagination (){
            var pagin = document.getElementById('paginationDivision')
            for(var i = 1; i <= data.totalPages; i++){
                pagin.innerHTML += '<a class="page-number" href="#">' + i + '</a>'
            }
        };
        let currentPage = 1;
        function renderdivision (page){
        var divisionDataPage = "http://134.209.106.33:8888/v1/divisio?page=" + page;
        fetch(divisionDataPage,requestOptions)
        .then(function (response){
            response.json().then(function (data) {

            var table = document.getElementById('divisionBody')  
            var idShow = (page - 1) * 10 + 1
            for (var j = 0; j < data.results.length; j++)
            {
                
                var row = `<tr onclick="loadDivsionDetail('${data.results[j].id}')">
                    <td>${idShow}</td>
                    <td>${data.results[j].id}</td>
                    <td>${data.results[j].Ten_KH}</td>
                    <td>${data.results[j].Ten_TV}</td>
                    <td style = "width: 130px;">
                    <button onclick="getDivisionbyID('${data.results[j].id}')" type="button" data-toggle="modal" data-target="#edit" class="update btn btn-warning btn-sm"><span class="glyphicon glyphicon-pencil"></span></button>
                    <button type="button" data-toggle="modal" data-target="#delete" class="delete btn btn-danger btn-sm"><span class="glyphicon glyphicon-trash"></span></button>
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
    // var table = document.getElementById('divisonBody');
    // lenTable = table.getElementsByTagName("tr").length;
    // console.log('lenght tr '+ d)
    // r = d.getElementsByTagName("td")[0].innerHTML;
    // console.log(r)
    renderdivision($(this).text());
    return false; 
});
})
    })
    .catch(function (err) {
        console.log('error: ' + err);
    })

// }

function getDivisionbyID(id){
    // let txtID = document.getElementById('txtID') ;
    // let txtTenKH = document.getElementById('txtTenKH').value ;
    // let txtTenTV = document.getElementById('txtTenTV').value ;
    // let txtMota = document.getElementById('txtMota').value ;

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
            console.log(data.id);
            txtID.innerHTML = `${data.id}`;
            txtTenKH.innerHTML = `${data.Ten_KH}`;
            txtTenTV.innerHTML = `${data.Ten_TV}`;
            txtMota.innerHTML = `${data.Mo_ta}`;
        })
    })
    .catch(function (err) {
        console.log('error: ' + err);
    })
}