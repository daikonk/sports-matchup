// Register.js
import React, { useEffect } from 'react';

const Register = () => {
    useEffect(() => {
        document.title = 'Sign Up - Sports Matchup';
      }, []);

    return (
        <main>
            <section className="container mt-2 bg-light bg-text-light">
                <h1 className='text-center'>Sign Up</h1>
                <form id="register-form" method="POST">
                    <div className="mb-3">
                        <label for="email">Email:</label>
                        <input type="email" id="email" name="email" className="form-control" required/>
                    </div>
                    <div className="mb-3">
                        <label for="password">Password:</label>
                        <input type="password" id="password" name="password" className="form-control" required/>
                    </div>
                    <div className="mb-3">
                        <label for="password-confirm">Repeat Password:</label>
                        <input type="password" id="password-confirm" name="password-confirm" className="form-control" required/>
                    </div>
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
                <p>Already have an account? <a href="/Login" id="toggle-register">Login here</a></p>
            </section>
        </main>
    );
};

export default Register;