getTotal();
function getTotal(){
    getDivisionAll();
    getClassAll();
    getOrderAll();
    getFamilyAll();
    getGenusAll();
    getSpeciesAll();
    getImageAll();
}
function getDivisionAll(){
    const divisionData = "http://134.209.106.33:8888/v1/divisio";
    var myHeaders = new Headers();
    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};
    fetch(divisionData,requestOptions)
    .then(function (response){
        response.json().then(function (data){
            // console.log(data.totalResults);
            divisionTotal.innerHTML = `<td id="divisionTotal">${data.totalResults}</td>`
        })
    })

}
function getClassAll(){
    const classData = "http://134.209.106.33:8888/v1/classis";
    var myHeaders = new Headers();
    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};
    fetch(classData,requestOptions)
    .then(function (response){
        response.json().then(function (data){
            // console.log(data.totalResults);
            classTotal.innerHTML = `<td id="classTotal">${data.totalResults}</td>`
        })
    })

}

function getOrderAll(){
    const orderData = "http://134.209.106.33:8888/v1/ordo";
    var myHeaders = new Headers();
    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};
    fetch(orderData,requestOptions)
    .then(function (response){
        response.json().then(function (data){
            // console.log(data.totalResults);
            orderTotal.innerHTML = `<td id="orderTotal">${data.totalResults}</td>`
        })
    })
}

function getFamilyAll(){
    const familyData ="http://134.209.106.33:8888/v1/familia";
    var myHeaders = new Headers();
    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};
    fetch(familyData,requestOptions)
    .then(function(response){
        response.json().then(function(data){
            // console.log(data.totalResults);
            familyTotal.innerHTML = `<td id="familyTotal">${data.totalResults}</td>`
            
        })
    })
}
function getGenusAll(){
    const genusData ="http://134.209.106.33:8888/v1/genus";
    var myHeaders = new Headers();
    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};
    fetch(genusData,requestOptions)
    .then(function(response){
        response.json().then(function(data){
            // console.log(data.totalResults);
            genusTotal.innerHTML = `<td id="genusTotal">${data.totalResults}</td>`
            
        })
    })
}
function getSpeciesAll(){
    const speciesData ="http://134.209.106.33:8888/v1/species";
    var myHeaders = new Headers();
    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};
    fetch(speciesData,requestOptions)
    .then(function(response){
        response.json().then(function(data){
            // console.log(data.totalResults);
            speciesTotal.innerHTML = `<td id="speciesTotal">${data.totalResults}</td>`
        })
    })
}

function getImageAll(){
    const imageData = "http://134.209.106.33:8888/v1/image";
    var myHeaders = new Headers();
    var requestOptions = {
    method: 'GET',
    headers: myHeaders, 
    redirect: 'follow'
};
    fetch(imageData,requestOptions)
    .then(function (response){
        response.json().then(function (data){
            // console.log(data.totalResults);
            imagesTotal.innerHTML = `${data.totalResults}`
        })
    })
}