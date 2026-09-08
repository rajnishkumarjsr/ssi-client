export default function About() {
  return (
    <main>
      <section className="about-hero">
        <div className="hero-content">
          <h1>About SSI Educational Services</h1>
          <p>Transforming education through innovative online learning experiences</p>
        </div>
      </section>

      <section className="about-content">
        <div className="content-grid">
          <div className="content-text">
            <h2>Our Mission</h2>
            <p>
              SSI Educational Services is an exclusive Career Counseling and Test Preparation Center. This center is an outcome of decades long ethical practice and desire to help abroad study aspirants to reach right destination with ample scholarships. 
              <br />
              <br />
              <b>The Founder</b> <br />
              The founder, <b>Sunil Kumar Prasad</b>, has spent about three decades training aspirants of the GMAT, GRE, SAT, and IELTS with enviable success. While working for various reputed companies, he wished to start a center that would guide candidates right methods to crack tests and inform them the most convenient ways to find dream destinations at lowest possible cost. Hence, the birth of SSI Educational Services.
              <br />
              <br />
              <b>Why Online?</b>
              <br />
              Since the present world is out and out digital, we have come up with the plan to train and counsel online to help a candidate in any geographic location. However, we have a physical setup in Kolkata, India. 

            </p>

            {/* <h2>What We Offer</h2>
            <ul className="feature-list">
              <li>
                <i className="fas fa-check"></i> Over 500+ courses across multiple
                disciplines
              </li>
              <li>
                <i className="fas fa-check"></i> Expert instructors from leading
                institutions
              </li>
              <li>
                <i className="fas fa-check"></i> Interactive learning experiences
              </li>
              <li>
                <i className="fas fa-check"></i> Industry-recognized certificates
              </li>
              <li>
                <i className="fas fa-check"></i> Flexible learning schedules
              </li>
              <li>
                <i className="fas fa-check"></i> Community-driven learning environment
              </li>
            </ul> */}
          </div>

          {/* <div className="stats-card">
            <h3>Our Impact</h3>
            <div className="impact-stats">
              <div className="impact-stat">
                <h4>50,000+</h4>
                <p>Active Students</p>
              </div>
              <div className="impact-stat">
                <h4>500+</h4>
                <p>Courses Available</p>
              </div>
              <div className="impact-stat">
                <h4>100+</h4>
                <p>Expert Instructors</p>
              </div>
              <div className="impact-stat">
                <h4>95%</h4>
                <p>Completion Rate</p>
              </div>
            </div>
          </div> */}
        </div>
      </section>

      <section className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team-grid">
          <div className="team-member">
            <div className="member-avatar">
              <i className="fas fa-user"></i>
            </div>
            <h3>Dr. Sarah Johnson</h3>
            <p className="role">Chief Executive Officer</p>
            <p>
              Former education director with 15+ years of experience in online
              learning platforms.
            </p>
          </div>

          <div className="team-member">
            <div className="member-avatar">
              <i className="fas fa-user"></i>
            </div>
            <h3>Michael Chen</h3>
            <p className="role">Head of Technology</p>
            <p>
              Tech innovator passionate about creating seamless learning
              experiences through technology.
            </p>
          </div>

          <div className="team-member">
            <div className="member-avatar">
              <i className="fas fa-user"></i>
            </div>
            <h3>Emma Wilson</h3>
            <p className="role">Director of Content</p>
            <p>
              Curriculum expert ensuring our courses meet the highest educational
              standards.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
