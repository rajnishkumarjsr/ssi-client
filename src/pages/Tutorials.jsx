export default function Tutorials() {
  return (
    <main>
      <section className="about-hero">
        <div className="hero-content">
          <h1>Video Tutorials</h1>
          <p>Learn with our comprehensive video library</p>
        </div>
      </section>

      <section className="tutorials-content">
        <div className="tutorials-grid">
          <div className="tutorial-card">
            <div className="video-placeholder">
              <i className="fas fa-play-circle"></i>
            </div>
            <h3>GMAT Math Basics</h3>
            <p>Foundation concepts for GMAT quantitative section</p>
            <span className="duration">45 minutes</span>
          </div>
          <div className="tutorial-card">
            <div className="video-placeholder">
              <i className="fas fa-play-circle"></i>
            </div>
            <h3>GRE Verbal Strategies</h3>
            <p>Effective approaches for GRE verbal reasoning</p>
            <span className="duration">60 minutes</span>
          </div>
          <div className="tutorial-card">
            <div className="video-placeholder">
              <i className="fas fa-play-circle"></i>
            </div>
            <h3>IELTS Speaking Tips</h3>
            <p>Master the IELTS speaking section</p>
            <span className="duration">30 minutes</span>
          </div>
        </div>
      </section>
    </main>
  );
}
