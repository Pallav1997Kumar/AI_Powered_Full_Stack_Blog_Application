import video1 from "../../../videos/What is a Blog.mp4";

function WIBVideo1(){
    return(
        <>
            <video controls>
                <source src={video1} type="video/mp4" />
            </video>
        </>
    );
}

export default WIBVideo1;