function speciesbyId(id) {
	var id = localStorage.getItem('idSpecies');
	console.log(id);
	// if(id = undefined){
	//     return false;
	// }
	// else{
	const speciesData = 'http://134.209.106.33:8888/v1/species';
	const speciesImage = 'http://134.209.106.33:8888/v1/image/getByIdLoai';
	// const genus = 'http://134.209.106.33:8888/v1/genus';
	// const family = 'http://134.209.106.33:8888/v1/familia/';
	// const order = 'http://134.209.106.33:8888/v1/ordo/';
	// const classiss = 'http://134.209.106.33:8888/v1/classis/';
	// const divisio = 'http://134.209.106.33:8888/v1/divisio/';
	var myHeaders = new Headers();
	var requestOptions = {
		method: 'GET',
		headers: myHeaders,
		redirect: 'follow',
	};

	fetch(speciesData + '/' + id, requestOptions).then(function (response) {
		response
			.json()
			.then(function (data) {
				if (data.Mo_ta == undefined) {
					console.log(data);
					title.innerHTML = `<h3 class="title">${data.Ten_KH}</h3>`;
					tenTV.innerHTML = `<h4>${data.Ten_TV}</h4>`;
					giaTri.innerHTML = `<h5></h5>`;
					dangsong.innerHTML = `<p style="font-size: 18px;"><b>Dạng sống:</b>  ${data.Dang_Song}</p>`;
					phanbo.innerHTML = `<p style="font-size: 18px;">${data.Phan_Bo}</p>`;
					dacdiem.innerHTML = `<p style="font-size: 18px;">${data.Dac_Diem_Nhan_Dang}</p>`;
					tinhtrang.innerHTML = `<p style="font-size: 18px;"><b>Tình trạng:</b> ${data.Tinh_Trang}</p>`;
					sinhhoc.innerHTML = `<p style="font-size: 18px;"><b>Sinh học sinh thái:</b> ${data.Sinh_Hoc_Sinh_Thai}</p>`;
				} else {
					console.log(data);
					title.innerHTML = `<h3 class="title">${data.Ten_KH}</h3>`;
					tenTV.innerHTML = `<h4>${data.Ten_TV}</h4>`;
					giaTri.innerHTML = `<h5>${data.Gia_Tri}</h5>`;
					dangsong.innerHTML = `<p style="font-size: 18px;"><b>Dạng sống:</b>  ${data.Dang_Song}</p>`;
					phanbo.innerHTML = `<p style="font-size: 18px;">${data.Phan_Bo}</p>`;
					dacdiem.innerHTML = `<p style="font-size: 18px;">${data.Dac_Diem_Nhan_Dang}</p>`;
					tinhtrang.innerHTML = `<p style="font-size: 18px;"><b>Tình trạng:</b> ${data.Tinh_Trang}</p>`;
					sinhhoc.innerHTML = `<p style="font-size: 18px;"><b>Sinh học sinh thái:</b> ${data.Sinh_Hoc_Sinh_Thai}</p>`;
				}
			})
			.catch(function (err) {
				console.log('error abc: ' + err);
			});
	});

	fetch(speciesImage + '/' + id, requestOptions)
		.then((response) => {
			return response.text();
		})
		.then(function (data) {
			console.log('image data', data);
			hinhanh.innerHTML = `<img class="d-block w-100" src="${data}" alt="1" />`;
		})
		.catch(function (err) {
			console.log('error image: ' + err);
		});
}
