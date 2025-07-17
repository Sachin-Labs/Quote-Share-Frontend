import React from "react";
import '../styles/contributions.css'

const Contributions = () => {
 return (
    <div className="contributors-container">
      <div className="contributors-header">
        <div className="contributors-title">Dear Scammer: Thanks for the ₹500 — I Built an App with It.</div>
      </div>

      <div className="contributors-section">
        <div className="section-heading">The Story You Didn't Expect</div>
        <div className="section-paragraph">
          One fine day, someone on the whatsapp messaged and offered me ₹200 for doing “simple tasks.”  
          A few tasks later, boom — ₹500 in my account.
        </div>
        <div className="section-paragraph">
          Then came the twist: <span className="section-quote">“Now deposit ₹50,000 to unlock bigger tasks and higher earnings!”</span>
        </div>
        <div className="section-paragraph">
          I smiled, withdrew the ₹500, and ghosted them faster than their ethics.
        </div>
        <div className="section-paragraph">
          And with that ₹500? I paid the Chrome Developer fee and launched this extension.
        </div>
      </div>

      <div className="contributors-section">
        <div className="section-heading">What This App Really Is</div>
        <div className="section-paragraph">
          This isn’t just a quote extension — it’s a clapback at scammers. A tiny rebellion with a positive purpose.
        </div>
        <div className="section-paragraph">
          Open a new tab, get a fresh quote, maybe a smirk, maybe a lesson.
        </div>
      </div>

      <div className="contributors-section">
        <div className="section-heading">Want Your Quote Featured?</div>
        <div className="section-paragraph">
          Got a quote that could make someone’s day — or roast a scammer with elegance?
        </div>
        <div className="section-list">
          <div className="list-item">• Submit your quote</div>
          <div className="list-item">• Add your name and social media link</div>
        </div>
        <div className="section-paragraph">
          Build your personal brand while spreading wisdom.
        </div>
        {/* <a href="https://www.quoteshare.work.gd/auth" className="contributors-button">Submit Your Quote</a> */}
      </div>

      <div className="contributors-section">
        <div className="section-heading">Help Me Upgrade This Revenge Project</div>
        <div className="section-paragraph">
          This scammer-funded revolution is running on free-tier everything.
        </div>
        <div className="section-list">
          <div className="list-item">• Free domain (yup, one of those .xyz types)</div>
          <div className="list-item">• Free hosting with random outages</div>
          <div className="list-item">• Email system powered by caffeine and hope</div>
        </div>
        <div className="section-paragraph">
          Want to help this go premium? Even ₹10 is a flex.
        </div>
        <p><b>UPI ID: </b>sachin.srinivasan@ybl</p>
        <img src='/qr.jpg' alt='qr-code' className="scanner"/>
        {/* <a href="/support" className="contributors-button">Contribute / Support</a> */}
      </div>

      <div className="contributors-section">
        <div className="section-heading">Thanks (But Not You, Scammer)</div>
        <div className="section-paragraph">
          If you believe in this — thank you.  
          If you're the scammer... congrats, your ₹500 now funds a scam-awareness tool.
        </div>
      </div>
      <div className="right-grid">

        <div className="contributors-header">
        <div className="contributors-title">Contribution List</div>
      </div>
        <div className="contributors-section">
        {/* <div className="section-heading">Help Me Upgrade This Revenge Project</div> */}
        <div className="contributors-note">
          It takes 48-72 hours for your name to appear here after contributing.
        </div>
        <div className="section-paragraph">
          List of Contributors :-
        </div>
        <div className="section-list">
          <div className="list-item">• An Anonymous Scammer - Rs.500/-</div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Contributions;
