
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

function Item(props) {
    const [showModal, setShowModal] = useState(false);
    const [showBidMenu, setShowBidMenu] = useState(false);
    // const [newBid, setNewBid] = useState(props.item.bidHistory[0] ? (props.item.bidHistory[0].amount + 1) : props.item.minBid);
    const [newBid, setNewBid] = useState(() => {
        if (props.item && props.item.bidHistory && props.item.bidHistory[0]) {
            return props.item.bidHistory[0].amount + 1;
        } else if (props.item) {
            return props.item.minBid;
        } else {
            return 0;
        }
    });
    const navigate = useNavigate();


    const handleShowBidMenu = () => {
        setShowBidMenu(true);
    }

    const handleCloseBidMenu = () => {
        setShowBidMenu(false);
    }

    const handleViewAllClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleDelete = () => {
        props.onDelete(props.item._id, props.item.title);
    }

    const handleSendBid = (e) => {
        e.preventDefault();
        props.onBid(props.item._id, newBid);
        handleCloseBidMenu();
        setNewBid(props.item.bidHistory[0] ? (props.item.bidHistory[0].amount + 1) : props.item.minBid)
    }

    return (
        <div className="card">
            <div className="card-image">
                <img src={props.item.image} alt={props.item.title} />
            </div>
            <div className="card-content">
                <h2>{props.item.title}</h2>
                <p><strong>Description:</strong> {props.item.description}</p>
                {props.item.bidHistory[0] ? (
                    <p><strong>Current Bid:</strong> ${props.item.bidHistory[0].amount.toLocaleString('en-US')}</p>
                ) : (
                    <p><strong>Minimum Bid:</strong> ${props.item.minBid.toLocaleString('en-US')}</p>
                )}
            </div>
            <div className="card-actions">
                {!props.auth ? 
                    <NavLink to="/login" className="bid-button">
                        <h3>Login to Bid</h3>
                    </NavLink> : 
                    <button onClick={handleShowBidMenu} className="view-all-button">
                        <h3>Make a Bid</h3>
                    </button>
                }
                
                <button onClick={handleViewAllClick} className="view-all-button">
                    <h3>View Bids</h3>
                </button>
                {props.admin && <button onClick={handleDelete} className="delete-button">
                    <img src="./delete.png" alt="Delete"/>
                </button>
                }
            </div>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-button" onClick={handleCloseModal}>&times;</span>
                        <h2>Bid History</h2>
                        {props.item.bidHistory.length > 0 ? (
                            <ul>
                                {props.item.bidHistory.slice(0, 5).map((bid, index) => (
                                    <li key={index}>
                                        {/* in below line, bid.username is fixed as bid.bidder. It shows the bidder name in poop-up box now. */}
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
                                onChange={(e) => setNewBid(e.target.value)}
                                className="input"
                                placeholder="Enter Bid amount"
                            />
                            <button type='submit' className="submit-button">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}

export default Item;

