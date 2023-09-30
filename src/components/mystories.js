import React, { useContext, useEffect } from 'react'
import StoryContext from '../context/storyContext'

function Mystories() {
    const context = useContext(StoryContext);
    const { stories, getStories , handletostory} = context;
    useEffect(() => {
        getStories()
        // eslint-disable-next-line
    }, [])

    return (
        <div className="container">
            {(stories.length < 1) && 
                <div>You have no saved stories.</div>
            }
            {(stories.length > 0) && 
                <h2 style={{margin: "20px"}}>Here are your saved stories.</h2>
            }
            {Object.keys(stories).map((key, i) => (
                <div className="card" key={i}>
                    <div className="card-body">
                        <h5 className="card-title">{stories[key].prompt}</h5>
                        <p className="card-text">{stories[key].description.substring(0,20) + "..."}
                        <span style={{cursor:"pointer", color:'blue'}} onClick={() => { handletostory(stories[key]) }}>See Full Story</span>
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Mystories