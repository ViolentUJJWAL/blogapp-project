import axios from "axios"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import BlogCard from "./BlogCard"
import UserList from "./UserList"
import LoadingPage from "../LoadingPage"

function HomeWithLogin(props) {

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

    const [name, setName] = useState('Dear')
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [userRole, setUserRole] = useState('')
    const [id, setId] = useState('')
    const [dataLoad, setDataLoad] = useState(false)
    const [blog, setBlog] = useState([])
    const [filter, setFilter] = useState("all")
    const [loading, setLoading] = useState(false)
    const [searchWord, setsearchWord] = useState(true)
    const [searchUser, setsearchUser] = useState(false)
    const [search, setSearch] = useState("")
    const [userIsOn, setUserIsOn] = useState(false)


    const imageStyle = {
        height: "100px",
        width: "100px",
        borderRadius: "50%"
    }

    const saveUserData = () => {
        setDataLoad(true)
        setLoading(true)
        axios.get(`/api/v1/blog/userInfo/${window.localStorage.getItem("userName")}`, {
            headers: {
                token: window.localStorage.getItem("token")
            }
        }).then((res) => {
            const { name, userName, email, _id, role } = res.data.user[0]
            setName(name)
            window.localStorage.name = name
            setUserName(userName)
            window.localStorage.userName = userName
            setEmail(email)
            setId(_id)
            window.localStorage.userId = _id
            setUserRole(role)
            setLoading(false)
        }).catch(err => {
            console.log(err)
            setLoading(false)
        })
    }

    const saveBlogData = () => {
        setLoading(true)
        axios.get(`/api/v1/blog/allblog`, {
            headers: {
                token: window.localStorage.getItem("token")
            }
        }).then((res) => {
            setBlog(res.data.data)
            setLoading(false)
        }).catch(err => {
            console.log(err)
            setLoading(false)
        })
    }

    if (dataLoad) {
        window.localStorage.setItem("name", name)
        window.localStorage.setItem("userId", id)
        window.localStorage.setItem("userEmail", email)
        setDataLoad(false)
    }


    useEffect(() => {
        saveUserData()
        saveBlogData()
    }, [])

    const filterHandler = (e) => {
        const filterName = e.target.name
        setFilter(filterName)
    }

    const likeBlogData = (i, id) => {
        const arr = blog
        arr[i].like.push(id)
        setBlog(arr)
    }

    const deleteBlogData = (i) => {
        const arr = blog
        arr.splice(i, 1)
        setBlog(arr)
        window.location.reload()
    }

    const updateBlogData = (i, title, image, description) => {
        const arr = blog
        arr[i].title = title
        arr[i].image = image
        arr[i].description = description
        setBlog(arr)
    }


    const dislikeBlogData = (i, id) => {
        const arr = blog
        let index = arr[i].like.indexOf(id)
        arr[i].like.splice(index, 1)
        setBlog(arr)
    }


    let blogArr = blog.map((e, i) => {
        if (filter === e.category || filter === "all") {
            if ((searchUser || searchWord) && (search.length >= 3)) {
                if (searchUser && e.autherName.toLowerCase().search(search.toLowerCase()) !== -1) {
                    return <BlogCard data={e} key={i}
                        userName={userName}
                        userRole={userRole}
                        showingalert={showingalert}
                        likeBlogData={(id) => { likeBlogData(i, id) }}
                        updateBlogData={(title, image, description) => { updateBlogData(i, title, image, description) }}
                        deleteBlogData={() => { deleteBlogData(i) }}
                        dislikeBlogData={(id) => { dislikeBlogData(i, id) }}
                    />
                }
                if (searchWord && e.title.toLowerCase().search(search.toLowerCase()) !== -1) {
                    return <BlogCard data={e} key={i}
                        userName={userName}
                        userRole={userRole}
                        showingalert={showingalert}
                        likeBlogData={(id) => { likeBlogData(i, id) }}
                        updateBlogData={(title, image, description) => { updateBlogData(i, title, image, description) }}
                        deleteBlogData={() => { deleteBlogData(i) }}
                        dislikeBlogData={(id) => { dislikeBlogData(i, id) }}
                    />
                }
            }
            else {
                return <BlogCard data={e} key={i}
                    userName={userName}
                    userRole={userRole}
                    showingalert={showingalert}
                    likeBlogData={(id) => { likeBlogData(i, id) }}
                    updateBlogData={(title, image, description) => { updateBlogData(i, title, image, description) }}
                    deleteBlogData={() => { deleteBlogData(i) }}
                    dislikeBlogData={(id) => { dislikeBlogData(i, id) }}
                />
            }
        }
        return ""
    })

    const changeSearchHandler = (e) => {
        let targetName = e.target.name
        if (targetName === "searchUser") {
            setsearchUser(!searchUser)
        } else if (targetName === "searchWord") {
            setsearchWord(!searchWord)
        }
        else if (targetName === "search") {
            setSearch(e.target.value)
        }
    }

    return (
        <div>
            <div className="container h-100">
                <div className="mt-3">
                    <h2 className=""> Hello {name}</h2>
                    <h2 className="mb-4">&nbsp; &nbsp; What's on your mind?</h2>
                    <div className="d-flex flax-row overflow-auto">
                        <div onClick={filterHandler} className="m-3 text-center">
                            <img className={`${(filter === "natural") ? 'border border-success border-5' : ""}`} name="natural" src="https://4kwallpapers.com/images/walls/thumbs_3t/5661.jpg" alt="Natural" style={imageStyle} />
                            <h5>Natural</h5>
                        </div>
                        <div onClick={filterHandler} className="m-3 text-center">
                            <img className={`${(filter === "it") ? 'border border-success border-5' : ""}`} name="it" src="https://w0.peakpx.com/wallpaper/390/568/HD-wallpaper-artificial-intelligence-background-vectors-stock-psd-vision.jpg" alt="IT" style={imageStyle} />
                            <h5>IT</h5>
                        </div>
                        <div onClick={filterHandler} className="m-3 text-center">
                            <img className={`${(filter === "sport") ? 'border border-success border-5' : ""}`} name="sport" src="https://images.news18.com/ibnkhabar/uploads/2022/08/Education-N18-34-1.jpg" alt="Sport" style={imageStyle} />
                            <h5>Sport</h5>
                        </div>
                        <div onClick={filterHandler} className="m-3 text-center">
                            <img className={`${(filter === "game") ? 'border border-success border-5' : ""}`} name="game" src="https://www.athena.org.in/public/uploads/16234749308713710129_Free%20Online%20Virtual%20Games%20Teens.png" alt="onlineGame" style={imageStyle} />
                            <h5>Games</h5>
                        </div>
                        <div onClick={filterHandler} className="m-3 text-center">
                            <img className={`${(filter === "politics") ? 'border border-success border-5' : ""}`} name="politics" src="https://static.toiimg.com/imagenext/toiblogs/photo/readersblog/wp-content/uploads/2022/12/IMG_20221222_195024.jpg" alt="Politics" style={imageStyle} />
                            <h5>Politics</h5>
                        </div>
                        <div onClick={filterHandler} className="m-3 text-center">
                            <img className={`${(filter === "enterterment") ? 'border border-success border-5' : ""}`} name="enterterment" src="https://images.livemint.com/img/2022/09/27/600x338/cd4cc2c2-3e4c-11ed-beb2-58c7b3916bd4_1664273666951.jpg" alt="Enterterment" style={imageStyle} />
                            <h5>Enterterment</h5>
                        </div>
                        <div onClick={filterHandler} className="m-3 text-center">
                            <img className={`${(filter === "business") ? 'border border-success border-5' : ""}`} name="business" src="https://online.vu.edu.au/sites/default/files/styles/blogfeature_large/public/field/image/Easiest_countries_to_start_a_business_main_image.jpeg" alt="business" style={imageStyle} />
                            <h5>Business</h5>
                        </div>
                        <div onClick={filterHandler} className="m-3 text-center">
                            <img className={`${(filter === "food") ? 'border border-success border-5' : ""}`} name="food" src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg" alt="food" style={imageStyle} />
                            <h5>Food</h5>
                        </div>

                    </div>
                </div>
            </div>
            <div className="container border border-info rounded rounded-4 p-2 bg-info" style={{ position: "sticky", top: "70px", zIndex: "5" }}>
                <div className="d-flex flax-row">
                    <div className="me-auto my-auto">
                        <button onClick={() => {
                            setFilter("all")
                            if(userIsOn){
                                setUserIsOn(false)
                            }
                        }} type="button" className={`btn btn${(filter === "all") ? '' : '-outline'}-success`}>Show all Blog</button>
                        {(userRole === "admin") ?
                            <button onClick={() => {
                                setUserIsOn(!userIsOn)
                            }} type="button" className={`ms-2 btn btn${(userIsOn) ? '' : '-outline'}-success`}>Show User</button>
                            : ""
                        }
                    </div>
                    <form className="ms-auto d-flex" role="search">
                        <input className="ms-2 form-control" type="search" placeholder="Search" onChange={changeSearchHandler} name="search" value={search} aria-label="Search" />
                        <div className="ms-1 my-auto">
                            <div className="form-check form-check-reverse">
                                <input onChange={changeSearchHandler} className="form-check-input" type="checkbox" name="searchUser" />
                                <label className="form-check-label" htmlFor="searchUser">
                                    User
                                </label>
                            </div>
                            <div className="form-check form-check-reverse">
                                <input onChange={changeSearchHandler} className="form-check-input" type="checkbox" checked={searchWord} name="searchWord" />
                                <label className="form-check-label" htmlFor="searchWord">
                                    Word
                                </label>
                            </div>
                        </div>
                    </form>
                </div>
            </div>


            <div className="container-fluid row justify-content-center align-items-center">
                {(loading) ?
                    <LoadingPage/>
                    : (userIsOn) ? <UserList showingalert={showingalert} /> 
                    : blogArr.reverse()
                }
            </div>
        </div>

    );
};

export default HomeWithLogin;