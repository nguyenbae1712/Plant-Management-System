window.onload = function () {
	userProfile = myLocalStorage.getItem(USER_PROFILE);

	const loginElm = document.getElementsByClassName('adminLogin');

	let html;

	if (userProfile && userProfile.name) {
		html = `	
					<div style ="padding-right: 5px" > 
                    <ul class="nav navbar-nav navbar-right user-nav">
                    <li class="user-name"><span id="emailUser">${userProfile.name}</span></li>
                    <li class="dropdown avatar-dropdown">
                      <img src="/Content/asset/UploadFile/ava-img/jin_ava.jpg" class="img-circle avatar" alt="user name"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" />
                      <ul class="dropdown-menu user-dropdown">
                        <li>
                          <a href="Profile.html"><span class="fa fa-user"></span> My Profile</a>
                        </li>
                        <li>
                        <a href="#" id="btnLogout"><span class="fa fa-sign-out">Logout</a>
                        </li>
                      </ul>
                    </li>
                  </ul>
					</div>
					`;
	} 
	loginElm[0].innerHTML = html;

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

