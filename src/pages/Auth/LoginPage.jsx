// src/pages/Auth/LoginPage.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './AuthPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    
    if (login(email, password)) {
      navigate('/profile');
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

        {/* Right Side: Login Form */}
        <div className="auth-form-section">
          <header className="auth-header">
            <h1 className="auth-title">Welcome Back.</h1>
            <p className="auth-subtitle">Enter your details to access your bespoke account.</p>
          </header>

          <form className="auth-form" onSubmit={handleLogin}>
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

            <div className="auth-options">
              <label className="auth-checkbox-group">
                <input className="auth-checkbox" type="checkbox" />
                <span className="auth-checkbox-label">Remember me</span>
              </label>
              <Link to="#" className="auth-forgot-password">Forgot password?</Link>
            </div>

            <button className="btn btn-primary btn-full btn-lg" type="submit">
              Sign In
            </button>

            <div className="auth-divider">
              <div className="auth-divider-line"></div>
              <span className="auth-divider-text">Or continue with</span>
              <div className="auth-divider-line"></div>
            </div>

            <button className="auth-social-btn" type="button">
              <img 
                src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" 
                alt="Google" 
                style={{ width: '18px', height: '18px' }}
              />
              Continue with Google
            </button>
          </form>

          <footer className="auth-footer">
            <p>
              Don't have an account? 
              <Link to="/signup" className="auth-footer-link">Begin.</Link>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
