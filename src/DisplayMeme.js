import React, { useState, useEffect } from "react"
import Axios from "axios"
import "./DisplayMeme.css"
import { FaTrash, FaEdit } from "react-icons/fa";
import { Container, Input, InputGroup, Button, Card, CardBody, CardHeader, CardFooter } from "reactstrap";

const DisplayMeme = () => {

    //collect the initial state of API
    const [state, setState] = useState([])

    //set Instance to Edit the Created Data
    const [Edit, setEdit] = useState({ name: "", caption: "", url: "" })
    
    // Instance to Pass the Data to Edit Section
    const [x, setX] = useState({ name: "", id: "" }) 

    //Change the posted data : AKA Edit
    const Changed = (id, name) => {
        setX({ name: name, id: id })

    }
    

    //Fetch Data From API
    const fetchData = async () => {
        const { data } = await Axios.get("https://crio-xmeme.herokuapp.com/api/memes/",)
        setState(data)
    }
    useEffect(() => {
        fetchData()
    }, [])

    //Delete Method to delet the post 
    const del = (id) => {
        window.location.reload();
        Axios.delete(`https://crio-xmeme.herokuapp.com/api/memes-delete/${id}/`).then(res => fetchData())
    }

    //Post method to post the eddited data
    const edit = (name, id) => {
        window.location.reload();
        Axios.post(`https://crio-xmeme.herokuapp.com/api/memes-update/${id}/`, {
            name: name,
            caption: Edit.caption,
            url: Edit.url
        }).then(res => fetchData()).then({ name: "", caption: "", url: "" }).then(console.log(Edit))
    }

    //Handel the changes made to input Feild of Data
    const handleInput = (e) => {
        setEdit({ ...Edit, [e.target.name]: e.target.value })
    }


    return (
        <div>
            {state.length > 0 ? (
                <>
                    <h1 className="text-center heading">Xmeme-Chat with memes</h1>
                    <Container className="display-container">

                        {state.map(res => (
                            <Card key={res.id} className="card-display">

                                <CardHeader className="card-header"><div className="bod">{res.name}</div></CardHeader>

                                <CardBody className="card-body">
                                    
                                    <img src={res.url} alt="image here" height="300px" />
                                    
                                    <p className="mt-4 text-left">{res.caption} <br /><a style={{ textDecoration: "none", color: "green" }} href="#popup1" onClick={() => Changed(res.id, res.name)}>(Edit)</a><FaTrash className="trash" onClick={() => del(res.id)} color="rgb(248, 130, 130)" /></p>

                                    <div id="popup1" className="overlay" >
                                        
                                        <div className="popup">
                                            
                                            <h2 className="text-center edit-head">Hiee!! {x.name}</h2>
                                            <a className="close" href="#">&times;</a>
                                            <h5 className="text-center">Edit your details here</h5>
                                            
                                            <div className="content" >
                                                <input className="inpu" type="text" placeholder="Caption" name="caption" value={Edit.caption} onChange={handleInput} />
                                                
                                                <input className="inpu" type="text" placeholder="Meme Url" name="url" value={Edit.url} onChange={handleInput} />
                                                
                                                <button className="text-center butt" onClick={() => edit(x.name, x.id)} >Submit</button>
                                            </div>
                                        
                                        </div>

                                    </div>

                                </CardBody>

                            </Card>
                        ))}
                    </Container>
                </>
            ) : (
            <>
                <h1 className="text-center heading">Welcome! to Xmeme</h1>
                <h1 className="text-center no-chat">No Meme chats to display</h1>
            </>
            )}
        </div>


    )
}

export default DisplayMeme
