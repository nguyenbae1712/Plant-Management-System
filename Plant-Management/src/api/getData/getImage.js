const getImage = "http://134.209.106.33:8888/v1/image?page=7&limit=4";
var myHeaders = new Headers();
var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

fetch(getImage,requestOptions)
    .then(function (response){
        response.json().then(function (data) {
            console.log(data.results[1].URL);
            var imageDetal = document.getElementsByClassName('imageDetal')
            for (var j = 0; j < data.results.length; j++)
            {
                var row = `
                <div class="col-12 col-sm-6 col-lg-3">
						<div class="single-product-area mb-50 wow fadeInUp" data-wow-delay="100ms">
							<!-- Product Image -->

							<div class="product-img">
								<a href="plant-details.html">
									<img style="width:250px" src="${data.results[j].URL}" />
								</a>
							</div>
							<!-- Product Info -->
							<div class="product-info mt-15 text-center">
								<a href="plant-details.html">
									<p></p>
								</a>
							</div>
						</div>
					</div>
                    `
                imageDetal[0].innerHTML += row ;
            }
            
            // let perPage = 10;
        //     function renderpagination (){
        //     var pagin = document.getElementById('paginationClass')
        //     for(var i = 1; i <= data.totalPages; i++){
        //         pagin.innerHTML += '<a class="page-number" href="#">' + i + '</a>'
        //     }
        // };
        // let currentPage = 1;
//         function renderdivision (page){
//         var classDataPage = "http://134.209.106.33:8888/v1/classis?page=" + page;
//         fetch(classDataPage,requestOptions)
//         .then(function (response){
//             response.json().then(function (data) {

//             var table = document.getElementById('classBody')  
//             var idShow = (page - 1) * 10 + 1
//             for (var j = 0; j < data.results.length; j++)
//             {
                
//                 var row = `<tr onclick="loadClassById('${data.results[j].id}')">
//                     <td>${idShow}</td>
//                     <td>${data.results[j].Ten_KH}</td>
//                     <td>${data.results[j].Ten_TV}</td>
//                 </tr>`
//                 idShow += 1
//                 if (j == 0) {
//                     table.innerHTML = row
//                 } else {
//                     table.innerHTML += row
//                 }
//             }
//         })
//     })
// };


// renderpagination();

// $('.page-number').click( function(e) {
//     e.preventDefault(); 
//     // var table = document.getElementById('divisonBody');
//     // lenTable = table.getElementsByTagName("tr").length;
//     // console.log('lenght tr '+ d)
//     // r = d.getElementsByTagName("td")[0].innerHTML;
//     // console.log(r)
//     renderdivision($(this).text());
//     return false; 
// });
})
    })
    .catch(function (err) {
        console.log('error: ' + err);
    })