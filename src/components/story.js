import React, {useContext, useEffect} from 'react'
import StoryContext from '../context/storyContext'
import { useNavigate, useParams } from 'react-router-dom';

function Story() {
  const { id } = useParams();
  const navigate = useNavigate();
  const context = useContext(StoryContext);
  const { getStory , story,  likeStory, unlikeStory, isliked} = context;
  
  useEffect(() => {
    getStory(id)
      // eslint-disable-next-line
  }, [navigate])

  const handlelike =()=>{
    likeStory(id)
  }
  const handleunlike =()=>{
    unlikeStory(id)
  }
      return (
        <div className="container my-3">
          <h2>Your Story</h2>
          <h3>Prompt - {story.prompt}</h3>
          <p>{story.description}</p>
          <p>Total Likes {(story.likes !== undefined) ? story.likes.length : 0}</p>
          {!isliked && <button type="button" className="btn btn-primary btn-sm m-3" onClick={handlelike}>Like</button>}
          {isliked && <button type="button" className="btn btn-secondary btn-sm m-3" onClick={handleunlike}>Unlike</button>}
        </div>
      )
}

export default Story;