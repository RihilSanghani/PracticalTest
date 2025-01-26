import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

const NotFound = () => {
    return (
        <>
            <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
                <div className="text-center">
                    <h1 className="display-1 fw-bold text-danger">404</h1>
                    <p className="lead mb-4">Oops! The page you are looking for doesn't exist.</p>
                    <button
                        className="btn btn-primary px-4 py-2"
                        onClick={() => window.location.href = '/'}
                    >
                        Go to Home
                    </button>
                </div>
            </div>
        </>
    )
}

export default NotFound