// src/pages/Auth/SignupPage.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './AuthPage.css';

const SignupPage = () => {
  const navigate = useNavigate();
  const { signup, loginWithGoogle } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = {
      name: formData.get('full_name'),
      email: formData.get('email'),
      password: formData.get('password'),
    };

    setError('');
    setLoading(true);
    try {
      await signup(userData);
      navigate('/profile');
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Try logging in.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password must be at least 6 characters.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setGoogleLoading(true);
    try {
      await loginWithGoogle();
      navigate('/profile');
    } catch (err) {
      if (err.code !== 'auth/popup-closed-by-user') {
        setError('Google sign-in failed. Please try again.');
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Left Side: Editorial Content */}
        <div className="auth-editorial">
          <img 
            className="auth-editorial-img" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZu620qbsAJSb-NQgE2SA983BJ3iowlfUZcloYVK669qa3GUMuMH_CJYVcSAKCo2cz3ZxBiOsEQpyCarm7txRklzqp5mKsSuOLjhIbZvOjeehsAwu_mxx1jSGfrWKq6AyoOe5G6qJR6gifL7Wg-rrU7mHotkPwhxlYnDhUygI-6bUagfHfiGJndU1CQxnoOIQzM9JClwbyc8OPvX5haf_M53CeT85_IXP3P0WSNO6J0Ahaz4rdqyET3jPYQh674wxUpXsonyXIRPE" 
            alt="Atelier Lifestyle"
          />
          <div className="auth-editorial-overlay">
            <p className="auth-editorial-title">Curating your digital sanctuary.</p>
            <p className="auth-editorial-subtitle">Join our community of intentional creators and connoisseurs of the refined.</p>
          </div>
        </div>

        {/* Right Side: Signup Form */}
        <div className="auth-form-section">
          <header className="auth-header">
            <h1 className="auth-title">Begin.</h1>
            <p className="auth-subtitle">Enter your details to create your bespoke account.</p>
          </header>

          <form className="auth-form" onSubmit={handleSignup}>
            <div className="form-group">
              <label className="form-label" htmlFor="full_name">Full Name</label>
              <input 
                className="form-input" 
                id="full_name" 
                name="full_name" 
                placeholder="Julien Thorne" 
                type="text" 
                required 
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">Email Address</label>
              <input 
                className="form-input" 
                id="email" 
                name="email" 
                placeholder="curator@atelier.com" 
                type="email" 
                required 
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <input 
                className="form-input" 
                id="password" 
                name="password" 
                placeholder="••••••••••••" 
                type="password" 
                required 
              />
            </div>

            <div className="auth-checkbox-group">
              <input className="auth-checkbox" id="terms" type="checkbox" required />
              <label className="auth-checkbox-label" htmlFor="terms">
                I agree to the <Link to="#">Terms & Conditions</Link> and acknowledge the privacy policy.
              </label>
            </div>

            {error && <p className="auth-error">{error}</p>}

            <button className="btn btn-primary btn-full btn-lg" type="submit" disabled={loading}>
              {loading ? 'Creating account…' : 'Create Account'}
            </button>

            <div className="auth-divider">
              <div className="auth-divider-line"></div>
              <span className="auth-divider-text">Or continue with</span>
              <div className="auth-divider-line"></div>
            </div>

            <button
              className="auth-social-btn"
              type="button"
              onClick={handleGoogleLogin}
              disabled={googleLoading}
            >
              <img
                src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png"
                alt="Google"
                style={{ width: '18px', height: '18px' }}
              />
              {googleLoading ? 'Redirecting…' : 'Continue with Google'}
            </button>
          </form>

          <footer className="auth-footer">
            <p>
              Already have an account? 
              <Link to="/login" className="auth-footer-link">Login.</Link>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
