function myFunction(x) {
    tenKH = x.getElementsByTagName('td')[1].innerHTML;
    console.log('tenKH: ' + tenKH);
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
            var table = document.getElementById('divisonBody')  
            // localStorage.setItem('divisio',data);    
            console.log(data.totalPages)
            for (var j = 0; j < data.results.length; j++)
            {
                var row = `<tr onclick="myFunction(this)">
                    <td>${j + 1}</td>
                    <td>${data.results[j].Ten_KH}</td>
                    <td>${data.results[j].Ten_TV}</td>
                </tr>`
                table.innerHTML += row
            }
            
            let perPage = 10;
            // var division = JSON.parse(JSON.stringify(localStorage.getItem('divisio')))
            function renderpagination (){
            var pagin = document.getElementById('pagination')
            // pagin.innerHTML += '<a href="#"> << </a>'
            // console.log(division.totalPages)
            for(var i = 1; i <= data.totalPages; i++){
                pagin.innerHTML += '<a class="page-number" href="#">' + i + '</a>'
            }
            // pagin.innerHTML += '<a href="#"> >> </a>'
        };
        let currentPage = 1;
        function renderdivision (page){
        var divisionDataPage = "http://134.209.106.33:8888/v1/divisio?page=" + page;
        fetch(divisionDataPage,requestOptions)
        .then(function (response){
            response.json().then(function (data) {

            // localStorage.setItem("division", JSON.stringify(data))

            var table = document.getElementById('divisonBody')  
            var idShow = (page - 1) * 10 + 1
            for (var j = 0; j < data.results.length; j++)
            {
                
                var row = `<tr onclick="myFunction(this)">
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




