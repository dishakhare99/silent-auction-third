import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

function Item(props) {
  const item = props.item;

  if (!item || typeof item.minBid !== 'number') {
    return null;
  }

  const [showModal, setShowModal] = useState(false);
  const [showBidMenu, setShowBidMenu] = useState(false);
  const [newBid, setNewBid] = useState(0);

  const now = new Date();
  const deadline = new Date(props.deadline); // ✅ deadline passed from Home
  const auctionEnded = now > deadline;

  const topBid = item.bidHistory?.[0];

  useEffect(() => {
    if (item) {
      const bid = topBid?.amount ? topBid.amount + 1 : item.minBid || 0;
      setNewBid(bid);
    }
  }, [item]);

  const handleShowBidMenu = () => setShowBidMenu(true);
  const handleCloseBidMenu = () => setShowBidMenu(false);
  const handleViewAllClick = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleDelete = () => {
    props.onDelete(item._id, item.title);
  };

  const handleSendBid = (e) => {
    e.preventDefault();
    props.onBid(item._id, newBid);
    handleCloseBidMenu();
    const nextBid = topBid?.amount + 1 || item.minBid || 0;
    setNewBid(nextBid);
  };

  return (
    <div className="card">
      <div className="card-image">
        <img src={item.image} alt={item.title} />
      </div>

      <div className="card-content">
        <h2>{item.title}</h2>
        <p><strong>Description:</strong> {item.description}</p>

        {topBid ? (
          <p><strong>Current Bid:</strong> ${topBid.amount.toLocaleString('en-US')}</p>
        ) : (
          <p><strong>Minimum Bid:</strong> ${item.minBid.toLocaleString('en-US')}</p>
        )}

        {/* ✅ Winner banner if auction has ended */}
        {auctionEnded && topBid && (
          <div style={{
            marginTop: '10px',
            padding: '10px',
            borderRadius: '6px',
            backgroundColor: '#f0f8ff',
            border: '1px solid #007bff'
          }}>
            🏆 <strong>{topBid.bidder}</strong> won this item with a bid of <strong>${topBid.amount.toLocaleString()}</strong>
          </div>
        )}
      </div>

      <div className="card-actions">
        {!props.auth ? (
          <NavLink to="/login" className="bid-button">
            <h3>Login to Bid</h3>
          </NavLink>
        ) : (
          !auctionEnded && (
            <button onClick={handleShowBidMenu} className="view-all-button">
              <h3>Make a Bid</h3>
            </button>
          )
        )}

        <button onClick={handleViewAllClick} className="view-all-button">
          <h3>View Bids</h3>
        </button>

        {props.admin && (
          <button onClick={handleDelete} className="delete-button">
            <img src="./delete.png" alt="Delete" />
          </button>
        )}
      </div>

      {/* Bid history modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={handleCloseModal}>&times;</span>
            <h2>Bid History</h2>
            {item.bidHistory.length > 0 ? (
              <ul>
                {item.bidHistory.slice(0, 5).map((bid, index) => (
                  <li key={index}>
                    <strong>{bid.bidder}</strong>: ${bid.amount}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No bids yet.</p>
            )}
          </div>
        </div>
      )}

      {/* Bid input modal */}
      {showBidMenu && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={handleCloseBidMenu}>&times;</span>
            <h2>Make a Bid</h2>
            <form onSubmit={handleSendBid}>
              <label htmlFor="amount">Amount:</label>
              <input
                id="amount"
                type="number"
                value={newBid}
                onChange={(e) => setNewBid(Number(e.target.value))}
                className="input"
                placeholder="Enter Bid amount"
              />
              <button type="submit" className="submit-button">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Item;
