import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import Header from '../components/Header.jsx';
import Item from '../components/Item.jsx';
import AboutAuction from '../components/AboutAuction.jsx';
import Footer from '../components/Footer.jsx';

function Home(props) {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [deadline, setDeadline] = useState(new Date());
  const [target, setTarget] = useState(0);

  const fetchItems = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/items`, {
        method: 'GET',
        credentials: 'include',
      });

      const data = await response.json();
      setItems(data);

      const auctionData = data.find(obj => obj.title === 'auctiondata');
      if (auctionData) {
        const objective = parseInt(auctionData.minBid);
        let auctionDeadline = new Date();

        // 🔧 Set deadline to yesterday for testing
        auctionDeadline.setDate(auctionDeadline.getDate() - 1);
        auctionDeadline.setHours(23, 59, 59, 999);

        setTarget(objective);
        setDeadline(auctionDeadline);
      } else {
        console.warn('No auctiondata item found.');
      }
    } catch (error) {
      alert('Error fetching items: ' + error.message);
    }
  };

  const getTotal = () => {
    if (!items || items.length === 0) return;

    const sum = items.reduce((acc, item) => {
      if (item.bidHistory?.[0]) {
        return acc + item.bidHistory[0].amount;
      }
      return acc;
    }, 0);

    setTotal(sum);
  };

  const handleSendBid = async (_id, bidAmount) => {
    await props.onBid(_id, bidAmount);
    fetchItems();
  };

  const handleDelete = async (itemId, itemTitle) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/items/${itemId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      const responseJson = await response.json();
      if (!response.ok) throw new Error(responseJson.error);

      alert(`"${itemTitle}" has been deleted from the auction.`);
      fetchItems();
    } catch (error) {
      alert('Deletion failed: ' + error.message);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    getTotal();
  }, [items]);

  const showWinners = new Date() > deadline;

  return (
    <>
      <Header
        fetchItems={fetchItems}
        setItems={setItems}
        auth={props.auth}
        admin={props.admin}
        runCheck={props.runCheck}
        total={total}
        items={items}
      />

      <main>
        <section id="about-section">
          <AboutAuction
            deadline={deadline}
            target={target}
            admin={props.admin}
            auth={props.auth}
            total={total}
          />
        </section>

        {showWinners && (
          <section className="winners-section">
            <h2>🏆 Today's Winning Bids</h2>
            <ul>
              {items &&
                items
                  .filter(item => item.title !== 'auctiondata')
                  .map(item => {
                    const sortedBids = item.bidHistory?.sort((a, b) => b.amount - a.amount);
                    const winner = sortedBids?.[0];
                    return (
                      <li key={item._id}>
                        <strong>{item.title}</strong> —{' '}
                        {winner
                          ? `${winner.bidder || 'Anonymous'} won with $${winner.amount}`
                          : 'No bids placed'}
                      </li>
                    );
                  })}
            </ul>
          </section>
        )}

        <div className="items-container">
          {items &&
            items.map(item => {
              if (item.title !== 'auctiondata') {
                return (
                  <Item
                    key={item._id}
                    item={item}
                    onDelete={handleDelete}
                    onBid={handleSendBid}
                    auth={props.auth}
                    admin={props.admin}
                    deadline={deadline}
                  />
                );
              }
            })}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Home;
