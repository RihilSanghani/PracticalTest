import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
                <div className="text-center">
                    <Link to="/signup">
                        <button className="btn btn-primary me-3 px-4 py-2">SIGNUP</button>
                    </Link>
                    <Link to="/login">
                        <button className="btn btn-success px-4 py-2">LOGIN</button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Home