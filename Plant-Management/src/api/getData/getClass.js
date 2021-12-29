function loadClassById(x) {
	console.log(x);
	localStorage.setItem('idClass', x);
	window.location.replace('classDetail.html');
}
const classData = 'http://134.209.106.33:8888/v1/classis?page=1';
var myHeaders = new Headers();
var requestOptions = {
	method: 'GET',
	headers: myHeaders,
	redirect: 'follow',
};

const searchFunctionClass = (id) => {
	const input = document.getElementById(id);
	console.log('inputValue', input.value);
	console.log('inputId', id);
	if (input.value.length > 0) {
		switch (id) {
			case 'searchClass': {
				console.log('true');
				fetch(
					`http://134.209.106.33:8888/v1/classis/searchClassis/${input.value}`,
					requestOptions,
				).then((response) => {
					response.json().then((data) => {
						console.log('data', data);
						var table = document.getElementById('classBody');
						table.innerHTML = '';
						for (var j = 0; j < data.classiss.length; j++) {
							var row = `<tr onclick="loadClassById('${data.classiss[j].id}')">
                
                    <td>${j + 1}</td>
                    <td>${data.classiss[j].Ten_KH}</td>
                    <td>${data.classiss[j].Ten_TV}</td>
                	</tr>`;
							table.innerHTML += row;
						}
					});
				});
			}
		}
	} else {
		fetchClassData();
	}
};

const fetchClassData = () => {
	fetch(classData, requestOptions)
		.then(function (response) {
			response.json().then(function (data) {
				var table = document.getElementById('classBody');
				table.innerHTML = '';
				for (var j = 0; j < data.results.length; j++) {
					var row = `<tr onclick="loadClassById('${data.results[j].id}')">
                    <td>${j + 1}</td>
                    <td>${data.results[j].Ten_KH}</td>
                    <td>${data.results[j].Ten_TV}</td>
                </tr>`;
					table.innerHTML += row;
				}

				// let perPage = 10;
				function renderpagination() {
					var pagin = document.getElementById('paginationClass');
					pagin.innerHTML = '';
					for (var i = 1; i <= data.totalPages; i++) {
						pagin.innerHTML += '<a class="page-number" href="#">' + i + '</a>';
					}
				}
				let currentPage = 1;
				function renderdivision(page) {
					var classDataPage = 'http://134.209.106.33:8888/v1/classis?page=' + page;
					fetch(classDataPage, requestOptions).then(function (response) {
						response.json().then(function (data) {
							var table = document.getElementById('classBody');
							var idShow = (page - 1) * 10 + 1;
							for (var j = 0; j < data.results.length; j++) {
								var row = `<tr onclick="loadClassById('${data.results[j].id}')">
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
fetchClassData();
