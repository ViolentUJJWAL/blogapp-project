import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useDispatch } from "react-redux";


function LogInPage(props) {
    const dispatch = useDispatch()
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [showHidePassWord, setShowHidePassWord] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()
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


    const submitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const submitData = await axios.post("/api/v1/auth/login", {
                userName, password
            })
            if (submitData.status === 200) {
                window.localStorage.setItem("token", submitData.data.token)
                window.localStorage.setItem("userName", submitData.data.data.userName)
                showingalert("success", "Login successfully")
                dispatch({
                    type: "setUserInfo",
                    name: submitData.data.data.name,
                    userName: submitData.data.data.useName,
                    email: submitData.data.data.email,
                    id: submitData.data.data._id,
                })
                setLoading(false)
                navigate("/")
                window.location.reload()
                return
            }
            showingalert("info", submitData.data.msg)
            setLoading(false)
        } catch (error) {
            showingalert("danger", error.response.data.msg)
            setLoading(false)
        }
    }

    const passwordToggel = () => {
        setShowHidePassWord(!showHidePassWord)
    }

    const changeHandler = (e) => {
        let name = e.target.name
        if (name === "userName") {
            setUserName(e.target.value)
        }
        else if (name === "password") {
            setPassword(e.target.value)
        }
    }

    return (
        <>
            <section className="" style={{ backgroundColor: "#9A616D" }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-xl-10">
                            <div className="card" style={{ borderRadius: "1rem" }}>
                                <div className="row g-0">
                                    <div className="col-md-6 col-lg-5 d-none d-md-block">
                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                                            alt="login form" className="img-fluid" style={{ borderRadius: "1rem 0 0 1rem", height: "100%" }} />
                                    </div>
                                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                        <div className="card-body p-3 p-lg-4 text-black">

                                            <form onSubmit={submitHandler}>
                                                <h3 className="fw-bolder mb-3 pb-2" style={{ letterSpacing: "1px" }}>Sign Into Your Account</h3>

                                                <div className="form-outline mb-4">
                                                    <label className="form-label" htmlFor="formUserName">UserName</label>
                                                    <input onChange={changeHandler} type="text" name="userName" id="formUserName" className="form-control form-control-lg" value={userName} placeholder="Enter UserName" minLength={5} required />
                                                </div>

                                                <div className="form-outline mb-4">
                                                    <label className="form-label" htmlFor="formpassword">Password</label>
                                                    <input onChange={changeHandler} type={(showHidePassWord) ? "text" : "password"} name="password" id="formpassword" className="form-control form-control-lg" value={password} placeholder="Enter Password" minLength={8} required />
                                                    <i onClick={passwordToggel} className={`ms-2 pt-2 bi bi-eye${(showHidePassWord) ? "" : "-slash"}`} id="togglePassword">{(showHidePassWord) ? " Hide Password" : " Show Password"}</i>

                                                </div>

                                                <div className="pt-1 mb-4">
                                                    <button className="btn btn-dark btn-lg btn-block" type="submit" disabled={loading}>
                                                        {
                                                            (loading) ?
                                                                <div className="spinner-border text-light" role="status">
                                                                    <span className="visually-hidden">Loading...</span>
                                                                </div>
                                                                :
                                                                "Login"
                                                        }
                                                    </button>
                                                </div>

                                                <Link className="small text-muted" to="/forget">Forgot password?</Link>
                                                <p className=" fw-bold mb-5 pb-lg-2" style={{ color: "#393f81" }}>Don't have an account? <Link to="/signup"
                                                    style={{ color: "#393f81" }}>Register here</Link></p>
                                                <p className="small text-muted"><u >
                                                    Terms of use. Privacypolicy</u> </p>
                                            </form>

                                        </div>
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

export default LogInPage;