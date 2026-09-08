export default function Careers() {
  return (
    <main>
      <section className="about-hero">
        <div className="hero-content">
          <h1>Join Our Team</h1>
          <p>Build your career with SSI Educational Services</p>
        </div>
      </section>

      <section className="careers-content">
        <div className="job-listings">
          <h2>Current Openings</h2>
          <div className="jobs-grid">
            <div className="job-card">
              <h3>GMAT Instructor</h3>
              <p className="job-type">Full-time</p>
              <p>
                Experienced GMAT instructor needed for our test preparation
                programs.
              </p>
              <div className="job-requirements">
                <h4>Requirements:</h4>
                <ul>
                  <li>GMAT score of 700+</li>
                  <li>2+ years teaching experience</li>
                  <li>Strong communication skills</li>
                </ul>
              </div>
              <button className="btn-submit">Apply Now</button>
            </div>

            <div className="job-card">
              <h3>Content Developer</h3>
              <p className="job-type">Part-time</p>
              <p>Create engaging study materials and practice questions.</p>
              <div className="job-requirements">
                <h4>Requirements:</h4>
                <ul>
                  <li>Subject matter expertise</li>
                  <li>Content writing experience</li>
                  <li>Educational background</li>
                </ul>
              </div>
              <button className="btn-submit">Apply Now</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
