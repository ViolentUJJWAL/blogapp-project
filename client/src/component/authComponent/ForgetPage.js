import axios from "axios"
import React, { useState } from "react"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../LoadingPage";

function ForgetPage(props) {

    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState('')
    const [id, setId] = useState('')
    const [password, setPassword] = useState('')
    const [sendOtpForm, setsendOtpForm] = useState(false)
    const [otpVerifyForm, setotpVerifyForm] = useState(false)
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()
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

    const changeHandler = (e) => {
        let name = e.target.name
        if (name === "email") {
            setEmail(e.target.value)
        } else if (name === "otp") {
            setOtp(e.target.value)
        } else if (name === "password") {
            setPassword(e.target.value)
        }
    }

    const sendOtpBtn = async (e) => {
        e.preventDefault()
        setLoading(true)
        await axios.post("/api/v1/auth/forget", { email: email })
            .then(res => {
                setsendOtpForm(true)
                setLoading(false)
                showingalert("success", "OTP send your Email")
                setId(res.data.id)
            }).catch(err => {
                setLoading(false)
                if (err.response.data.msg === "Wrong otp") {
                    showingalert("danger", "Enter valid OTP")
                }else{
                    showingalert("danger", err.response.data.msg)
                }
            })
    }

    const verifyOtpBtn = async (e) => {
        e.preventDefault()
        setLoading(true)
        setsendOtpForm(true)
        await axios.post("/api/v1/auth/forgetOtpVerify", { email: email, otp: Number(otp), id: id })
            .then(res => {
                setotpVerifyForm(true)
                showingalert("success", "OTP verify Successfully")
                setLoading(false)
            }).catch(err => {
                showingalert("danger", err.response.data.msg)
                setLoading(false)
            })
    }

    const navigate = useNavigate()

    const changePassWordBtn = async (e) => {
        e.preventDefault()
        setLoading(true)
        await axios.post("/api/v1/auth/changepassword", { email: email, password: password, id: id })
            .then(res => {
                showingalert("success", "password change Successfully")
                setLoading(false)
                navigate("/login")
            }).catch(err => {
                setLoading(false)
                props.showingalert("danger", err.response.data.msg)
            })
    }

    return (
        <section className="vh-100" style={{ backgroundColor: "#eee" }}>
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="card text-black" style={{ borderRadius: "25px" }}>
                            <div className="card-body p-md-5">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Forget Password</p>

                                        {
                                            (loading) ?
                                                <center className="row" style={{ height: "200px" }}>

                                            <div className="m-auto">
                                                    <LoadingPage/>
                                            </div>

                                                </center>
                                                :
                                                (!sendOtpForm) ?
                                                    <form onSubmit={sendOtpBtn} className="mx-1 mx-md-4">
                                                        <div className="d-flex flex-row align-items-center mb-4">
                                                            <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                            <div className="form-outline flex-fill mb-0">
                                                                <label className="form-label" >Your Email</label>
                                                                <input onChange={changeHandler} name="email" value={email} type="email" className="form-control"
                                                                    placeholder="Enter Email" required />
                                                            </div>
                                                        </div>
                                                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                            <button type="submit" className="btn btn-primary btn-lg">Send OTP</button>
                                                        </div>
                                                    </form>

                                                    : (!otpVerifyForm) ?

                                                        <form onSubmit={verifyOtpBtn} className="mx-1 mx-md-4">
                                                            <div className="d-flex flex-row align-items-center mb-4">
                                                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                                <div className="form-outline flex-fill mb-0">
                                                                    <label className="form-label">OTP send your Email: {email}</label>
                                                                    <input onChange={changeHandler} name="otp" value={otp} type="number" className="form-control"
                                                                        placeholder="Enter OTP"
                                                                        maxLength={6}
                                                                        required />
                                                                </div>
                                                            </div>
                                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                                <button type="submit" className="btn btn-primary btn-lg">Verify OTP</button>
                                                            </div>
                                                        </form>

                                                        :

                                                        <form onSubmit={changePassWordBtn} className="mx-1 mx-md-4">
                                                            <div className="d-flex flex-row align-items-center mb-4">
                                                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                                <div className="form-outline flex-fill mb-0">
                                                                    <label className="form-label" >Password</label>
                                                                    <input onChange={changeHandler} name="password" value={password} type="text" className="form-control"
                                                                        placeholder="Create New password" minLength={8} required />
                                                                </div>
                                                            </div>
                                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                                <button type="submit" className="btn btn-primary btn-lg">change password</button>
                                                            </div>
                                                        </form>
                                        }



                                    </div>
                                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                            className="img-fluid" alt="forget" />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ForgetPage;