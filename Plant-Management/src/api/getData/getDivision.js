function loadDivsionDetail(x) {
	console.log(x);
	localStorage.setItem('idDivision', x);
	window.location.replace('divisionDetail.html');
}
const divisionData = 'http://134.209.106.33:8888/v1/divisio?page=1';
var myHeaders = new Headers();
var requestOptions = {
	method: 'GET',
	headers: myHeaders,
	redirect: 'follow',
};

const searchFunctionDivision = (id) => {
	const input = document.getElementById(id);
	console.log('inputValue', input.value);
	console.log('inputId', id);
	if (input.value.length > 0) {
		switch (id) {
			case 'searchDivision': {
				fetch(
					`http://134.209.106.33:8888/v1/divisio/searchDivisio/${input.value}`,
					requestOptions,
				).then((response) => {
					response.json().then((data) => {
						console.log('data', data);
						var table = document.getElementById('divisonBody');
						table.innerHTML = '';
						for (var j = 0; j < data.divisios.length; j++) {
							var row = `<tr onclick="loadDivsionDetail('${data.divisios[j].id}')">
                
                    <td>${j + 1}</td>
                    <td>${data.divisios[j].Ten_KH}</td>
                    <td>${data.divisios[j].Ten_TV}</td>
                	</tr>`;
							table.innerHTML += row;
						}
					});
				});
			}
		}
	} else {
		fetchDivisionData();
	}
};

const fetchDivisionData = () => {
	fetch(divisionData, requestOptions)
		.then(function (response) {
			response.json().then(function (data) {
				var table = document.getElementById('divisonBody');
				table.innerHTML = '';
				for (var j = 0; j < data.results.length; j++) {
					var row = `<tr onclick="loadDivsionDetail('${data.results[j].id}')">
                    <td>${j + 1}</td>
                    <td>${data.results[j].Ten_KH}</td>
                    <td>${data.results[j].Ten_TV}</td>
                </tr>`;
					table.innerHTML += row;
				}

				// let perPage = 10;
				function renderpagination() {
					var pagin = document.getElementById('pagination');
					pagin.innerHTML = '';
					for (var i = 1; i <= data.totalPages; i++) {
						pagin.innerHTML += '<a class="page-number" href="#">' + i + '</a>';
					}
				}
				let currentPage = 1;
				function renderdivision(page) {
					var divisionDataPage = 'http://134.209.106.33:8888/v1/divisio?page=' + page;
					fetch(divisionDataPage, requestOptions).then(function (response) {
						response.json().then(function (data) {
							var table = document.getElementById('divisonBody');
							var idShow = (page - 1) * 10 + 1;
							for (var j = 0; j < data.results.length; j++) {
								var row = `<tr onclick="loadDivsionDetail('${data.results[j].id}')">
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
};
fetchDivisionData();
