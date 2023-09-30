import { useNavigate } from "react-router-dom";
import StoryContext from "./storyContext";
import { useState } from "react";
import jwt_decode from "jwt-decode";


const StoryState = (props) => {
  const navigate = useNavigate();
  const host = "http://localhost:5000"
  const storiesInitial = []
  const [story, setStory] = useState({})
  const [stories, setStories] = useState(storiesInitial)
  const [top_stories, settop_Stories] = useState(storiesInitial)
  const token = localStorage.getItem('token')

  const [isliked, setIsliked] = useState(false);

  const getStory = async (id) => {
    if(handleToken()) return;
    // API Call 
    const response = await fetch(`http://localhost:5000/fetchstory/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": token
      }
    });
    const json = await response.json() 
    setStory(json)
    var decoded = jwt_decode(token);
    const userid = decoded.user.id;
    for(let i=0;i<json.likes.length;i++){
      if(json.likes[i] === userid){
        setIsliked(true);
      }
    }
  }
  // Get all Notes
  const getStories = async () => {
    if(handleToken()) return;
    // API Call 
    const response = await fetch(`${host}/fetchallstories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": token
      }
    });
    const json = await response.json() 
    setStories(json)
  }

  // Get all Notes
  const getTopStories = async () => {
    // API Call 
    const response = await fetch(`${host}/fetchtopstories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": token
      }
    });
    const json = await response.json() 
    settop_Stories(json.stories)
  }

  // like a story
  const likeStory = async (id) => {
    if(handleToken()) return;
    // API Call
    const response = await fetch(`${host}/likestory/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": token
      }
    });
    const json = await response.json(); 
    setStory(json.story);
    console.log(json)
    setIsliked(true)
  }

  // unlike a story
  const unlikeStory = async (id) => {
    if(handleToken()) return;
    // API Call 
    const response = await fetch(`${host}/unlikestory/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": token
      },
    });
    const json = await response.json(); 
    setStory(json.story) ;
    console.log(json)
    setIsliked(false)
  }

  const [alert, setAlert] = useState(null);
  const showAlert = (message, type)=>{
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
          setAlert(null);
      }, 2000);
  }
    const handleToken =()=>{
      if(token == null){
        navigate('/login')
        showAlert("Please Login" ,"warning")
        return true;
      }
      return false;
    }
    const handletostory = (story)=>{
      if(!handleToken()){
        navigate(`story/${story._id}`)
      }
    }


  return (
    <StoryContext.Provider value={{showAlert, alert,isliked, story, stories, top_stories, likeStory, unlikeStory, getStories, getTopStories,handletostory , getStory}}>
      {props.children}
    </StoryContext.Provider>
  )

}
export default StoryState;