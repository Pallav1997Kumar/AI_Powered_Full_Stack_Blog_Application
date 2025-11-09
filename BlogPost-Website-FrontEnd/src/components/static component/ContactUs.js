import { Link } from "react-router-dom";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "../../style/static component/Contact.scss";

import contactUsImage from "../../images/contact-us.jpg";


function ContactUs() {
	return (
		<div className="contact">
			<div className="contact-one-row">
				<div className="contact-one-column-first">
					<p>I am happy to see you on this page.</p>
					<p>
						If you want to ask or inquire about something on your mind, please
						do not hesitate to contact us.
					</p>
					<p>
						Use any of the possible modes of communication anytime. We will try
						to contact you as soon as possible.
					</p>
					<p>Regards!</p>
				</div>
				<div className="contact-one-column-second">
					<LazyLoadImage src={contactUsImage} effect="blur" />
				</div>
			</div>
			<div className="contact-two-row">
				<div className="contact-two-column">
					<h3>Social Presence</h3>
					<Link to="https://www.facebook.com/" className="contact-link">
						Facebook
					</Link>
					<br />
					<Link to="https://www.instagram.com/" className="contact-link">
						Instagram
					</Link>
					<br />
					<Link to="https://twitter.com/" className="contact-link">
						Twitter
					</Link>
					<br />
					<Link to="https://www.youtube.com/" className="contact-link">
						YouTube
					</Link>
					<br />
				</div>
				<div className="contact-two-column">
					<h3>Email</h3>
					<p>Feel free to mail us</p>
					<p>contactus@reactblogposter.co.in</p>
					<p>contactus@reactblogposter.com</p>
				</div>
				<div className="contact-two-column">
					<h3>Contact Number</h3>
					<p>Feel free to call us</p>
					<p>+91-9876543210</p>
					<p>+91-9876543280</p>
				</div>
			</div>
		</div>
	);
}

export default ContactUs;
