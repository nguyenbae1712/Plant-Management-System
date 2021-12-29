function getParent(idGenus) {
	const speciesParent = 'http://134.209.106.33:8888/v1/species/getParentByGenusId';
	var myHeaders = new Headers();
	var requestOptions = {
		method: 'GET',
		headers: myHeaders,
		redirect: 'follow',
	};
	fetch(speciesParent + '/' + idGenus, requestOptions)
		.then(function (response) {
			response.json().then(function (result) {
				console.log('parent: ' + result.genusName);
				genusName.innerHTML = result.genusName;
				familiaName.innerHTML = result.familiaName;
				orderName.innerHTML = result.orderName;
				classisName.innerHTML = result.classisName;
				divisioName.innerHTML = result.divisioName;
			});
		})
		.catch(function (err) {
			console.log('error :' + err);
		});
}

function getParentDetail(parent) {
	const baseAPI = 'http://134.209.106.33:8888/v1';
	var myHeaders = new Headers();
	var requestOptions = {
		method: 'GET',
		headers: myHeaders,
		redirect: 'follow',
	};
	let parentName = '',
		idParent = '',
		parentDetailPage = '';
	if (parent == 'genus') {
		parentName = document.getElementById('genusName').innerHTML;
		idParent = 'idGenus';
		parentDetailPage = 'genusDetail.html';
	} else if (parent == 'familia') {
		parentName = document.getElementById('familiaName').innerHTML;
		idParent = 'idFamily';
		parentDetailPage = 'familyDetail.html';
	} else if (parent == 'ordo') {
		parentName = document.getElementById('orderName').innerHTML;
		idParent = 'idOrder';
		parentDetailPage = 'orderDetail.html';
	} else if (parent == 'classis') {
		parentName = document.getElementById('classisName').innerHTML;
		idParent = 'idClass';
		parentDetailPage = 'classDetail.html';
	} else {
		parent = 'divisio';
		parentName = document.getElementById('divisioName').innerHTML;
		idParent = 'idDivision';
		parentDetailPage = 'divisionDetail.html';
	}

	fetch(baseAPI + '/' + parent + '/getByName' + '/' + parentName, requestOptions).then(
		(response) => {
			response
				.json()
				.then((responseData) => {
					// alert(responseData[0].id + 'from getparent');
					localStorage.setItem(idParent, responseData[0].id);
					window.location.replace(parentDetailPage);
				})
				.catch(function (err) {
					console.error(err);
				});
		},
	);
}

function speciesbyId(id) {
	var id = localStorage.getItem('idSpecies');
	console.log(id);
	const speciesData = 'http://134.209.106.33:8888/v1/species';
	const speciesImage = 'http://134.209.106.33:8888/v1/image/getByIdLoai';
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
					console.log(data);
					console.log('idGenus' + data.idChi);
					title.innerHTML = `<h3 class="title">${data.Ten_KH}</h3>`;
					tenTV.innerHTML = `<h4>${data.Ten_TV}</h4>`;
					if (data.Ten_TV == undefined) {
						tenTV.innerHTML = `<h4>Chưa có thông tin</h4>`;
					}
					giaTri.innerHTML = `<p style="font-size: 18px;"><b>Giá trị:</b><br>${data.Gia_Tri}</p>`;
					if(data.Gia_Tri == undefined) {
						giaTri.innerHTML = `<p style="font-size: 18px;"><b>Giá trị:</b><br>Chưa có thông tin</p>`;
					}
					dangsong.innerHTML = `<p style="font-size: 18px;"><b>Dạng sống:</b><br>${data.Dang_Song}</p>`;
					if(data.Dang_Song == undefined) {
						dangsong.innerHTML = `<p style="font-size: 18px;"><b>Dạng sống:</b><br>Chưa có thông tin</p>`;
					}
					phanbo.innerHTML = `<p style="font-size: 18px;"><b> Phân bố:</b><br> ${data.Phan_Bo}</p>`;
					if(data.Phan_Bo == undefined) {
						phanbo.innerHTML = `<p style="font-size: 18px;"><b>Phân bố:</b><br>Chưa có thông tin</p>`;
					}
					dacdiem.innerHTML = `<p style="font-size: 18px;"><b>Đặc điểm nhận dạng:</b> ${data.Dac_Diem_Nhan_Dang}</p>`;
					if(data.Dac_Diem_Nhan_Dang == undefined) {
						dacdiem.innerHTML = `<p style="font-size: 18px;"><b>Đặc điểm nhận dạng:</b><br>Chưa có thông tin</p>`;
					}
					tinhtrang.innerHTML = `<p style="font-size: 18px;"><b>Tình trạng:</b> ${data.Tinh_Trang}</p>`;
					if(data.Tinh_Trang == undefined) {
						tinhtrang.innerHTML = `<p style="font-size: 18px;"><b>Tình trạng:</b><br>Chưa có thông tin</p>`;
					}
					sinhhoc.innerHTML = `<p style="font-size: 18px;"><b>Sinh học sinh thái:</b> ${data.Sinh_Hoc_Sinh_Thai}</p>`;
					if(data.Sinh_Hoc_Sinh_Thai == undefined) {
						sinhhoc.innerHTML = `<p style="font-size: 18px;"><b>Sinh học sinh thái:</b><br>Chưa có thông tin</p>`;
					}
					getParent(data.idChi);
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
			hinhanh.innerHTML = `<img class="d-block w-75" src="${data}" alt="1" />`;
		})
		.catch(function (err) {
			console.log('error image: ' + err);
		});
}

