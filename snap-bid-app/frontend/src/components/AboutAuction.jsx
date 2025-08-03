import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

function AboutAuction(props) {
  const { total, target, deadline, auth } = props;

  const [currentDeadline, setCurrentDeadline] = useState(new Date(deadline));
  const now = new Date();

  // Automatically reset deadline to next day if expired
  useEffect(() => {
    if (now > new Date(deadline)) {
      const newDeadline = new Date(deadline);
      newDeadline.setDate(newDeadline.getDate() + 1); // Add 1 day
      setCurrentDeadline(newDeadline);
    } else {
      setCurrentDeadline(new Date(deadline));
    }
  }, [deadline]);

  const progressPercent = Math.min((total / target) * 100, 100);

  const timeRemaining = () => {
    const difference = currentDeadline - now;

    if (difference <= 0) return "Auction Ended";

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference / (1000 * 60)) % 60);

    return `${hours} hours, ${minutes} minutes`;
  };

  return (
    <div>
      <div className="about-section">
        <h2 className="remaining-time">Time Remaining: {timeRemaining()}</h2>

        <p>
          Embark on a journey of generosity at our virtual Summer Charity Gala
          SnapBid, hosted on the cutting-edge SnapBid platform. Delight in
          bidding on luxury getaways, captivating art, and exclusive experiences
          — all for a meaningful cause.
        </p>

        <div className="progress-bar-container">
          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <p>
            Progress: ${total.toLocaleString("en-US")} / $
            {target.toLocaleString("en-US")}
          </p>

          {!auth && (
            <NavLink className="join-auction-button" to="/login">
              Login to Join Auction
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
}

export default AboutAuction;
