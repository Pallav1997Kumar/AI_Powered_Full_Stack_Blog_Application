import video2 from "../../../videos/What is a Blog_ How It Works and the Difference Between a Blog and a Website.mp4";

function WIBVideo2(){
    return(
        <>
            <video controls>
                <source src={video2} type="video/mp4" />
            </video>
        </>
    );
}

export default WIBVideo2;