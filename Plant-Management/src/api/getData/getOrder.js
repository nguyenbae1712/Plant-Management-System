function loadOrderById(x) {
	console.log(x);
	localStorage.setItem('idOrder', x);
	window.location.replace('orderDetail.html');
}
const orderData = 'http://134.209.106.33:8888/v1/ordo?page=1';
var myHeaders = new Headers();
var requestOptions = {
	method: 'GET',
	headers: myHeaders,
	redirect: 'follow',
};
const searchFunctionOrder = (id) => {
	const input = document.getElementById(id);
	console.log('inputValue', input.value);
	console.log('inputId', id);
	if (input.value.length > 0) {
		switch (id) {
			case 'searchOrder': {
				fetch(`http://134.209.106.33:8888/v1/ordo/searchOrder/${input.value}`, requestOptions).then(
					(response) => {
						response.json().then((data) => {
							console.log('data', data);
							var table = document.getElementById('orderBody');
							table.innerHTML = '';
							for (var j = 0; j < data.orders.length; j++) {
								var row = `<tr onclick="loadOrderById('${data.orders[j].id}')">
                    <td>${j + 1}</td>
                    <td>${data.orders[j].Ten_KH}</td>
                    <td>${data.orders[j].Ten_TV}</td>
                	</tr>`;
								table.innerHTML += row;
							}
						});
					},
				);
			}
		}
	} else {
		fetchOrderData();
	}
};
// const fetchOrderData = () => {
	let totalOrderPages = 0; // thằng ni là để bên file handlePagination gọi luôn

	function pagination(c, m) {
		var paginationTest = document.getElementById('paginationOrder');
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
					paginationTest.innerHTML += '<a class="page-number-order" href="#">' + (l + 1) + '</a>';
				} else if (i - l !== 1) {
					rangeWithDots.push('...');
					paginationTest.innerHTML += '<a>' + '...' + '</a>';
				}
			}
			rangeWithDots.push(i);
			paginationTest.innerHTML += '<a class="page-number-order" href="#">' + i + '</a>';
			l = i;
		}
		console.log('form getOrder: ' + rangeWithDots);
	}

	function renderOrder(page) {
		var classDataPage = 'http://134.209.106.33:8888/v1/ordo?page=' + page;
		fetch(classDataPage, requestOptions).then(function (response) {
			response.json().then(function (data) {
				var table = document.getElementById('orderBody');
				var idShow = (page - 1) * 10 + 1;
				for (var j = 0; j < data.results.length; j++) {
					var row = `<tr onclick="loadOrderById('${data.results[j].id}')">
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

	fetch(orderData, requestOptions)
		.then(function (response) {
			response.json().then(function (data) {
				var table = document.getElementById('orderBody');
				table.innerHTML = '';
				for (var j = 0; j < data.results.length; j++) {
					var row = `<tr onclick="loadOrderById('${data.results[j].id}')">
                    <td>${j + 1}</td>
                    <td>${data.results[j].Ten_KH}</td>
                    <td>${data.results[j].Ten_TV}</td>
                </tr>`;
					table.innerHTML += row;
				}

				totalOrderPages = data.totalPages;

				pagination(1, parseInt(totalOrderPages));

				$('.page-number-order').click(function (e) {
					e.preventDefault();
					console.log('pagin clicked on ' + $(this).text());
					renderOrder($(this).text());
					pagination(parseInt($(this).text()), parseInt(data.totalPages));
					$('#add-js-file').append(`<script src="/scripts/handlePagination.js"></script>`);
				});
			});
		})
		.catch(function (err) {
			console.log('error: ' + err);
		});
// };
// fetchOrderData();
