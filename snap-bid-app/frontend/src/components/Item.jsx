import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Item(props) {
  const item = props.item; // ✅ Define item from props

  const [showModal, setShowModal] = useState(false);
  const [showBidMenu, setShowBidMenu] = useState(false);
  const [newBid, setNewBid] = useState(0); // ✅ Initialize safely
  const navigate = useNavigate();

  // ✅ Set newBid once item is ready
 useEffect(() => {
    if (item) {
      const bid = item?.bidHistory?.[0]?.amount
        ? item.bidHistory[0].amount + 1
        : item.minBid || 0;
      setNewBid(bid);
    }
  }, [item]);

  // ✅ Optional guard for safety
  if (!item || typeof item.minBid !== 'number') {
    return <div>Loading item...</div>;
  }

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
    const nextBid = item?.bidHistory?.[0]?.amount + 1 || item.minBid || 0;
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
        {item.bidHistory[0] ? (
          <p><strong>Current Bid:</strong> ${item.bidHistory[0].amount.toLocaleString('en-US')}</p>
        ) : (
          <p><strong>Minimum Bid:</strong> ${item.minBid.toLocaleString('en-US')}</p>
        )}
      </div>
      <div className="card-actions">
        {!props.auth ? (
          <NavLink to="/login" className="bid-button">
            <h3>Login to Bid</h3>
          </NavLink>
        ) : (
          <button onClick={handleShowBidMenu} className="view-all-button">
            <h3>Make a Bid</h3>
          </button>
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

      {showBidMenu && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={handleCloseBidMenu}>&times;</span>
            <h2>Make a Bid</h2>
            <form onSubmit={handleSendBid}>
              <label className="label" htmlFor="amount">Amount:</label>
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