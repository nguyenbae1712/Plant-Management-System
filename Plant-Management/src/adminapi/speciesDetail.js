tokens = myLocalStorage.getItem(TOKENS);
const accessToken = tokens.access.token ;
console.log(accessToken);

var idSpecies = localStorage.getItem("idSpecies");
getSpeciesbyID(idSpecies);
function getSpeciesbyID(id){
    const classData = "http://134.209.106.33:8888/v1/species";
    var myHeaders = new Headers();
    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };
    fetch(classData + '/' + id,requestOptions)
    .then(function (response){
        response.json().then(function (data) {
            // console.log(data);
                tenKH.innerHTML = `Tên Khoa Học : ${data.Ten_KH}` ;
                tenTV.innerHTML = `Tên Tiếng Việt : ${data.Ten_TV}`;
                dacdiem.innerHTML = `Đặc điểm nhận dạng : ${data.Dac_Diem_Nhan_Dang}`;
                sinhhoc.innerHTML = `Sinh học Sinh Thái : ${data.Sinh_Hoc_Sinh_Thai}`;
                phanbo.innerHTML = `Phân bố : ${data.Phan_Bo}`;
                giatri.innerHTML = `Giá trị : ${data.Gia_Tri}`;
                tinhtrang.innerHTML = `Tình trạng : ${data.Tinh_Trang}`;
                baove.innerHTML = `Biện pháp bảo vệ : ${data.Bien_Phap_BV}`;
                dangsong.innerHTML = `Dạng sống : ${data.Danh_Song}`;
                let idGenus = data.idChi ;
                // console.log(idGenus );
                getGeNusName(idGenus);
                // getImage(data.id)
                function getGeNusName(x) {
                    const GenusAPI = "http://134.209.106.33:8888/v1/genus"
                    var myHeaders = new Headers();
                    var requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                    redirect: 'follow'
                    };

                    fetch(GenusAPI + '/' + x,requestOptions)
                    .then( function (response){
                        response.json().then( function (data){
                            console.log(data.Ten_KH)
                            idChi.innerHTML = `Chi : ${data.Ten_KH}`;
                        }
                        )
                    })
                }
                
    })
    .catch(function (err) {
        console.log('error: ' + err);
    })


})
}
getImage(idSpecies);
function getImage(a){
    const GenusAPI = "http://134.209.106.33:8888/v1/image/getByIdLoai"
    var myHeaders = new Headers();
    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch(GenusAPI + '/' + a,requestOptions)
    .then( function (response){
        response.text().then( function (data){
            console.log(data)
            // console.log(data.results.URL)
            image.innerHTML = `<img src="${data}">`;
        }
        )
    })
}
deleteDivisionID(idSpecies)
function deleteDivisionID(id){
    var btnDelele = document.getElementById('btnDelete');
    btnDelele.addEventListener('click' , async (e) => {
        e.preventDefault();
        function deleteDivisionApi(id){
            const divisionID = "http://134.209.106.33:8888/v1/species";
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokens.access.token}`
            }
            let addOptions = {
                method: 'DELETE',
                headers
              };
        
              fetch(divisionID + '/' + id ,addOptions)
              .then(function (response){     
                response.text();
                alert("Successfully Deleted");
                window.location.reload();
                })
              .catch((err) => {
                console.log(err);
              });
        }
        deleteDivisionApi(id);
        
    })
}

const btnViewEdit = document.getElementById('btnViewEdit');

btnViewEdit.addEventListener('click' , async (e) => {
    e.preventDefault();
    editDivisionbyID(idSpecies)
    function editDivisionbyID(id){
    // alert(id);
    var editSuggest =document.getElementById('editSuggest');
        const divisionID = "http://134.209.106.33:8888/v1/species";
        let myHeaders = new Headers();
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
            };
        fetch(divisionID + '/' + id,requestOptions)
        .then(function (response){     
            response.json().then( function (data){
            editID.innerHTML = `${data.id}`;
            editTenKH.innerHTML = `${data.Ten_KH}`;
            editTenTV.innerHTML = `${data.Ten_TV}` ;
            editDacdiem.innerHTML = `${data.Dac_Diem_Nhan_Dang}`;
            editSinhhoc.innerHTML = `${data.Sinh_Hoc_Sinh_Thai}`;
            editPhanbo.innerHTML = `${data.Phan_Bo}`;
            editGiatri.innerHTML = `${data.Gia_Tri}`;
            editTinhtrang.innerHTML = `${data.Tinh_Trang}`;
            editBaove.innerHTML = `${data.Bien_Phap_BV}`;
            editDangsong.innerHTML = `${data.Danh_Song}`;
            if( data.idChi == undefined){
                getDivisionbyID(data.Chi);
            }
            else{
                getDivisionbyID(data.idChi);
            }
            function getDivisionbyID(id){
                const divisionDatabyId = "http://134.209.106.33:8888/v1/genus";
                let myHeaders = new Headers();
                let requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
                };
                fetch(divisionDatabyId + '/' + id,requestOptions)
                .then( function (response) {
                    response.json().then( function (data){
                        editSuggest.value = data.Ten_KH;
                    })
                })
                .catch(function (err) {
                    console.log('error: ' + err);
                })
            }
            })
        })
        .catch((err) => {
            console.log(err);
        });
        console.log(id);
        let btnEdit = document.getElementById('btnEdit');
        btnEdit.addEventListener('click' ,async (e) =>{
            e.preventDefault();
            let editTenKH = document.getElementById('editTenKH').value;
            let editTenTV = document.getElementById('editTenTV').value;
            let editDacdiem = document.getElementById('editDacdiem').value;
            let editPhanbo = document.getElementById('editPhanbo').value;
            let editGiatri = document.getElementById('editGiatri').value;
            let editTinhtrang = document.getElementById('editTinhtrang').value;
            let editBaove = document.getElementById('editBaove').value;
            let editDangsong = document.getElementById('editDangsong').value
            var myHeaders = new Headers();
                var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
                };

                fetch("http://134.209.106.33:8888/v1/familia/getByName" + '/' + editNganh, requestOptions)
                .then( function (response) {
                    response.json().then ( function (data) {
                        console.log(data);
                        var divisioId = data[0].id ;       
                        var formData ={
                            Ten_KH : tenKH,
                            Ten_Latin :tenTV,
                            Mo_Ta : mota ,
                            genusId : divisioId
                            };
                        console.log(id);
                        console.log(formData);
                        const divisionID = "http://134.209.106.33:8888/v1/species";
                        const headers = {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${tokens.access.token}`
                        }
                        let addOptions = {
                            method: 'PATCH',
                            headers,
                            body: JSON.stringify(formData),
                        };

                        fetch(divisionID + '/' + id,addOptions)
                        .then(function (response){     
                            response.json();
                            alert("Successfully Edited");
                            window.location.reload();
                            })
                        .catch((err) => {
                            console.log(err);
                        });
                                })
                            })

        })
}
})
function editResults() {
    var editSuggest = document.getElementById("editSuggest");
    s = editSuggest.value ;
    res = document.getElementById("editResult");
    res.innerHTML = '';
    if (s == '') {
      return;
    }
    let list = '';
    const suggest = "http://134.209.106.33:8888/v1/genus/suggest/";
    let myHeaders = new Headers();
    let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };
    fetch(suggest + s,requestOptions).then(
     function (response) {
       return response.json();
     }).then(function (data) {
       for (i=0; i<data.length; i++) {
         list += '<li >' + data[i] + '</li>';
       }
       res.innerHTML = '<ul id="test">' + list + '</ul>';
       test = document.getElementById('test');
       function getEventTarget(e) {
        e = e || window.event;
        return e.target || e.srcElement; 
        }
       test.onclick = function (event){
        var target = getEventTarget(event);
        editSuggest.value = target.innerHTML ;
        res.innerHTML = '';
       };
     }).catch(function (err) {
       console.warn('Something went wrong.', err);
       return false;
     });
  }