function loadGenusDetail(x) {
	console.log(x);
	localStorage.setItem('idGenus', x);
	window.location.replace('genusDetail.html');
}
const genusData = 'http://134.209.106.33:8888/v1/genus?limit=20&&page=1';
var myHeaders = new Headers();
var requestOptions = {
	method: 'GET',
	headers: myHeaders,
	redirect: 'follow',
};

fetch(genusData, requestOptions)
	.then(function (response) {
		response.json().then(function (data) {
			var table = document.getElementById('genusBody');
			for (var j = 0; j < data.results.length; j++) {
				var row = `<tr onclick="loadGenusDetail('${data.results[j].id}')">
                    <td>${j + 1}</td>
                    <td>${data.results[j].Ten_KH}</td>
                    <td>${data.results[j].Ten_TV}</td>
                </tr>`;
				table.innerHTML += row;
			}

			// let perPage = 10;
			function renderpagination() {
				var pagin = document.getElementById('paginationGenus');
				for (var i = 1; i <= data.totalPages; i++) {
					pagin.innerHTML += '<a class="page-number" href="#">' + i + '</a>';
				}
			}
			let currentPage = 1;
			function renderdivision(page) {
				var genusDataPage = 'http://134.209.106.33:8888/v1/genus?limit=20&&page=' + page;
				fetch(genusDataPage, requestOptions).then(function (response) {
					response.json().then(function (data) {
						var table = document.getElementById('genusBody');
						var idShow = (page - 1) * 20 + 1;
						for (var j = 0; j < data.results.length; j++) {
							var row = `<tr onclick="loadGenusDetail('${data.results[j].id}')">
                    <td>${idShow}</td>
                    <td>${data.results[j].Ten_KH}</td>
                    <td>${data.results[j].Ten_TV}</td>
                </tr>`;
							idShow += 1;
							if (j == 0) {
								table.innerHTML = row;
							} else {
								table.innerHTML += row;
							}
						}
					});
				});
			}

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
		});
	})
	.catch(function (err) {
		console.log('error: ' + err);
	});

// }
