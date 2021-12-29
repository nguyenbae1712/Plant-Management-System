function loadGenusDetail(x) {
	console.log(x);
	localStorage.setItem('idGenus', x);
	window.location.replace('genusDetail.html');
}
const genusData = 'http://134.209.106.33:8888/v1/genus?page=1';
var myHeaders = new Headers();
var requestOptions = {
	method: 'GET',
	headers: myHeaders,
	redirect: 'follow',
};
const searchFunctionGenus = (id) => {
	const input = document.getElementById(id);
	console.log('inputValue', input.value);
	console.log('inputId', id);
	if (input.value.length > 0) {
		switch (id) {
			case 'searchGenus': {
				fetch(
					`http://134.209.106.33:8888/v1/genus/searchGenus/${input.value}`,
					requestOptions,
				).then((response) => {
					response.json().then((data) => {
						console.log('data', data);
						var table = document.getElementById('genusBody');
						table.innerHTML = '';
						for (var j = 0; j < data.genuss.length; j++) {
							var row = `<tr onclick="loadGenusDetail('${data.genuss[j].id}')">
                    <td>${j + 1}</td>
                    <td>${data.genuss[j].Ten_KH}</td>
                    <td>${data.genuss[j].Ten_TV}</td>
                	</tr>`;
							table.innerHTML += row;
						}
					});
				});
			}
		}
	} else {
		fetchGenusData();
	}
};
const fetchGenusData = () => {
	let totalGenusPages = 0;
	function paginationGenus(c, m) {
		var paginationTest = document.getElementById('paginationGenus');
		paginationTest.innerHTML = '';
		var current = c,
			last = m,
			delta = 2,
			left = current - delta,
			right = current + delta + 1,
			range = [],
			rangeWithDots = [],
			l;

		for (let i = 1; i <= last; i++) {
			if (i == 1 || i == last || (i >= left && i < right)) {
				range.push(i);
			}
		}

		for (let i of range) {
			if (l) {
				if (i - l === 2) {
					rangeWithDots.push(l + 1);
					paginationTest.innerHTML += '<a class="page-number-genus" href="#">' + (l + 1) + '</a>';
				} else if (i - l !== 1) {
					rangeWithDots.push('...');
					paginationTest.innerHTML += '<a>' + '...' + '</a>';
				}
			}
			rangeWithDots.push(i);
			paginationTest.innerHTML += '<a class="page-number-genus" href="#">' + i + '</a>';
			l = i;
		}
	}

	function rendergenus(page) {
		var genusDataPage = 'http://134.209.106.33:8888/v1/genus?page=' + page;
		fetch(genusDataPage, requestOptions).then(function (response) {
			response.json().then(function (data) {
				var table = document.getElementById('genusBody');
				var idShow = (page - 1) * 10 + 1;
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

	fetch(genusData, requestOptions)
		.then(function (response) {
			response.json().then(function (data) {
				var table = document.getElementById('genusBody');
				table.innerHTML = '';
				for (var j = 0; j < data.results.length; j++) {
					var row = `<tr onclick="loadGenusDetail('${data.results[j].id}')">
                    <td>${j + 1}</td>
                    <td>${data.results[j].Ten_KH}</td>
                    <td>${data.results[j].Ten_TV}</td>
                </tr>`;
					table.innerHTML += row;
				}

				totalGenusPages = data.totalPages;
				paginationGenus(1, parseInt(totalGenusPages));

				$('.page-number-genus').click(function (e) {
					e.preventDefault();
					rendergenus($(this).text());
					paginationGenus(parseInt($(this).text()), parseInt(totalGenusPages));
					$('#add-js-file').append(`<script src="/scripts/handlePagination.js"></script>`);
				});
			});
		})
		.catch(function (err) {
			console.log('error: ' + err);
		});
};
fetchGenusData();
