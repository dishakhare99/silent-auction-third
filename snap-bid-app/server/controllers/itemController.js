import ItemModel from '../models/itemModel.js';
import requireAuth from '../middlewares/reqAuth.js';
import requireAdmin from '../middlewares/reqAdmin.js';
import jwt from 'jsonwebtoken';

// Get all items
const getItems = async (req,res)=>{
    try {
        const items = await ItemModel.find({}).sort({title: 1});
        res.status(200).json(items);
    } catch (error) {
        res.status(400).json({error: `Error fetching items: ${error.message}`});
    }
}

// Get a single item
const getItem = async (req,res)=>{
    const {id} = req.params;
    try {
        const item = await ItemModel.findById(id);
        if (!item){
            return res.status(404).json({error: 'Item not found'});
        }
        res.status(200).json(item);
    } catch (error) {
        if (error.name == 'CastError') {
            return res.status(404).json({error: 'Item not found'});
        }
        res.status(400).json({error: `Error fetching item: ${error.message}`});
    }
}

// Create new item
const createItem = async (req,res)=>{
    try {
        requireAuth(req,res);
        requireAdmin(req,res);
        const {title, description, minBid, image} = req.body;
    
        let emptyFields = []
        if(!title) {
            emptyFields.push('Title');
        }
        if(!description) {
            emptyFields.push('Description');
        }
        if(!minBid) {
            emptyFields.push('Minimum Bid');
        }
        else if (isNaN(minBid) || Number(minBid) < 0) {
            emptyFields.push('Minimum Bid');
        }
        if(!image) {
            emptyFields.push('Image URL');
        }
    
        if(emptyFields.length > 0) {
            return res.status(400).json({error: `Please fill the ${
                emptyFields.map(field=>{return  ' ' + field})
            } field(s) properly`})
        }
    
        try {
            await ItemModel.create({title, description, minBid, image});
            res.status(200).json({message: 'New item created.'});
        } catch (error) {
            res.status(400).json({error: `Error during creating new item: ${error.message}`});
        };
    } catch (error) {
        res.status(401).json({error: error.message});
    }
};

// Add new bid to an item
const addBid = async (req, res) => {
    const { id } = req.params;
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: 'No token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = decoded.userName;
        const { amount } = req.body;

        if (!id || !user || !amount || isNaN(amount)) {
            return res.status(400).json({ error: 'Some needed data is not provided or not proper' });
        }

        try {
            const item = await ItemModel.findById(id);
            if (!item) {
                return res.status(404).json({ error: 'Item not found' });
            }

            if (item.bidHistory.length > 0 && amount <= item.bidHistory[0].amount) {
                return res.status(400).json({ error: `You should bid higher than the last bid: ${item.bidHistory[0].amount}` });
            }

            if (amount < item.minBid) {
                return res.status(400).json({ error: `You should bid at least the minimum bid: ${item.minBid}` });
            }

            const bid = { amount: amount, bidder: user };

            await ItemModel.findByIdAndUpdate(
                id,
                { $push: { bidHistory: { $each: [bid], $position: 0 } } }
            );

            return res.status(200).json({ message: 'Bid added.' });
        } catch (error) {
            console.error('Error fetching item or updating bid:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token', token: token});
    }
};

// Delete item
const deleteItem = async (req,res)=>{
    requireAuth(req,res);
    requireAdmin(req,res);
    const {id} = req.params;
    try {
        const item = await ItemModel.findByIdAndDelete(id);
        if (!item) {
            return res.status(404).json({error: 'Item not found'});
        }
        res.status(200).json({message: `${item.title} is deleted.`});
    } catch (error) {
        if (error.name == 'CastError') {
            return res.status(404).json({error: 'Item not found'});
        }
        res.status(400).json({error: `Error deleting item: ${error.message}`});
    }
}

export {createItem, getItems, getItem, deleteItem, addBid};