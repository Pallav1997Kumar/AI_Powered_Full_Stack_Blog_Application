import { Link } from "react-router-dom";
import { SocialIcon } from "react-social-icons";

import "../../style/fixed component/Footer.scss";


function Footer() {
	return (
		<div className="footer">
			<h1>Start using React Blog Poster today</h1>
			<div>
				<h3>Follow us Social Media</h3>
				<div className="footer-social">
					<Link to="https://www.facebook.com/" className="footer-social-name">
						<SocialIcon url="https://www.facebook.com/" />
						Facebook
					</Link>
					<Link to="https://www.instagram.com/" className="footer-social-name">
						<SocialIcon url="https://www.instagram.com/" />
						Instagram
					</Link>
					<Link to="https://twitter.com/" className="footer-social-name">
						<SocialIcon url="https://twitter.com/" />
						Twitter
					</Link>
					<Link to="https://www.youtube.com/" className="footer-social-name">
						<SocialIcon url="https://www.youtube.com/" />
						YouTube
					</Link>
				</div>
			</div>
			<h4>© Copyright {new Date().getFullYear()} React Blog Poster</h4>
		</div>
	);
}

export default Footer;
