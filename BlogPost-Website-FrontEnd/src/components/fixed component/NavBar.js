import "../../style/fixed component/NavBar.scss";

import NavbarDesktop from "./NavbarDesktop.js";
import NavbarMobile from "./NavbarMobile.js";


function NavBar() {

	return (
		<div className="navbar-container">
			<div className="navbar-for-desktop">
				<NavbarDesktop />
			</div>
			<div className="navbar-for-mobile">
				<NavbarMobile />
			</div>
		</div>
	)
}

export default NavBar;
