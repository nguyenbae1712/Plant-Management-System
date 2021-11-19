function loadSpeciesDetail(x) {
	console.log(x);
	localStorage.setItem('idSpecies', x);
	window.location.replace('plant-details.html');
}
const speciesData = 'http://134.209.106.33:8888/v1/species?page=1';
var myHeaders = new Headers();
var requestOptions = {
	method: 'GET',
	headers: myHeaders,
	redirect: 'follow',
};

let totalSpeciesPage = 0;

function paginationSpecies(c, m) {
    var paginationTest = document.getElementById('paginationSpecies');
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
        if (i == 1 || i == last || i >= left && i < right) {
            range.push(i);
        }
    }

    for (let i of range) {
        if (l) {
            if (i - l === 2) {
                rangeWithDots.push(l + 1);
                paginationTest.innerHTML += '<a class="page-number-species" href="#">' + (l + 1) + '</a>';
            } else if (i - l !== 1) {
                rangeWithDots.push('...');
                paginationTest.innerHTML += '<a>' + '...' + '</a>';
            }
        }
        rangeWithDots.push(i);
        paginationTest.innerHTML += '<a class="page-number-species" href="#">' + i + '</a>';
        l = i;
    }
}

function renderdspecies(page) {
	var speciesDataPage = 'http://134.209.106.33:8888/v1/species?page=' + page;
	fetch(speciesDataPage, requestOptions).then(function (response) {
		response.json().then(function (data) {
			var table = document.getElementById('spiecesBody');
			var idShow = (page - 1) * 10 + 1;
			for (var j = 0; j < data.results.length; j++) {
				var row = `<tr onclick="loadSpeciesDetail('${data.results[j].id}')">
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

fetch(speciesData, requestOptions)
	.then(function (response) {
		response.json().then(function (data) {
			var table = document.getElementById('spiecesBody');
			for (var j = 0; j < data.results.length; j++) {
				var row = `<tr onclick="loadSpeciesDetail('${data.results[j].id}')">
                    <td>${j + 1}</td>
                    <td>${data.results[j].Ten_KH}</td>
                    <td>${data.results[j].Ten_TV}</td>
                </tr>`;
				table.innerHTML += row;
			}

			totalSpeciesPage = data.totalPages;

			paginationSpecies(1, parseInt(totalSpeciesPage));

			$('.page-number-species').click(function (e) {
				e.preventDefault();
				renderdspecies($(this).text());
				paginationSpecies(parseInt($(this).text()), parseInt(totalSpeciesPage));
                $('#add-js-file').append(`<script src="/scripts/handlePagination.js"></script>`);
			});
		});
	})
	.catch(function (err) {
		console.log('error: ' + err);
	});

// }
