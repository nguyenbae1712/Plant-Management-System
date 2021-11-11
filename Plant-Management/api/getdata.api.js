const divisionData = "http://134.209.106.33:8888/v1/divisio";
var myHeaders = new Headers();
var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
fetch(divisionData,requestOptions)
.then(function (response){
    return response.json();
})
.then(function (data) {
    // appendData(data);
    console.log(data);
    // console.log(typeof(data));
})
// .then(result => console.log(result))
.catch(function (err) {
    console.log('error: ' + err);
});

// function appendData(data) {
//     var mainContainer = document.getElementById("divison");
//     for (var i = 0; i < data.length; i++) {
//         var row = document.createElement("row");
//         // div.innerHTML = 'Name: ' + data[i].firstName + ' ' + data[i].lastName;
//         var row = `<tr>
//                 <td> + ${data[i].Ten_KH} + </td>
//                 <td> + ${data[i].Ten_Latin} + </td>
//                 <td> + ${data[i].Mo_Ta} + </td>
//                 </tr>`
//         mainContainer.appendChild(row);
//     }
// }
