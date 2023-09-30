import React, { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Spinner from './spinner'

function Home() {
    const navigate = useNavigate();
    const host = "http://localhost:5000"
    const token = localStorage.getItem('token')
    const [prompt, setPrompt] = useState("")
    const [description, setDescription] = useState("")
    const [loading, setLoading] = useState(false);

    const onChange = (e) => {
        setPrompt(e.target.value)
    }
    // Function to call the OpenAI API
    const generateStory = async (e) => {
        setLoading(true);
        e.preventDefault();
        const response = await fetch('https://api.textcortex.com/v1/texts/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer gAAAAABlFc1W5sHPFPyd9UsE4K8sK5J24cLsAQWW070OmTvRsphjuQiYHvwx249My1hPbw4DKLhhJpFOrspG1ZWwqgSe2VCvoL32W0_qUQg9FOpYe6imBIZxvHXDJs4keWKhy8jirsGJ'
            },
            body: JSON.stringify({
                max_tokens: 128,
                model: "chat-sophos-1",
                n: 1,
                temperature: 0.65,
                text: prompt
              }),
        });

        const data_ = await response.json();
        setLoading(false);
        if (data_.status === "success") {
            setDescription(data_.data.outputs[0].text)
        } else {
            console.log( 'An error occurred while generating the story. Please try again.')
        }
    }
    const handleClick = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/addStory`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": token
            },
            body: JSON.stringify({ prompt, description })
        });

        const temp = await response.json();
        navigate(`/story/${temp._id}`)
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token === null) {
            navigate('/login')
        }
    }, [navigate]);

    return (
        <div className="container my-3">
            <h2>Add a Story</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Prompt</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={prompt} onChange={onChange} minLength={10} required />
                </div>
                <div>
                    <h2>This is your AI created story</h2>
                    {loading && <Spinner/>}
                    {!loading && <p>{description.length>0?description:"Nothing to preview!"}</p>}
                </div>
                <button disabled={prompt.length < 10} type="submit" className="btn btn-primary" onClick={generateStory}>Generate Story</button>
                <button disabled={prompt.length < 10} type="submit" className="btn btn-primary" onClick={handleClick}>Add Story</button>
            </form>
        </div>
    )
}

export default Home;