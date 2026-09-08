export default function Resources() {
  return (
    <main>
      <section className="about-hero">
        <div className="hero-content">
          <h1>Student Resources</h1>
          <p>Access study materials, practice tests, and learning tools</p>
        </div>
      </section>

      <section className="resources-content">
        <div className="resources-grid">
          <div className="resource-card">
            <i className="fas fa-book"></i>
            <h3>Study Materials</h3>
            <p>Comprehensive study guides and reference materials</p>
            <a href="#" className="btn-outline">
              Access Materials
            </a>
          </div>
          <div className="resource-card">
            <i className="fas fa-clipboard-check"></i>
            <h3>Practice Tests</h3>
            <p>Mock tests and practice questions for all programs</p>
            <a href="#" className="btn-outline">
              Take Practice Test
            </a>
          </div>
          <div className="resource-card">
            <i className="fas fa-video"></i>
            <h3>Video Lectures</h3>
            <p>Recorded lectures and tutorial videos</p>
            <a href="#" className="btn-outline">
              Watch Videos
            </a>
          </div>
          <div className="resource-card">
            <i className="fas fa-download"></i>
            <h3>Downloads</h3>
            <p>Downloadable PDFs and study materials</p>
            <a href="#" className="btn-outline">
              Download Files
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
