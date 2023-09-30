import React, {useContext, useEffect} from 'react'
import StoryContext from '../context/storyContext'

function Leaderboard() {
  const context = useContext(StoryContext);
  const { handletostory, top_stories, getTopStories} = context;
  useEffect(() => {
    getTopStories()
      // eslint-disable-next-line
  }, [])

    return (
      <div style={{marginTop:"20px"}}>
        <h2>Leaderboard</h2>
        <div className="accordion" id="leaderboard">
            {Object.keys(top_stories).map((key, i) => (<div className="accordion-item" key={`${i}_top_story`}>
                <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${i}_top_story`} aria-expanded="true" aria-controls={`collapse${i}_top_story`}>
                        Rank {i+1}
                    </button>
                </h2>
                <div id={`collapse${i}_top_story`} className="accordion-collapse collapse" data-bs-parent="#leaderboard">
                    <div className="accordion-body">
                        <strong>{top_stories[key].prompt}</strong>
                        <p>
                            {top_stories[key].description}
                            {/* {top_stories[key].description.substring(0 , 20) + "..."} */}
                            <span style={{cursor:"pointer", color:'blue'}} className='card-link' onClick={() => { handletostory(top_stories[key]) }}>Read More</span>
                        </p>
                    </div>
                </div>
            </div>
            ))}

        </div >
      </div>
    )
}

export default Leaderboard;