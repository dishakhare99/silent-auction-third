import { NavLink } from "react-router-dom";

function AboutAuction(props) {
  const { total, target, deadline, auth, admin, onResetAuction } = props;

  const now = new Date();
  const deadlineDate = new Date(deadline);
  const deadlineDay = deadlineDate.toDateString();
  const today = now.toDateString();

  const isSameDay = deadlineDay === today;
  const auctionEnded = now > deadlineDate && !isSameDay;
  const nextAuctionStart = new Date(deadlineDate.getTime() + 24 * 60 * 60 * 1000); // 24 hours later
  const progressPercent = Math.min((total / target) * 100, 100);

  const timeRemaining = () => {
    if (auctionEnded) return "Auction Ended";

    const difference = deadlineDate - now;
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
          bidding on luxury getaways, art, and exclusive experiences — all for a
          meaningful cause.
        </p>

        {auctionEnded ? (
          <>
            <p style={{ marginTop: "1rem", fontWeight: "bold", color: "#b30000" }}>
              ⏳ New auction will start on: <strong>{nextAuctionStart.toLocaleString("en-US")}</strong>
            </p>

            {admin && (
              <button
                onClick={onResetAuction}
                className="reset-auction-button"
                style={{
                  marginTop: "1rem",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  padding: "10px 16px",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                🔄 Reset Auction Now
              </button>
            )}
          </>
        ) : (
          <div className="progress-bar-container">
            <div className="progress-bar">
              <div
                className="progress"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <p>
              Progress: ${total.toLocaleString("en-US")} / ${target.toLocaleString("en-US")}
            </p>

            {!auth && (
              <NavLink className="join-auction-button" to="/login">
                Login to Join Auction
              </NavLink>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AboutAuction;
