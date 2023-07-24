import axios from "axios";
import React, { useEffect, useState } from "react"
import LoadingPage from "../LoadingPage";

function UserList(props) {

    const [allUserArr, setAllUserArr] = useState([])
    const [loading, setLoading] = useState(false)

    const saveAllUserdata = () => {
        setLoading(true)
        axios.get(`/api/v1/user/allUser/${window.localStorage.userName}`, {
            headers: {
                token: window.localStorage.getItem("token")
            }
        }).then(res => {
            setAllUserArr(res.data.userData)
            setLoading(false)
        }).catch(err => {
            props.showingalert("danger", err.respones.data.msg)
        })
    }

    const roleChangeHandler = async (i, id, role) => {
        if (role === 'user') {
            setLoading(true)
            await axios.get(`/api/v1/user/userToAdmin/${window.localStorage.userName}?id=${id}`, {
                headers: {
                    token: window.localStorage.getItem("token")
                }
            }).then(res => {
                const arr = allUserArr
                arr[i].role = "admin"
                setAllUserArr(arr)
                setLoading(false)
                props.showingalert("success", "user convert to admin")
            }).catch(err => {
                props.showingalert("danger", err.respones.data.msg)
                setLoading(false)
            })
        } else if(role === 'admin') {
            setLoading(true)
            await axios.get(`/api/v1/user/AdminToUser/${window.localStorage.userName}?id=${id}`, {
                headers: {
                    token: window.localStorage.getItem("token")
                }
            }).then(res => {
                const arr = allUserArr
                arr[i].role = "user"
                setAllUserArr(arr)
                setLoading(false)
                props.showingalert("success", "admin convert to user")
            }).catch(err => {
                props.showingalert("danger", err.respones.data.msg)
                setLoading(false)
            })
        }
    }

    const userArr = allUserArr.map((e, i) => {
        return (
            <tr key={i}>
                <td>{i + 1}</td>
                <td>{e._id}</td>
                <td>{e.userName}</td>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td>{e.role}</td>
                <td className="text-center"><button onClick={() => { roleChangeHandler(i, e._id, e.role) }} className="btn btn-danger" disabled={e._id === window.localStorage.userId}>{(e.role === "user") ? "To Admin" : "To User"}</button></td>
                <td>{e.date}</td>
            </tr>
        )
    })

    useEffect(() => {
        saveAllUserdata()
    }, [])




    return (
        <div className="mt-4 col-12 justify-content-center align-items-center row">
            {
                (loading) ?
                    <LoadingPage/>
                    :
                    <div className="table-responsive">
                        <table className="table table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th>Sr.</th>
                                    <th>UserId</th>
                                    <th>UserName</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Add/remove Admin</th>
                                    <th>Create Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userArr.reverse()}
                            </tbody>
                        </table>
                    </div>
            }
        </div>
    );
};

export default UserList;