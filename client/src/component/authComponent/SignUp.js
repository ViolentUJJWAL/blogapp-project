import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import { useDispatch } from "react-redux";

function SignUpPage(props) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [showHidePassWord, setShowHidePassWord] = useState(false);
    const [name, setName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);


    const showingalert = (mode, msg) => {
        dispatch({
            type: "showAlert",
            mode: mode,
            msg: msg
        })
        setTimeout(() => {
            dispatch({
                type: "hideAlert",
            })
        }, 5000)
    }

    const passwordToggel = () => {
        setShowHidePassWord(!showHidePassWord)
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const submitData = await axios.post("/api/v1/auth/signup", {
                name, userName, email, password
            })
            if (submitData.status === 201) {
                showingalert("success", "your acount created successfully")
                setLoading(false)
                navigate("/login")
                return
            }
            showingalert("info", submitData.data.msg)
            setLoading(false)
        } catch (error) {
            showingalert("danger", error.response.data.msg)
            setLoading(false)
        }
    }

    const changeHandler = (e) => {
        let targetName = e.target.name
        if (targetName === "name") {
            setName(e.target.value)
        } else if (targetName === "userName") {
            setUserName(e.target.value)
        } else if (targetName === "email") {
            setEmail(e.target.value)
        } else if (targetName === "password") {
            setPassword(e.target.value)
        }
    }

    return (
        <>
            <section className="" style={{ backgroundColor: "#9A616D" }}>
                <div className="container py-5 h-100" >
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-xl-10">
                            <div className="card" style={{ borderRadius: "1rem" }}>
                                <div className="row g-0">
                                    <div className="col-md-6 col-lg-5 d-none d-md-block">
                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                                            alt="login form" className="img-fluid" style={{ borderRadius: "1rem 0 0 0", height: "100%" }} />
                                    </div>
                                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                        <div className="card-body p-4 text-black">

                                            <form onSubmit={submitHandler}>
                                                <h3 className="fw-bolder mb-3 pb-3" style={{ letterSpacing: "1px" }}> Register You Acount</h3>

                                                <div className="form-outline mb-3">
                                                    <label className="form-label" htmlFor="formName">Name</label>
                                                    <input onChange={changeHandler} type="text" id="formName" name="name" value={name} placeholder="Enter your name" className="form-control form-control-lg" minLength={4} required />
                                                </div>

                                                <div className="form-outline mb-3">
                                                    <label className="form-label" htmlFor="formUserNamr">UserName</label>
                                                    <input onChange={changeHandler} type="text" id="formUserNamr" name="userName" value={userName} placeholder="Create your UserName" className="form-control form-control-lg" minLength={5} required />
                                                </div>

                                                <div className="form-outline mb-3">
                                                    <label className="form-label" htmlFor="formEmail">Email address</label>
                                                    <input onChange={changeHandler} type="email" id="formEmail" name="email" value={email} placeholder="Enter your Email" className="form-control form-control-lg" required />
                                                </div>

                                                <div className="form-outline mb-4">
                                                    <label className="form-label" htmlFor="formPassword">Password</label>
                                                    <input onChange={changeHandler} type={(showHidePassWord) ? "text" : "password"} name="password" id="formpassword" className="form-control form-control-lg" value={password} placeholder="Create your Password" minLength={8} required />
                                                    <i onClick={passwordToggel} className={`ms-2 pt-2 bi bi-eye${(showHidePassWord) ? "" : "-slash"}`} id="togglePassword">{(showHidePassWord) ? " Hide Password" : " Show Password"}</i>
                                                </div>

                                                <div className="pt-1 mb-2 text-center">
                                                    <button className="btn btn-dark btn-lg btn-block" type="submit" disabled={loading}>
                                                        {
                                                            (loading) ?
                                                                <div className="spinner-border text-light" role="status">
                                                                    <span className="visually-hidden">Loading...</span>
                                                                </div>
                                                                :
                                                                "SignUp"
                                                        }
                                                    </button>
                                                </div>


                                            </form>

                                        </div>
                                    </div>
                                    <div className="col-12 align-items-center p-2" style={{ backgroundColor: "whitesmoke", borderEndEndRadius: "1rem", borderEndStartRadius: "1rem" }}>
                                        <center>
                                            <b className="" style={{ color: "#393f81" }}>I have aleary acount <Link to="/login"
                                                style={{ color: "#393f81" }}>login here</Link></b>
                                            <p className="small text-muted mt-2">Terms of use.
                                                Privacy policy</p>
                                        </center>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default SignUpPage;