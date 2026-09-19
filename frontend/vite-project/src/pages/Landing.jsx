import { Link } from 'react-router-dom';
import Navbar from "../components/Navbar";
import "./Landing.css";

function Landing() {
  return (
    <>
      <Navbar />

      {/* ---- hero section */}
      <section className="hero">
        <div className="hero-content">
          <p className="hero-label">YOUR WORK, SIMPLIFIED</p>

          <h1 className="hero-title">
            Organize your work.
            <br />
            Simplify your day.
          </h1>

          <p className="hero-description">
            Manage your tasks and files effortlessly in one simple place.
          </p>

          <Link className="hero-button" to="/register">
            Get Started
          </Link>
        </div>

        <div className="hero-visual">
          <div className="dashboard-preview">
            <div className="dashboard-header">
              <span className="dashboard-logo">MiniTask</span>
              <span className="dashboard-menu">•••</span>
            </div>

            <div className="dashboard-welcome">
              <h3>Good morning 👋</h3>
              <p>Here's your progress</p>
            </div>

            <div className="dashboard-stats">
              <div className="stat-card">
                <strong>12</strong>
                <span>Tasks</span>
              </div>

              <div className="stat-card">
                <strong>8</strong>
                <span>Completed</span>
              </div>
            </div>

            <div className="dashboard-section">
              <h4>Today's tasks</h4>

              <div className="task-preview completed">
                <span>✓</span>
                <p>Finish project</p>
              </div>

              <div className="task-preview completed">
                <span>✓</span>
                <p>Review documents</p>
              </div>

              <div className="task-preview">
                <span>○</span>
                <p>Upload files</p>
              </div>
            </div>

            <div className="dashboard-section recent-files">
              <h4>Recent files</h4>

              <div className="file-preview">
                <span>📄</span>
                <p>Project-report.pdf</p>
              </div>

              <div className="file-preview">
                <span>📄</span>
                <p>Requirements.docx</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -----Features section  */}
      <section className="features">
        <div className="features-header">
          <p className="features-label">EVERYTHING IN ONE PLACE</p>

          <h2 className="features-title">
            Manage your work without the clutter.
          </h2>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">✓</div>
            <h3 className="feature-title">Tasks</h3>
            <p className="feature-description">
              Create, track and complete your tasks.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📁</div>
            <h3 className="feature-title">Files</h3>
            <p className="feature-description">
              Upload and manage your files.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3 className="feature-title">Secure</h3>
            <p className="feature-description">
              Your account and data stay protected.
            </p>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <div className="how-it-works-header">
          <p className="how-it-works-label">HOW MINITASK WORKS</p>

          <h2 className="how-it-works-title">
            Get organized in just a few simple steps.
          </h2>
        </div>

        <div className="steps-grid">
          <div className="step-card">
            <span className="step-number">01</span>

            <h3 className="step-title">Create your account</h3>

            <p className="step-description">
              Sign up and keep everything in one place.
            </p>
          </div>

          <div className="step-card">
            <span className="step-number">02</span>

            <h3 className="step-title">Organize your work</h3>

            <p className="step-description">
              Create tasks and upload the files you need.
            </p>
          </div>

          <div className="step-card">
            <span className="step-number">03</span>

            <h3 className="step-title">Get things done</h3>

            <p className="step-description">
              Track your progress and stay on top of your work.
            </p>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="final-cta-content">
          <h2 className="final-cta-title">
            Ready to get organized?
          </h2>

          <p className="final-cta-description">
            Start managing your tasks and files in one simple place.
          </p>

          <Link className="final-cta-button" to="/register">
            Get Started
          </Link>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h3 className="footer-logo">MiniTask</h3>
            <p className="footer-tagline">
              Simplify your daily workflow with tasks and file management.
            </p>
          </div>

          <div className="footer-copyright">
            <p>© {new Date().getFullYear()} MiniTask. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Landing;