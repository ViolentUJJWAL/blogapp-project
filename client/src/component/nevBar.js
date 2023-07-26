import React from "react"
import { Link, useNavigate } from "react-router-dom";

function NevBar(props) {
    const navigate = useNavigate()
    return (
        <div style={{ position: "sticky", top: "0px", zIndex: "5" }}>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <h3>
                        <a className="navbar-brand" href="/">My Blog</a>
                    </h3>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            {
                                (window.localStorage.getItem("token") === null && window.localStorage.getItem("userName") === null) ? "" :
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to={`/${window.localStorage.userName}`}>My Profile</Link>
                                    </li>
                            }
                            {
                                (window.localStorage.getItem("token") === null && window.localStorage.getItem("userName") === null) ? "" :
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="/createblog">Create Blog</Link>
                                    </li>
                            }

                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/about">Contect</Link>
                            </li>

                        </ul>
                        <div className="d-flex">
                            {
                                (window.localStorage.getItem("token") === null && window.localStorage.getItem("userName") === null) ?
                                    <div>
                                        <Link to="/signup">
                                            <button className="btn ">SignUp</button>
                                        </Link>
                                        <Link to="/login">
                                            <button className="btn ">LogIn</button>
                                        </Link>
                                    </div>
                                    :
                                    <div>
                                        <button onClick={() => {
                                            window.localStorage.clear()
                                            navigate('/')
                                        }} className="btn ">LogOut</button>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default NevBar;