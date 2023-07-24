import React from "react"
import HomeWithLogin from "./HomeWithLogIn";
import { useNavigate } from "react-router-dom";

function Home(props) {

    const token = window.localStorage.getItem("token")
    const navigate = useNavigate()

    if(token===null){
        navigate('/login')
    }

    return (
        <div>
            <HomeWithLogin />
        </div>
    );
};

export default Home;