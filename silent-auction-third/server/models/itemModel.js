
import mongoose from 'mongoose';
const {Schema, model} = mongoose;

const historySchema = new Schema({
    amount:{
        type: Number,
        required: true
    },
    bidder:{
        type: String,
        required: true
    }
});

const itemSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    minBid:{
        type: Number,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    bidHistory:[historySchema]
});

const ItemModel = model('Item', itemSchema);

export default ItemModel;