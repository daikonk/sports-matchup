// Login.js
import React, { useEffect } from 'react';

const Login = () => {
    useEffect(() => {
        document.title = 'Login - Sports Matchup';
      }, []);

    return (
        <main className="container mb-5">
            <h1 className="text-center mb-5"> Login/Sign up</h1>
            <div id="login-form">
                <h2>Login</h2>
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