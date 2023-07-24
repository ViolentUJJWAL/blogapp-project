import React, { useEffect, useState } from "react"
import axios from "axios"
import { useDispatch } from "react-redux"
import BlogCard from "./Home/BlogCard"
import { Link } from "react-router-dom"

function MyBlog(props) {

    const [userData, setUserData] = useState('')
    const [loading, setLoading] = useState(false)

    const [blog, setBlog] = useState([])
    const [filter, setFilter] = useState("all")
    const [searchWord, setsearchWord] = useState(true)
    const [searchUser, setsearchUser] = useState(false)
    const [search, setSearch] = useState("")

    const saveData = () => {
        setLoading(true)
        axios.get(`/api/v1/blog/${window.localStorage.userName}`, {
            headers: {
                token: window.localStorage.getItem("token")
            }
        }).then((res) => {
            setUserData(res.data)
            setBlog(res.data.blog)
            setLoading(false)
        }).catch(err => {
            console.log(err)
            setLoading(false)
        })
    }
    

    useEffect(() => {
        saveData()
    }, [])


    const filterHandler = (e) => {
        const filterName = e.target.id
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


    let blogArr = (blog.length === 0) ? <h1>Empty Blog <Link to="/createblog">Create your first blog</Link></h1> : blog.map((e, i) => {
        if (filter === e.category || filter === "all") {
            if ((searchUser || searchWord) && (search.length >= 3)) {
                
                if (searchUser && e.autherName.toLowerCase().search(search.toLowerCase()) !== -1) {
                    console.log("step 2")
                    return <BlogCard data={e} key={i}
                        userName={userData.user.userName}
                        showingalert={showingalert}
                        likeBlogData={(id) => { likeBlogData(i, id) }}
                        updateBlogData={(title, image, description) => { updateBlogData(i, title, image, description) }}
                        deleteBlogData={() => { deleteBlogData(i) }}
                        dislikeBlogData={(id) => { dislikeBlogData(i, id) }}
                    />
                }
                if (searchWord && e.title.toLowerCase().search(search.toLowerCase()) !== -1) {
                    
                    return <BlogCard data={e} key={i}
                        userName={userData.user.userName}
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
                    userName={userData.user.userName}
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
        <div className="container w-100 h-100">
            {
                (!userData) ?
                    <h1 className="m-auto">loading</h1>
                    :
                    <div className="row">
                        <div className="m-3 col-12">
                            <h1>Name: {userData.user.name}</h1>
                            <h3>UserName: {userData.user.userName}</h3>
                            <h3>Email: {userData.user.email}</h3>
                        </div>
                        <div className="container border border-info rounded rounded-4 p-2 bg-info" style={{ position: "sticky", top: "70px", zIndex: "5" }}>
                            <div className="d-flex flax-row">
                                <div className="me-auto my-auto">

                                    <div className="dropdown">
                                        <button className="btn btn-secondary dropdown-toggle text-uppercase" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            {filter}
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li onClick={filterHandler} id="all" className="dropdown-item"> All Blog</li>
                                            <li onClick={filterHandler} id="natural" className="dropdown-item"> Natural</li>
                                            <li onClick={filterHandler} id="it" className="dropdown-item" >Information Technology</li>
                                            <li onClick={filterHandler} id="sport" className="dropdown-item" >Sport</li>
                                            <li onClick={filterHandler} id="game" className="dropdown-item" >Online Game</li>
                                            <li onClick={filterHandler} id="politics" className="dropdown-item" >Politics</li>
                                            <li onClick={filterHandler} id="enterterment" className="dropdown-item" >Enterterment</li>
                                            <li onClick={filterHandler} id="business" className="dropdown-item" >Business</li>
                                            <li onClick={filterHandler} id="food" className="dropdown-item" >Food</li>
                                        </ul>
                                    </div>

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
                                <div className="spinner-border text-warning" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                : blogArr.reverse()
                            }
                        </div>

                    </div>
            }
        </div>
    );
};

export default MyBlog;