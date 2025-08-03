
import { useState} from 'react';
import {useNavigate} from 'react-router-dom';

function ItemForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [minBid, setMinBid] = useState('');
    const [image, setImage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const clearInputs = ()=> {
            setTitle('');
            setDescription('');
            setMinBid('');
            setImage('');
        }
        const tempItem = {title, description, minBid, image};
        const newItem = await fetch(`${import.meta.env.VITE_API_URL}/items`, {
            method: 'POST',
            body: JSON.stringify(tempItem),
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        const newItemJson = await newItem.json();
        if (!newItem.ok) {
            clearInputs();
            return alert(newItemJson.error);
        };
        clearInputs();
        alert(`"${title}" is added to auction`);
        return navigate('/items');
    }

    return (
<div className="add-form-container">
      <form className="add-form" onSubmit={handleSubmit}>
        <h3>Add a New Item</h3>
        <div className="formGroup">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="min-bid">Minimum Bid:</label>
          <input
            type="text"
            id="min-bid"
            value={minBid}
            onChange={(e) => setMinBid(e.target.value)}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="image">Image URL:</label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <button className="button" type="submit">Add Item</button>
      </form>
    </div>
  );
}

export default ItemForm;