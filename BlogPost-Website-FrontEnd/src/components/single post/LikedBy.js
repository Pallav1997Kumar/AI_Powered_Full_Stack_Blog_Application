import { useState, useEffect } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import "../../style/single post/LikedBy.scss";

import backendBaseURL from "../../backendBaseURL.js";


function LikedBy(props) {
	const blogPostLikedList = props.blogPostLikedList;

	//Modals
	const [showLike, setShowLike] = useState(false);

	return (
		<>
			<Button onClick={() => setShowLike(true)} variant="secondary">
				Liked By
			</Button>
			<Modal show={showLike} onHide={() => setShowLike(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Like</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{blogPostLikedList && blogPostLikedList.map(function (eachLike) {
						return (
							<div className="each-user-like">
								<div className="like-image">
									<Image
										src={`${eachLike.userDetails.userProfilePhoto}`}
										roundedCircle
									/>
								</div>
								<div className="like-user-name">
									<p>
										{eachLike.userDetails.fullName} ({eachLike.userDetails.username})
									</p>
								</div>
							</div>
						);
					})}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setShowLike(false)}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default LikedBy;
