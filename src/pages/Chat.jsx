export default function Chat() {
  return (
    <main>
      <section className="about-hero">
        <div className="hero-content">
          <h1>Live Chat Support</h1>
          <p>Get instant help from our support team</p>
        </div>
      </section>

      <section className="chat-content">
        <div className="chat-container">
          <h2>Chat with our Support Team</h2>
          <p>Our support team is available Monday to Friday, 9:00 AM - 6:00 PM</p>
          <div className="chat-box">
            <div className="chat-message">
              <strong>Support:</strong> Hello! How can we help you today?
            </div>
          </div>
          <div className="chat-input">
            <input type="text" placeholder="Type your message..." disabled />
            <button className="btn-submit" disabled>
              Send
            </button>
          </div>
          <p>
            <em>
              Live chat feature coming soon. For immediate assistance, please
              contact us at support@ssieducational.com
            </em>
          </p>
        </div>
      </section>
    </main>
  );
}
