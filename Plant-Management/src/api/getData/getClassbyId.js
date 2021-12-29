function classbyId(id) {
	var id = localStorage.getItem('idClass');
	const getChild = (tenKH) => {
		fetch(`http://134.209.106.33:8888/v1/ordo/getChildOfClassis/${tenKH}`, requestOptions).then(
			(response) => {
				response.json().then((data) => {
					console.log('data', data);
					var tbody = document.getElementById('classChild');
					var table = document.getElementById('tableClassDetail');

					if (data.children?.length > 0) {
						if (data.children?.length < 10) {
							for (var j = 0; j < data.children?.length; j++) {
								var row = `
                            <tr>
                            
                            <td>${data.children[j]}</td>
                            </tr>`;
								tbody.innerHTML += row;
							}
						} else {
							for (var j = 0; j < 10; j++) {
								var row = `
                            <tr>
                            
                            <td>${data.children[j]}</td>
                            </tr>`;
								tbody.innerHTML += row;
							}
						}
					} else {
						tbody.innerHTML = `<p style="padding-left: 12px;text-align:left">Not Found</p>`
					}
				});
			},
		);
	};
	console.log(id);
	const classData = 'http://134.209.106.33:8888/v1/classis';
	var myHeaders = new Headers();
	var requestOptions = {
		method: 'GET',
		headers: myHeaders,
		redirect: 'follow',
	};
	fetch(classData + '/' + id, requestOptions).then(function (response) {
		response
			.json()
			.then(function (data) {
				console.log(data);
				if (data.Mo_ta == undefined) {
					title.innerHTML = `<h3 class="title">${data.Ten_KH}</h3>`;
					tenTV.innerHTML = `<h4>${data.Ten_TV}</h4>`;
					mota.innerHTML = `<p style="font-size: 18px;">Chưa có thông tin</h4>`;
				} else {
					title.innerHTML = `<h3 class="title">${data.Ten_KH}</h3>`;
					tenTV.innerHTML = `<h4>${data.Ten_TV}</h4>`;
					mota.innerHTML = `<p style="font-size: 18px;">${data.Mo_ta}</h4>`;
				}
				return getChild(data.Ten_KH);
			})
			.catch(function (err) {
				console.log('error: ' + err);
			});
	});
}
// }
