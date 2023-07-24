import React from "react"
import { Link } from "react-router-dom";

function AboutPage(props) {
    return (
        <div className="container-fluid">
            <div className="py-5" style={{
                marginTop: "70px", backgroundImage: "url('https://images.pexels.com/photos/673649/pexels-photo-673649.jpeg')", backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "500px"
            }}>
                <div className="container my-5">
                    <div className="row">
                        <div className="col-md-12 rounded rounded-5 my-5" style={{ backgroundColor: "rgb(225,225,225,0.5)" }}>
                            <h1 className="lg-text">About Us</h1>
                            <h5 className="image-aboutus-para">Hello, I am <b>UJJWAL KUMAR</b>, currently pursuing a Bachelor of Computer Application (BCA) degree.</h5>
                            <ol className="breadcrumb">
                                <li><Link to="/">Home</Link></li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container team-sektion paddingTB60">
                <div className="row" id="contectUs">
                    <div className="mt-4 site-heading text-center">
                        <h3>Contect</h3>
                        <div className="my-4" style={{fontSize:"30px"}}>
                            <span className="mx-3">
                                <a className="link-opacity-50-hover" href="https://www.linkedin.com/in/violentujjwal/" target="blank" >
                                    <i className="bi bi-linkedin"></i>
                                </a>
                            </span>
                            <span className="mx-3">
                                <a className="link-opacity-50-hover" href="https://github.com/ViolentUJJWAL" target="blank" >
                                    <i className="bi bi-github"></i>
                                </a>
                            </span>
                            <span className="mx-3">
                                <a className="link-opacity-50-hover" href="https://twitter.com/ViolentUjjwal?t=EOftoEvCnvduLSspK8FmKQ&s=09" target="blank" >
                                    <i className="bi bi-twitter"></i>
                                </a>
                            </span>
                            <span className="mx-3">
                                <a className="link-opacity-50-hover" href="mailto:ujjwal21aman08@gmail.com" target="blank" >
                                <i class="bi bi-envelope"></i>
                                </a>
                            </span>
                            <span className="mx-3">
                                <a className="link-opacity-50-hover" href="https://www.instagram.com/invites/contact/?i=kbe1phoz031d&utm_content=3p8u1yy" target="blank" >
                                    <i className="bi bi-instagram"></i>
                                </a>
                            </span>
                        </div>
                        <div className="border"></div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AboutPage;