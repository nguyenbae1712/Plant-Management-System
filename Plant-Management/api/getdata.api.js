//---------------- GET DATA OF DIVISION----------------------------//
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
//---------------------------------------------------------

//---------------- GET DATA OF CLASS----------------------------//
const classData = "http://134.209.106.33:8888/v1/classis?limit=30";
var myHeaders = new Headers();
var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };
    fetch(classData,requestOptions)
        .then(function (response){
            response.json().then(function (data) {
            for(var i = 0; i < data.results.length; i++){
                // console.log(data.results[i]);
            }
                buildTable(data.results[i]);
                function buildTable(){
                var table = document.getElementById('classBody')      
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

//---------------------------------------------------------

//---------------- GET DATA OF ORDER----------------------------//

const orderData = "http://134.209.106.33:8888/v1/ordo?limit=100";
var myHeaders = new Headers();
var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };
    fetch(orderData,requestOptions)
        .then(function (response){
            response.json().then(function (data) {
            for(var i = 0; i < data.results.length; i++){
                // console.log(data.results[i]);
            }
                buildTable(data.results[i]);
                function buildTable(){
                var table = document.getElementById('orderBody')      
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

//---------------- GET DATA OF Family----------------------------//
const familyData = "http://134.209.106.33:8888/v1/familia?limit=350";
var myHeaders = new Headers();
var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };
    fetch(familyData,requestOptions)
        .then(function (response){
            response.json().then(function (data) {
            for(var i = 0; i < data.results.length; i++){
                // console.log(data.results[i]);
            }
                buildTable(data.results[i]);
                function buildTable(){
                var table = document.getElementById('familyBody')      
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

//---------------- GET DATA OF GENUS----------------------------//
const genusData = "http://134.209.106.33:8888/v1/genus?limit=500";
var myHeaders = new Headers();
var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };
    fetch(genusData,requestOptions)
        .then(function (response){
            response.json().then(function (data) {
            for(var i = 0; i < data.results.length; i++){
                // console.log(data.results[i]);
            }
                buildTable(data.results[i]);
                function buildTable(){
                var table = document.getElementById('genusBody')      
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

//---------------- GET DATA OF SPECIES----------------------------//

const speciesData = "http://134.209.106.33:8888/v1/species?limit=500";
var myHeaders = new Headers();
var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };
    fetch(speciesData,requestOptions)
        .then(function (response){
            response.json().then(function (data) {
            for(var i = 0; i < data.results.length; i++){
                // console.log(data.results[i]);
            }
                buildTable(data.results[i]);
                function buildTable(){
                var table = document.getElementById('spiecesBody')      
                for (var j = 0; j < data.results.length; j++)
                {
                    if(data.results[j] !=0 ){

                var row = `<tr>
                    <td>${j+1}</td>
                    <td>${data.results[j].Ten_KH}</td>
                    <td>${data.results[j].Ten_TV}</td>
                </tr>`
                table.innerHTML += row
                    }
                    }
                  }})
                })
        .catch(function (err) {
            console.log('error: ' + err);
        })