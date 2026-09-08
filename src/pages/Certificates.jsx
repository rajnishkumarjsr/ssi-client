export default function Certificates() {
  return (
    <main>
      <section className="about-hero">
        <div className="hero-content">
          <h1>Certificates</h1>
          <p>Earn industry-recognized certificates</p>
        </div>
      </section>

      <section className="certificates-content">
        <div className="cert-info">
          <h2>Certificate Programs</h2>
          <div className="cert-grid">
            <div className="cert-card">
              <i className="fas fa-certificate"></i>
              <h3>Program Completion Certificate</h3>
              <p>
                Awarded upon successful completion of any test preparation program
              </p>
            </div>
            <div className="cert-card">
              <i className="fas fa-medal"></i>
              <h3>Excellence Certificate</h3>
              <p>For students achieving top scores in practice tests</p>
            </div>
            <div className="cert-card">
              <i className="fas fa-trophy"></i>
              <h3>Achievement Certificate</h3>
              <p>Recognition for consistent performance and dedication</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
