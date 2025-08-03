import { NavLink } from "react-router-dom"; // Import NavLink for routing if needed
// CSS import is removed as it is being handled in app.jsx

function AboutAuction(props) {
  const currentProgress = props.total;
  let goal = props.target;
  const progressPercent = (currentProgress / goal) * 100;
  
  const timeRemaining = () => {
    const deadline = props.deadline;
    const now = new Date();
    const difference = deadline - now;
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    return `${hours} hours, ${minutes} minutes`;
  };

  return (
    <div>
      <div className="about-section">
        <h2 className="remaining-time">Time Remaining: {timeRemaining()}</h2>
        <p>
          Embark on a journey of generosity at our virtual Summer Charity Gala
          SnapBid, hosted on the cutting-edge SnapBid platform.
          Delight in bidding on extraordinary luxury getaways, captivating art
          pieces, and exclusive dining experiences, all to champion this
          impactful mission. Experience the thrill of real-time bidding updates
          and seamless transactions, all while supporting a cause that truly
          matters. Do not miss your chance to secure unique treasures and
          contribute to our goal—join us for an unforgettable evening of giving
          and community.
        </p>
        <div className="progress-bar-container">
          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <p>
            Progress: ${currentProgress.toLocaleString('en-US')} / ${goal.toLocaleString('en-US')}
          </p>
          {!props.auth && (
            <NavLink className="join-auction-button" to="/login">Login to Join Auction</NavLink>
          )}
        </div>
      </div>
    </div>
  );
}

export default AboutAuction;
