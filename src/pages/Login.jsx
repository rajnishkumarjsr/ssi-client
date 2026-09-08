import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import  {setUserSession}  from '../service/authService';
import axios from "axios";

const API_DOMAIN = import.meta.env.VITE_API_DOMAIN;
const loginURL = `${API_DOMAIN}/login`;
// const apiKey = '08FLFuexFsWfnFj6uTVjaCZsq4GHfgN7zTA2BG36';

export default function Login() {
  const navigate = useNavigate();
  //const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState({ type: '', text: '' });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      setFeedback({ type: 'error', text: 'Please fill in all fields' });
      return;
    }

    try{

      const response = await axios.post(
        loginURL,
        {
          username: username,
          password: password
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success === true) {

        const userFromApi = response.data.data.user ?? {};
        const userPayload = {
          ...userFromApi,
          username: userFromApi.username ?? username,
          email: userFromApi.email ?? '',
          phone:
            userFromApi.mobile ??
            userFromApi.phone ??
            ''
        };
        
        setUserSession(userPayload, response.data.data.token);
        navigate('/');
      }
      
    }catch (error) {
      setFeedback({
        type: 'error',
        text: error?.message || 'Failed to login'
      });
    } 
    // finally {
    //   setIsSubmitting(false);
    // }

  };

  return (
    <main>
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Welcome Back</h1>
            <p>Sign in to continue your learning journey</p>
          </div>

          {feedback.text ? (
            <div
              className={`alert ${
                feedback.type === 'success' ? 'alert-success' : 'alert-error'
              }`}
            >
              {feedback.text}
            </div>
          ) : null}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">User Name</label>
              <input
                type="text"
                id="username"
                name="username"
                required
                placeholder="Enter your username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" name="remember" />
                <span className="checkmark"></span>
                Remember me
              </label>
              <a href="#" className="forgot-password">
                Forgot Password?
              </a>
            </div>

            <button type="submit" className="btn-submit">
              Sign In
            </button>
          </form>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <div className="social-login">
            <button className="btn-social btn-google" type="button">
              <i className="fab fa-google"></i>
              Continue with Google
            </button>
            <button className="btn-social btn-facebook" type="button">
              <i className="fab fa-facebook-f"></i>
              Continue with Facebook
            </button>
          </div>

          <div className="auth-footer">
            <p>
              Don't have an account? <Link to="/register">Sign up here</Link>
            </p>
          </div>

          <div className="demo-credentials">
            <h4>Demo Credentials:</h4>
            <p>
              <strong>Email:</strong> student@example.com
            </p>
            <p>
              <strong>Password:</strong> password
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
