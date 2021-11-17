window.onload = function () {
	userProfile = myLocalStorage.getItem(USER_PROFILE);

	const loginElm = document.getElementsByClassName('login');

	let html;

	if (userProfile && userProfile.name) {
		html = `	
					<div style = "display :flex; "> 
						<div style =" display: flex;
						align-items: center; padding-right : 10px"><i style = "padding-right:5px; color : #70C745;" class="fa fa-user" aria-hidden="true"></i>
						<span style="font-size: 15px; color: white">${userProfile.name}</span>
						</div>
						<button id="btnLogout" style="padding:1px; border-radius:10%; color:black">Logout</button>
					</div>
					`;
	} else {
		html = `
						<a href="/View/loginPage/index.html"
							><i class="fa fa-user" aria-hidden="true"></i>
							<span style="font-size: 15px">Login</syypan></a
						>

		`;
	}
	loginElm[0].innerHTML = html;

	const topHeaderElm = document.getElementsByClassName('top-header-meta');

	const topHeaderHTML = `
									<a href="#" data-toggle="tooltip" data-placement="bottom"
										><i class="fa fa-envelope-o" aria-hidden="true"></i>
										<span style="font-size: 15px">Email: plants.dn@gmail.com</span></a
									>
									<a href="#" data-toggle="tooltip" data-placement="bottom"
										><i class="fa fa-phone" style="font-size: 15px" aria-hidden="true"></i>
										<span style="font-size: 15px">Call Us: +0987654321</span></a
									>
	`;

	topHeaderElm[0].innerHTML = topHeaderHTML;

	const logout = document.getElementById('btnLogout');
	logout.addEventListener('click', async (e) => {
	e.preventDefault();
	tokens = myLocalStorage.getItem(TOKENS);
	console.log(tokens);
	try {
	responese = await UserService.logout({refreshToken:tokens.refresh.token});
	myLocalStorage.clear() ;
	window.location.replace('/index.html');
	}
	catch(err) {
		alert("okk");
	}
})
};

