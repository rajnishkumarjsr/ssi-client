import { Link } from 'react-router-dom';

export default function Paths() {
  return (
    <main>
      <section className="about-hero">
        <div className="hero-content">
          <h1>Learning Paths</h1>
          <p>Structured learning journeys for your success</p>
        </div>
      </section>

      <section className="paths-content">
        <div className="paths-grid">
          <div className="path-card">
            <h3>Graduate School Path</h3>
            <div className="path-steps">
              <div className="step">1. GMAT/GRE Preparation</div>
              <div className="step">2. Application Essays</div>
              <div className="step">3. Interview Preparation</div>
            </div>
            <Link to="/programs" className="btn-outline">
              Start Path
            </Link>
          </div>
          <div className="path-card">
            <h3>Undergraduate Path</h3>
            <div className="path-steps">
              <div className="step">1. SAT Preparation</div>
              <div className="step">2. College Applications</div>
              <div className="step">3. Scholarship Guidance</div>
            </div>
            <Link to="/programs" className="btn-outline">
              Start Path
            </Link>
          </div>
          <div className="path-card">
            <h3>International Study Path</h3>
            <div className="path-steps">
              <div className="step">1. IELTS/TOEFL Preparation</div>
              <div className="step">2. University Applications</div>
              <div className="step">3. Visa Guidance</div>
            </div>
            <Link to="/programs" className="btn-outline">
              Start Path
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
