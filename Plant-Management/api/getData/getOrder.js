function loadOrderDetail(x) {
    console.log(x);
    localStorage.setItem("idOrder",x);
    window.location.replace("orderDetail.html");
}
const orderData = "http://134.209.106.33:8888/v1/ordo?page=1";
var myHeaders = new Headers();
var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

fetch(orderData,requestOptions)
    .then(function (response){
        response.json().then(function (data) {
            var table = document.getElementById('orderBody')  
            // localStorage.setItem('divisio',data);    
            // console.log(data.totalPages)
            for (var j = 0; j < data.results.length; j++)
            {
                // console.log(data.results[j].id);
                var row = `<tr onclick="loadOrderDetail('${data.results[j].id}')">
                
                    <td>${j + 1}</td>
                    <td>${data.results[j].Ten_KH}</td>
                    <td>${data.results[j].Ten_TV}</td>
                </tr>`
                table.innerHTML += row
            }
            
            // let perPage = 10;
            function renderpagination (){
            var pagin = document.getElementById('paginationOrder')
            for(var i = 1; i <= data.totalPages; i++){
                pagin.innerHTML += '<a class="page-number" href="#">' + i + '</a>'
            }
        };
        let currentPage = 1;
        function renderdivision (page){
        var divisionDataPage = "http://134.209.106.33:8888/v1/ordo?page=" + page;
        fetch(divisionDataPage,requestOptions)
        .then(function (response){
            response.json().then(function (data) {

            var table = document.getElementById('orderBody')  
            var idShow = (page - 1) * 10 + 1
            for (var j = 0; j < data.results.length; j++)
            {
                
                var row = `<tr onclick="loadOrderDetail('${data.results[j].id}')">
                    <td>${idShow}</td>
                    <td>${data.results[j].Ten_KH}</td>
                    <td>${data.results[j].Ten_TV}</td>
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

// }
