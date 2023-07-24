import React from "react"
import { useSelector } from "react-redux";

function AlertComp(props) {

    const {show, mode, msg} = useSelector(state => state.alertReducer)

    return (
        <div className={`m-5 alert alert-${mode} ${(show? "d-block": "d-none")}`} role="alert"
            style={{position: "fixed", top:"10%", zIndex:"10"}}
        >
            <h5 className="fw-bloder text-center text-uppercase">
            {msg}
            </h5>
        </div>
    );
};

export default AlertComp;