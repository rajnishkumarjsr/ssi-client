import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

const initialForm = {
  name: '',
  email: '',
  mobile: '',
  username: '',
  password: '',
  confirm_password: ''
  // learning_goal: '',
  // terms: false,
  // newsletter: false
};

const API_DOMAIN = import.meta.env.VITE_API_DOMAIN;
const registerURL = `${API_DOMAIN}/register`;
// const apiKey = '08FLFuexFsWfnFj6uTVjaCZsq4GHfgN7zTA2BG36';

export default function Register() {
  const [formData, setFormData] = useState(initialForm);
  const [feedback, setFeedback] = useState({ type: '', text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.mobile ||
      !formData.username ||
      !formData.password ||
      !formData.confirm_password
    ) {
      setFeedback({ type: 'error', text: 'Please fill in all fields' });
      return;
    }

    if (formData.password !== formData.confirm_password) {
      setFeedback({ type: 'error', text: 'Passwords do not match' });
      return;
    }

    if (formData.password.length < 6) {
      setFeedback({ type: 'error', text: 'Password must be at least 6 characters' });
      return;
    }

    // if (!formData.terms) {
    //   setFeedback({ type: 'error', text: 'Please accept the terms and conditions' });
    //   return;
    // }

    try {
      setIsSubmitting(true);
      
      // const requistConfi = {
      //   headers: {
      //     'x-api-key': apiKey
      //   }
      // }

      const requestBody = {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        username: formData.username,
        password: formData.password
      }

      //const response = await fetch(registerURL,{method: 'POST', headers: requistConfi, body: requestBody});

      // const response = await fetch(registerURL, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json',
      //     'x-api-key': apiKey
      //    },
      //   body: JSON.stringify({
      //     name: formData.name,
      //     email: formData.email,
      //     mobile: formData.mobile,
      //     username: formData.username,
      //     password: formData.password
      //   })
      // });

      const response = await axios.post(
        registerURL,
        JSON.stringify(requestBody),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.data.success) {
        const payload = await response.data.catch(() => ({}));
        throw new Error(payload.message || 'Failed to create account');
      }

      setFeedback({
        type: 'success',
        text: 'Account created successfully! You can now sign in.'
      });
      setFormData(initialForm);
    } catch (error) {
      if(error.status === 401) {
        setFeedback({
          type: 'error',
          text: 'username already exists'
        });
      }else{
        setFeedback({
          type: 'error',
          text: error?.message || 'Failed to create account'
        });
      }
      
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Join SSI Educational Services</h1>
            <p>Start your learning journey today</p>
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
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="mobile">Mobile Number</label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                required
                placeholder="Enter your mobile number"
                value={formData.mobile}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">User Name</label>
              <input
                type="text"
                id="username"
                name="username"
                required
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                placeholder="Create a password"
                minLength="6"
                value={formData.password}
                onChange={handleChange}
              />
              <small>Password must be at least 6 characters</small>
            </div>

            <div className="form-group">
              <label htmlFor="confirm_password">Confirm Password</label>
              <input
                type="password"
                id="confirm_password"
                name="confirm_password"
                required
                placeholder="Confirm your password"
                value={formData.confirm_password}
                onChange={handleChange}
              />
            </div>

            {/* <div className="form-group">
              <label htmlFor="learning_goal">Learning Goal (Optional)</label>
              <select
                id="learning_goal"
                name="learning_goal"
                value={formData.learning_goal}
                onChange={handleChange}
              >
                <option value="">Select your primary goal</option>
                <option value="career_change">Career Change</option>
                <option value="skill_upgrade">Skill Upgrade</option>
                <option value="personal_interest">Personal Interest</option>
                <option value="academic">Academic Requirements</option>
                <option value="business">Business Development</option>
              </select>
            </div> */}

            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" name="terms" required checked={formData.terms} onChange={handleChange} />
                <span className="checkmark"></span>
                I agree to the <a href="#">Terms of Service</a> and{' '}
                <a href="#">Privacy Policy</a>
              </label>
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="newsletter"
                  checked={formData.newsletter}
                  onChange={handleChange}
                />
                <span className="checkmark"></span>
                Send me course recommendations and updates
              </label>
            </div>

            <button type="submit" className="btn-submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Account'}
            </button>
          </form>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <div className="social-login">
            <button className="btn-social btn-google" type="button">
              <i className="fab fa-google"></i>
              Sign up with Google
            </button>
            <button className="btn-social btn-facebook" type="button">
              <i className="fab fa-facebook-f"></i>
              Sign up with Facebook
            </button>
          </div>

          <div className="auth-footer">
            <p>
              Already have an account? <Link to="/login">Sign in here</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
