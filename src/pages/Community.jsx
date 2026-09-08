export default function Community() {
  return (
    <main>
      <section className="about-hero">
        <div className="hero-content">
          <h1>Student Community</h1>
          <p>Connect with fellow students and share your learning journey</p>
        </div>
      </section>

      <section className="community-content">
        <div className="community-features">
          <h2>Join Our Learning Community</h2>
          <div className="features-grid">
            <div className="feature-card">
              <i className="fas fa-users"></i>
              <h3>Discussion Forums</h3>
              <p>Engage in discussions with peers and instructors</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-comments"></i>
              <h3>Study Groups</h3>
              <p>Form study groups with students in your program</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-share-alt"></i>
              <h3>Resource Sharing</h3>
              <p>Share notes, tips, and study materials</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
