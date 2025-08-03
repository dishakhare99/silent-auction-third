import { NavLink } from "react-router-dom";

function AboutAuction(props) {
  const { total, target, deadline, auth, admin, onResetAuction } = props;

  const now = new Date();
  const today = now.toDateString();
  const deadlineDay = new Date(deadline).toDateString();

  const auctionEnded = now > deadline;
  const isSameDay = today === deadlineDay;
  const nextAuctionStart = new Date(deadline.getTime() + 24 * 60 * 60 * 1000); // Next day

  const currentProgress = total;
  const progressPercent = Math.min((total / target) * 100, 100);

  const timeRemaining = () => {
    if (auctionEnded && !isSameDay) return "Auction Ended";

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    const difference = endOfDay - now;

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference / (1000 * 60)) % 60);

    return `${hours} hours, ${minutes} minutes`;
  };

  return (
    <div>
      <div className="about-section">
        <h2 className="remaining-time">
          Time Remaining: {auctionEnded && !isSameDay ? "Auction Ended" : timeRemaining()}
        </h2>

        <p>
          Embark on a journey of generosity at our virtual Summer Charity Gala
          SnapBid, hosted on the cutting-edge SnapBid platform. Delight in
          bidding on luxury getaways, art, and exclusive experiences — all for a
          meaningful cause.
        </p>

        {auctionEnded && !isSameDay ? (
          <>
            <p style={{ marginTop: "1rem", fontWeight: "bold", color: "#b30000" }}>
              ⏳ New auction will start on:{" "}
              <strong>{nextAuctionStart.toLocaleString("en-US")}</strong>
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
              Progress: ${currentProgress.toLocaleString("en-US")} / $
              {target.toLocaleString("en-US")}
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
