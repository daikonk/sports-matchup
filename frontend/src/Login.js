// Login.js
import React, { useEffect } from 'react';

const Login = () => {
    useEffect(() => {
        document.title = 'Login - Sports Matchup';
      }, []);

    return (
        <main>
            
            <div id="login-form" className="container mt-2 bg-light bg-text-light p-2">
                <h1 className='text-center'>Login</h1>
                <form id="login" method="POST">
                    <div className="mb-3">
                        <label for="email" className="form-label">Email:</label>
                        <input type="email" id="email" name="email" className="form-control" required/>
                    </div>
                    <div className="mb-3">
                        <label for="password" className="form-label">Password:</label>
                        <input type="password" id="password" name="password" className="form-control" required/>
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
                <p>Don't have an account? <a href="/Register">Register here</a></p>
            </div>

        </main>
    );
};

export default Login;