import Header from "../components/Header.jsx";
// CSS import is removed as it is being handled in app.jsx
import Footer from "../components/Footer.jsx";

function About(props) {
  return (
    <>
      <Header auth={props.auth} admin={props.admin} runCheck={props.runCheck} />
      <div className="hero">
        <img src="\hero_image_2.png" alt="Auction Event" />
      </div>
      <div className="about-container">
        <div className="about-section">
          <h2>About Us</h2>
          <p>
          Welcome to <strong>SnapBid</strong> — your go-to platform for 
          exciting online auctions that connect enthusiasts,collectors, 
          and change-makers. SnapBid is designed to offer a smooth, secure, 
          and thrilling bidding experience for both buyers and sellers. 
          Whether you're aiming to win exclusive items, donate unique treasures, 
          or simply support a great cause,SnapBid brings together a like-minded 
          community where <strong>Your Deal. Your Win.</strong> truly comes to life.</p>
          <p>
          At SnapBid, we feature a wide variety of auctions including luxury getaways, 
          fine art, limited-edition collectibles, gourmet dining experiences, and much 
          more. With our easy-to-use interface, you can explore categories effortlessly, 
          place real-time bids, and keep track of your favorite items. We prioritize transparency, 
          fairness, and trust to ensure every auction is conducted with the highest level of integrity.</p>

          <p>
          Join us on our mission to drive positive change through the power of giving
          and community participation. Every bid on SnapBid isn’t just a chance to win something special—it’s
          also a step toward supporting charitable initiatives that matter. Be part of the movement and help 
          make a difference, one bid at a time.
          </p>
        </div>
        <div className="team-section">
          <h2>Our Team</h2>
          <div className="team-members">
            <div className="team-member">
              <img src="/technical.jpg" alt="Disha Khare" className="team-photo" />
              <h3>Disha Khare</h3>
              <p>Disha is a software developer with a passion for creating seamless user experiences. She oversees the technical development of the platform.</p>
            </div>
            <div className="team-member">
              <img src="/management.jpg" alt="Aarti Pandya" className="team-photo" />
              <h3>Aarti Pandya</h3>
              <p>Aarti is our project manager, ensuring that all aspects of the auction process run smoothly. She is dedicated to supporting our mission.</p>
            </div>
            <div className="team-member">
              <img src="/frontend.png" alt="" className="team-photo" />
              <h3>Khushi Bhatt</h3>
              <p>Khushi is a front end developer with a keen eye for detail, responsible for the visual elements of the platform, ensuring an intuitive and engaging user interface.</p>
            </div>
            <div className="team-member">
              <img src="/front_end_2.png" alt="" className="team-photo" />
              <h3>Kenneth Rofuli</h3>
              <p>Kenneth  is a front end developer with a keen eye for detail, responsible for the visual elements of the platform, ensuring an intuitive and engaging user interface.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default About;
