const divisionData = "http://134.209.106.33:8888/v1/divisio?limit=20";
var myHeaders = new Headers();
var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };
    fetch(divisionData,requestOptions)
        .then(function (response){
            response.json().then(function (data) {
            for(var i = 0; i < data.results.length; i++){
                // console.log(data.results[i]);
            }
                buildTable(data.results[i]);
                function buildTable(){
                var table = document.getElementById('divisonBody')      
                for (var j = 0; j < data.results.length; j++)
                {
                var row = `<tr>
                    <td>${j+1}</td>
                    <td>${data.results[j].Ten_KH}</td>
                    <td>${data.results[j].Ten_TV}</td>
                </tr>`
                table.innerHTML += row
                    }
                    }
                  })
                })
        .catch(function (err) {
            console.log('error: ' + err);
        })