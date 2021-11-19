function loadDivsionDetail(x) {
    console.log(x);
    localStorage.setItem("idDivision", x);
    window.location.replace("divisionDetail.html");
}
// document.getElementById('divisioClick').onclick = function () {
//     getDivision();
// }
// function getDivision() {
const divisionData = "http://134.209.106.33:8888/v1/divisio?page=1";
var myHeaders = new Headers();
var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

fetch(divisionData, requestOptions)
    .then(function (response) {
        response.json().then(function (data) {
            var table = document.getElementById('divisonBody')
            // localStorage.setItem('divisio',data);    
            // console.log(data.totalPages)
            for (var j = 0; j < data.results.length; j++) {
                // console.log(data.results[j].id);
                var row = `<tr onclick="loadDivsionDetail('${data.results[j].id}')">
                
                    <td>${j + 1}</td>
                    <td>${data.results[j].Ten_KH}</td>
                    <td>${data.results[j].Ten_TV}</td>
                </tr>`
                table.innerHTML += row
            }

            // let perPage = 10;
            function renderpagination() {
                var pagin = document.getElementById('pagination')
                for (var i = 1; i <= data.totalPages; i++) {
                    pagin.innerHTML += '<a class="page-number" href="#">' + i + '</a>'
                }
            };
            let currentPage = 1;
            function renderdivision(page) {
                var divisionDataPage = "http://134.209.106.33:8888/v1/divisio?page=" + page;
                fetch(divisionDataPage, requestOptions)
                    .then(function (response) {
                        response.json().then(function (data) {

                            var table = document.getElementById('divisonBody')
                            var idShow = (page - 1) * 10 + 1
                            for (var j = 0; j < data.results.length; j++) {

                                var row = `<tr onclick="loadDivsionDetail('${data.results[j].id}')">
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

            $('.page-number').click(function (e) {
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
