import React, {useState} from "react"
import "./Create.css"
import { useDispatch} from "react-redux"
import axios from "axios"

function CreateBlog(props) {

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

    const [bgPic, setBgPic] = useState('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('all')
    const [image, setImage] = useState('')


    const bghandler = (e) => {
        let bgvalue = e.target.value
        setCategory(bgvalue)
        if(bgvalue==="natural"){
            setBgPic('https://4kwallpapers.com/images/walls/thumbs_3t/5661.jpg')
        }else if(bgvalue==="it"){
            setBgPic('https://w0.peakpx.com/wallpaper/390/568/HD-wallpaper-artificial-intelligence-background-vectors-stock-psd-vision.jpg')
        }else if(bgvalue==="sport"){
            setBgPic('https://images.news18.com/ibnkhabar/uploads/2022/08/Education-N18-34-1.jpg')
        }else if(bgvalue==="game"){
            setBgPic('https://www.athena.org.in/public/uploads/16234749308713710129_Free%20Online%20Virtual%20Games%20Teens.png')
        }else if(bgvalue==="politics"){
            setBgPic('https://static.toiimg.com/imagenext/toiblogs/photo/readersblog/wp-content/uploads/2022/12/IMG_20221222_195024.jpg')
        }else if(bgvalue==="enterterment"){
            setBgPic('https://images.livemint.com/img/2022/09/27/600x338/cd4cc2c2-3e4c-11ed-beb2-58c7b3916bd4_1664273666951.jpg')
        }else if(bgvalue==="business"){
            setBgPic('https://online.vu.edu.au/sites/default/files/styles/blogfeature_large/public/field/image/Easiest_countries_to_start_a_business_main_image.jpeg')
        }else if(bgvalue==="food"){
            setBgPic('https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg')
        }else{
            setBgPic('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')
        }
    }

    const changeHandler = (e) =>{
        let targetName = e.target.name
        if(targetName==="title"){
            setTitle(e.target.value)
        }else if(targetName==="description"){
            setDescription(e.target.value)
        }else if(targetName==="image"){
            setImage(e.target.value)
        }
    }

    const submitHandler = async(e) =>{
        e.preventDefault()
        const autherName = window.localStorage.getItem("name")
        const autherId = window.localStorage.getItem("userId")
        try {
            await axios.post("/api/v1/blog/create",
                {
                    title, description, image, category, autherName, autherId
                },
                {
                    headers: {
                        token: window.localStorage.getItem("token")
                    }
                }
            )
            showingalert("success", "blog created")
            setTitle("")
            setDescription("")
            setImage("")
            setCategory("")
        } catch (error) {
            props.showingalert("danger", error.respones.data.msg)
            console.log(error)
        }
    }

    return (
        <section className="vh-100 bg-image"
            style={{ backgroundImage: `url(${bgPic})`, backgroundAttachment:"fixed", backgroundRepeat:"no-repeat", backgroundSize:"cover" }}>
            <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                            <div className="card" style={{ borderRadius: "15px", backgroundColor:"rgba(255, 255, 255, 0.5)", border: "2px solid black" }}>
                                <div className="card-body p-3">
                                    <h2 className="text-uppercase text-center mb-3">Create Blog</h2>

                                    <form onSubmit={submitHandler}>

                                        <div className="form-outline mb-4">
                                            <label className="form-label fw-bold" htmlFor="formcategory">Blog Category</label>
                                            <select onChange={bghandler} name="category" className="form-select form-select-sm" aria-label=".form-select-sm example">
                                                <option value="all">Open this select menu</option>
                                                <option value="natural">Natural</option>
                                                <option value="it">Information Technology</option>
                                                <option value="sport">Sport</option>
                                                <option value="game">Online Game</option>
                                                <option value="politics">Politics</option>
                                                <option value="enterterment">Enterterment</option>
                                                <option value="business">Business</option>
                                                <option value="food">Food</option>
                                            </select>
                                        </div>

                                        <div className="form-outline mb-3">
                                            <label className="form-label fw-bold" htmlFor="formtitle">Title</label>
                                            <input onChange={changeHandler} type="text" id="formtitle" name="title" value={title} className="form-control form-control-lg" required />
                                        </div>


                                        <div className="form-outline mb-3">
                                            <label className="form-label fw-bold" htmlFor="formdescription">Description</label>
                                            <textarea onChange={changeHandler} type="textarea" name="description" value={description} id="formdescription" className="form-control form-control-lg" required />
                                        </div>

                                        <div className="form-outline mb-3">
                                            <label className="form-label fw-bold" htmlFor="formimage">Image URL</label>
                                            <input onChange={changeHandler} type="text" id="formimage" name="image" value={image} className="form-control form-control-lg" required />
                                        </div>

                                        <div className="d-flex justify-content-center">
                                            <button type="submit"
                                                className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Create</button>
                                        </div>

                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CreateBlog;