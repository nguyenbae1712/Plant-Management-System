classData.innerHTML = '';
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
            var table = document.getElementById('divisionData')  
            for (var j = 0; j < data.results.length; j++)
            {
                    var row = `<tr>
                    <td onclick="getChildren('${data.results[j].Ten_KH}')">${data.results[j].Ten_KH}</td>
                    </td>
                </tr>`
                table.innerHTML += row
            }
})
    })
    .catch(function (err) {
        console.log('error: ' + err);
    })

function getChildren(name){
    var table = document.getElementById('classData');
    table.innerHTML = '';
    const classData = "http://134.209.106.33:8888/v1/classis/getChildOfDivisio";
    fetch(classData + '/' + name,requestOptions)
    .then(function (response) {
        response.json().then( function (data){
            
            if(response.status !== 200) {
                classData.innerHTML = '';
                table.innerHTML = `<h4>No Class</h4>`;
            }
            else {
                classData.innerHTML = '';
                console.log(data);
                for (var j = 0; j < data.children.length; j++)
            {
                    var row = `<tr>
                    <td>${data.children[j]}</td>
                    </td>
                </tr>`
                table.innerHTML += row
            }
            }
        })
    })
    .catch(function (err) {
        console.log('error: ' + err);
    })
}