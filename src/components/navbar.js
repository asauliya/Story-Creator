import { useEffect , useState} from 'react';
import React from 'react'
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const [isAuthenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setAuthenticated(true);
        } else if (token === null) {
            setAuthenticated(false);
        }
    }, [navigate]);
  
    const handle = ()=>{
        localStorage.clear();
        setAuthenticated(false);
        navigate('/login');
    }
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Story Creator</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {isAuthenticated && <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="mystories">My Stories</Link>
                        </li>}
                    </ul>
                    {!isAuthenticated && <div className="d-flex">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="signup">Sign Up</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="login">Login</Link>
                            </li>
                        </ul>
                    </div>}
                    {isAuthenticated && <div className="d-flex">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <button className="nav-link active" aria-current="page" onClick={handle}>Logout</button>
                            </li>
                        </ul>
                    </div>}
                </div>
            </div>
        </nav>
    )
}

export default Navbar