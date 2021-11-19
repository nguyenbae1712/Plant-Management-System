function loadFamilyById(x) {
    console.log(x);
    localStorage.setItem("idFamily", x);
    window.location.replace("familyDetail.html");
}
const familyData = "http://134.209.106.33:8888/v1/familia?page=1";
var myHeaders = new Headers();
var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

let totalFamilyPages = 0;

function paginationFamily(c, m) {
    var paginationTest = document.getElementById('paginationFamily');
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
    paginationTest.innerHTML = '';
    for (let i of range) {
        if (l) {
            if (i - l === 2) {
                rangeWithDots.push(l + 1);
                paginationTest.innerHTML += '<a class="page-number" href="#">' + (l + 1) + '</a>';
            } else if (i - l !== 1) {
                rangeWithDots.push('...');
                paginationTest.innerHTML += '<a>' + '...' + '</a>';
            }
        }
        rangeWithDots.push(i);
        paginationTest.innerHTML += '<a class="page-number" href="#">' + i + '</a>';
        l = i;
    }
    console.log(rangeWithDots)
}

function renderfamily(page) {
    var classDataPage = "http://134.209.106.33:8888/v1/familia?page=" + page;
    fetch(classDataPage, requestOptions)
        .then(function (response) {
            response.json().then(function (data) {

                var table = document.getElementById('familyBody')
                var idShow = (page - 1) * 10 + 1
                for (var j = 0; j < data.results.length; j++) {

                    var row = `<tr onclick="loadFamilyById('${data.results[j].id}')">
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

fetch(familyData, requestOptions)
    .then(function (response) {
        response.json().then(function (data) {
            var table = document.getElementById('familyBody')
            for (var j = 0; j < data.results.length; j++) {
                var row = `<tr onclick="loadFamilyById('${data.results[j].id}')">
                    <td>${j + 1}</td>
                    <td>${data.results[j].Ten_KH}</td>
                    <td>${data.results[j].Ten_TV}</td>
                </tr>`
                table.innerHTML += row
            }

            totalFamilyPages = data.totalPages;
            paginationFamily(1, data.totalPages);

            $('.page-number').click(function (e) {
                e.preventDefault();
                renderfamily($(this).text());
                paginationFamily(parseInt($(this).text()), data.totalPages);
                $('#add-js-file').append(`<script src="/scripts/handlePagination.js"></script>`);
            });
        })
    })
    .catch(function (err) {
        console.log('error: ' + err);
    })



