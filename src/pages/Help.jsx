export default function Help() {
  return (
    <main>
      <section className="about-hero">
        <div className="hero-content">
          <h1>Help Center</h1>
          <p>Find answers to frequently asked questions and get support</p>
        </div>
      </section>

      <section className="help-content">
        <div className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>How do I enroll in a program?</h3>
              <p>
                Click on any program from our Programs page and select "Enroll
                Now" to begin the enrollment process.
              </p>
            </div>
            <div className="faq-item">
              <h3>What payment methods do you accept?</h3>
              <p>We accept all major credit cards, debit cards, and bank transfers.</p>
            </div>
            <div className="faq-item">
              <h3>Can I change my batch timing?</h3>
              <p>Yes, you can request a batch change by contacting our support team.</p>
            </div>
            <div className="faq-item">
              <h3>Do you provide study materials?</h3>
              <p>
                Yes, all enrolled students receive comprehensive study materials
                and practice tests.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
