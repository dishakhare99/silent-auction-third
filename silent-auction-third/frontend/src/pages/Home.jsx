import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import Header from '../components/Header.jsx';
import Item from '../components/Item.jsx';
import AboutAuction from '../components/AboutAuction.jsx';
import Footer from '../components/Footer.jsx';

function Home(props) {
    const [items, setItems] = useState(null);
    const [total, setTotal] = useState(0);
    const [deadline, setDeadline] = useState(new Date());
    const [target, setTarget] = useState(0);

    const fetchItems = async () => {
        await fetch('https://silent-auction-api.vercel.app/items', {
            method: 'GET',
            credentials: 'include'
            })
            .then(response => response.json())
            .then(data => {
                setItems(data);
                const auctionData = data.find(obj => obj.title === 'auctiondata');
                const objective = auctionData.minBid
                const deadline = new Date(auctionData.description);
                setTarget(objective);
                setDeadline(deadline);
            })
            .catch(error => alert(error)
        );
    };

    const getTotal = async () => {
        if (items) {
            let summation = 0;
            items.forEach(item => {
                if (item.bidHistory[0]) {
                    summation += item.bidHistory[0].amount;
                }
            });
            setTotal(summation);
        }
    };
    
    useEffect(() => {
        fetchItems();
    }, []);

    useEffect(() => {
        getTotal();
    }, [items]);

    const handleSendBid = async (_id, bidAmount) => {
        await props.onBid(_id, bidAmount);
        fetchItems();
    };

    const handleDelete = async (itemId, itemTitle) => {
        const response = await fetch('https://silent-auction-api.vercel.app/items/' + itemId, {
            method: "DELETE",
            credentials: 'include'
        })
        const responseJson = await response.json();
        if (!response.ok) {
            return alert(responseJson.error);
        }
        alert(`"${itemTitle}" is deleted from auction`);
        fetchItems();
    }

    return (
        <>
            <Header fetchItems={fetchItems} setItems={setItems} auth={props.auth} admin={props.admin} runCheck={props.runCheck} total={total} items={items}/>
            <main>
                {/* Added id for smooth scroll */}
        <section id="about-section">
          <AboutAuction
            deadline={deadline}
            target={target}
            admin={props.admin}
            auth={props.auth}
            total={total}
          />
        </section>
                {/* <AboutAuction deadline={deadline} target={target} admin={props.admin} auth={props.auth} total={total}/> */}
                <div className='items-container'>
                    {items && items.map(item => {
                        if (item.title != 'auctiondata'){
                            return <Item key={item._id} item={item} onDelete={handleDelete} onBid={handleSendBid} auth={props.auth} admin={props.admin}/>
                        }
                    })}
                </div>
            </main>
            <Footer />
        </>
    );
}

export default Home;
