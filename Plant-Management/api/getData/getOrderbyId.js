function orderById(id){
    var id = localStorage.getItem("idOrder");
    console.log(id);
    
    const orderData = "http://134.209.106.33:8888/v1/ordo";
    var myHeaders = new Headers();
    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };
    fetch(orderData + '/' + id,requestOptions)
    .then(function (response){
        response.json().then(function (data) {
            console.log(data);
            if (data.Mo_ta == undefined){
                title.innerHTML = `<h3 class="title">${data.Ten_KH}</h3>` ;
                tenKH.innerHTML = `<h4>${data.Ten_KH}</h4>`;
                tenTV.innerHTML = `<h4>${data.Ten_TV}</h4>`;
                mota.innerHTML = `<p style="font-size: 18px;">Chưa có thông tin</h4>`;
            }
            else{

            
            title.innerHTML = `<h3 class="title">${data.Ten_KH}</h3>` ;
            tenKH.innerHTML = `<h4>${data.Ten_KH}</h4>`;
            tenTV.innerHTML = `<h4>${data.Ten_TV}</h4>`;
            mota.innerHTML = `<p style="font-size: 18px;">${data.Mo_ta}</h4>`;
        }
    })
    .catch(function (err) {
        console.log('error: ' + err);
    })


})
    }
// }
