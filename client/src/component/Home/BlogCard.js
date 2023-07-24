import axios from "axios"
import React, { useState } from "react"

function BlogCard(props) {

    const [updateBtn, setUpteBtn] = useState(false)
    const [title, setTitle] = useState(props.data.title)
    const [description, setDescription] = useState(props.data.description)
    const [image, setImage] = useState(props.data.image)
    const [loading, setLoading] = useState(false)



    const changeHandler = (e) => {
        const targetName = e.target.name
        if (targetName === "title") {
            setTitle(e.target.value)
        } else if (targetName === "description") {
            setDescription(e.target.value)
        } else if (targetName === "image") {
            setImage(e.target.value)
        }
    }

    const closeWithoutUpdate = () => {
        setUpteBtn(false)
        setImage(props.data.image)
        setTitle(props.data.title)
        setDescription(props.data.description)
    }

    const updateBlog = (e) => {
        e.preventDefault()
        if (image === props.data.image && title === props.data.title && description === props.data.description) {
            props.showingalert("info", "not update same content Enter")
            setUpteBtn(false)
            return
        }
        axios.put(`/api/v1/blog/update/${window.localStorage.userName}?id=${props.data._id}`, { title, description, image }, {
            headers: {
                token: window.localStorage.getItem("token")
            }
        }).then((res) => {
            props.updateBlogData(title, description, image)
            setUpteBtn(false)
            props.showingalert("success", "update successfully")
        }).catch((err) => {
            console.log(err)
            props.showingalert("danger", err.response.data.msg)
            setUpteBtn(false)
        })
    }

    const deleteBlog = () => {
        setLoading(true)
        let c = window.confirm("Delete Blog \nEnter Ok or Cancel.");
        if (!c) {
            setLoading(false)
            return
        }
        axios.delete(`/api/v1/blog/delete/${window.localStorage.userName}?id=${props.data._id}`, {
            headers: {
                token: window.localStorage.getItem("token")
            }
        }).then((res) => {
            props.deleteBlogData()
            props.showingalert("success", "delete successfully")
            setLoading(false)
        }).catch(err => {
            props.showingalert("danger", err.response.data.msg)
            setLoading(false)
        })
    }

    const likeHandler = () => {
        if (props.data.like.indexOf(window.localStorage.userId) === -1) {
            setLoading(true)
            axios.put(`/api/v1/blog/like/${window.localStorage.userName}?id=${props.data._id}`, {}, {
                headers: {
                    token: window.localStorage.getItem("token")
                }
            }).then(res => {
                props.likeBlogData(window.localStorage.userId)
                setLoading(false)
            }).catch(err => {
                props.showingalert("danger", err.response.data.msg)
                setLoading(false)
            })
        } else {
            setLoading(true)
            axios.put(`/api/v1/blog/dislike/${window.localStorage.userName}?id=${props.data._id}`, {}, {
                headers: {
                    token: window.localStorage.getItem("token")
                }
            }).then(res => {
                props.dislikeBlogData(window.localStorage.userId)
                setLoading(false)
            }).catch(err => {
                props.showingalert("danger", err.response.data.msg)
                setLoading(false)
            })
        }
    }

    return (
        <>
            {
                (!updateBtn) ?
                    <div className="card m-3 col-11">
                        <div className="row">
                            <div className="col-12 col-md-4">
                                <img src={image} height={"auto"} width={"100%"} className="card-img col-2" alt="..." />
                            </div>
                            <div className="col-12 col-md-8">
                                <h5 className="">{title}</h5>
                                <p className="">{description}</p>
                                <div className="d-flex flax-row">
                                    <div className="me-auto">
                                        {(loading) ?
                                            <div className="spinner-grow" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                            :
                                            <i onClick={likeHandler} className={`bi bi-hand-thumbs-up${(props.data.like.indexOf(window.localStorage.userId) === -1) ? "" : "-fill"} me-5`} style={{ fontSize: "30px" }}>
                                                {props.data.like.length}
                                            </i>
                                        }
                                    </div>
                                    <h5 className="text-end d-flex">
                                        By - {props.data.autherName}</h5>
                                </div>
                                <hr />
                                {
                                    (props.data.autherId === window.localStorage.getItem("userId") || props.userRole === 'admin') ?
                                        <center className="mb-2">
                                            <button onClick={() => { setUpteBtn(true) }} className="btn me-4 btn-dark">Update</button>
                                            <button onClick={deleteBlog} className="btn btn-dark">
                                                {(loading) ?
                                                    <div className="spinner-border text-primary" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </div>
                                                    : "Delete"
                                                }
                                            </button>
                                        </center>
                                        : ""
                                }
                            </div>
                        </div>
                    </div>
                    :
                    <form onSubmit={updateBlog} className="border border-3 border-primary rounded rounded-3 col-11 m-3">
                        <div className="text-end">
                            <button type="button" onClick={closeWithoutUpdate} className="btn-close" aria-label="Close"></button>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="formImage" className="form-label">Image Url</label>
                            <input onChange={changeHandler} type="text" className="form-control" id="formImage" name="image" value={image} placeholder="Enter image url" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="formtitle" className="form-label">Title</label>
                            <input onChange={changeHandler} type="text" className="form-control" id="formtitle" name="title" value={title} placeholder="Enter title" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="formdescription" className="form-label">Description</label>
                            <textarea onChange={changeHandler} className="form-control" id="formdescription" name="description" value={description} rows="5" required></textarea>
                        </div>
                        <center>
                            <button type="submit" className="btn mb-4 btn-dark">
                                {(loading) ?
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    : "Update"
                                }
                            </button>
                        </center>
                    </form>
            }
        </>
    );
};

export default BlogCard;