const getImage = "http://134.209.106.33:8888/v1/image?page=7&limit=4";
var myHeaders = new Headers();
var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

fetch(getImage,requestOptions)
    .then(function (response){
        response.json().then(function (data) {
            console.log(data.results[1].URL);
            var imageDetal = document.getElementsByClassName('imageDetal')
            for (var j = 0; j < data.results.length; j++)
            {
                var row = `
                <div class="col-12 col-sm-6 col-lg-3">
						<div class="single-product-area mb-50 wow fadeInUp" data-wow-delay="100ms">
							<!-- Product Image -->

							<div class="product-img">
								<a href="/View/mainPage/plants.html">
									<img style="width:250px" src="${data.results[j].URL}" />
								</a>
							</div>
							<!-- Product Info -->
							<div class="product-info mt-15 text-center">
								<a href="/View/mainPage/plants.html">
								</a>
							</div>
						</div>
					</div>
                    `
                imageDetal[0].innerHTML += row ;
            }
})
    })
    .catch(function (err) {
        console.log('error: ' + err);
    })