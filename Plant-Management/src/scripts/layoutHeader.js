window.onload = function () {
	userProfile = myLocalStorage.getItem(USER_PROFILE);

	const loginElm = document.getElementsByClassName('login');

	let html;

	if (userProfile && userProfile.name) {
		html = `
						<i class="fa fa-user" aria-hidden="true"></i>
						<span style="font-size: 15px; color: white">${userProfile.name}</syypan>
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
};
