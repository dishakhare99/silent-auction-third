import { NavLink, useNavigate } from 'react-router-dom';
import {useState} from 'react';
import '../styles.css'; 

function Header(props) {

    const navigate = useNavigate();

    const handleLogout = async ()=>{
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/user/logout`, {
                method: 'POST',
                credentials: 'include'
            });
            if (response.ok) {
                props.runCheck();
                navigate('/');
            }
        } catch (error) {
            
        }
    };

    const [search, setSearch] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        if(!search){
            props.fetchItems();
            return;
        }
        const searchResult = props.items.filter(item => item.title.toLowerCase().includes(search.toLowerCase()));
        if(searchResult.length < 1){
            setSearch('')
            props.fetchItems();
            return alert("No items found. Please search again.")
        }
        props.setItems(searchResult);
        setSearch('')
    }

    return (
        <header className="header-container">
            <NavLink to="/">
                <img className="site-logo" src="/favicon-trans.png" alt="Site Logo" />
            </NavLink>
            {props.items ? <h1 className="site-title">Snap Bid</h1> : <h1 className="site-title-left">Snap Bid</h1>}
            
            {props.items && 
                <div className="search-container">
                    <form className='mini-form' onSubmit={handleSearch}>
                    <input
                        type="text"
                        id="search"
                        value={search}
                        placeholder='Search...'
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className="button" type="submit">Go</button>
                    </form>
            </div>}
            <nav className="header-links">
                <NavLink to="/about">About</NavLink>
                <NavLink to="/items">Auction</NavLink>
                {props.admin && <NavLink to="/add">Add Item</NavLink>}
                {!props.auth ? <NavLink to="/login">Login</NavLink> : <button className='logout-button' onClick={handleLogout}>Logout</button>}
            </nav>
        </header>
    );
}

export default Header;
