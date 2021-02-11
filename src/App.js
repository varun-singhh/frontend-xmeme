import './App.css';
import Axios from "axios"
import React, { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { Container, Input, InputGroup, Button } from "reactstrap";
import DisplayMeme from './DisplayMeme';

function App() {
  
  //current state of API
  const [state, setState] = useState([]) 

   //publish the Post data to API Database
  const [publish, setPublish] = useState({ name: "", caption: "", url: "" })

  //Fetch API Data from backend
  const fetchData = () => {
    const { data } = Axios.get("https://crio-xmeme.herokuapp.com/api/memes/")
    setState(data)
  }
  useEffect(() => {
    fetchData()
  }, [])

  //Input change grabber
  const handleInput = (e) => {
    setPublish({ ...publish, [e.target.id]: e.target.value })
  }

  //Posting the data to backend
  const handleSubmit = (e) => {

    window.location.reload();

    Axios.post("https://crio-xmeme.herokuapp.com/api/memes-create/", {
      name: publish.name,
      caption: publish.caption,
      url: publish.url
    }).then(res => fetchData()).then({ name: "", caption: "", url: "" })

  }

  return (
    <Container>

      <div className="main">

        <input className="inp text-center" type="text" value={publish.name} onChange={handleInput} placeholder="Name" id="name" />

        <input className="inp text-center" type="text" value={publish.caption} onChange={handleInput} placeholder="Caption" id="caption" />

        <input className="inp text-center" type="text" value={publish.url} onChange={handleInput} placeholder="Meme Url" id="url" />

        <button className="but text-center" onClick={handleSubmit}>Post</button>

      </div>
      <DisplayMeme />
    </Container>
  );
}

export default App;
