// GET REQUIREMENTS
import Router from 'express';
import {createItem, getItems, getItem, deleteItem, addBid} from '../controllers/itemController.js';


// INITIATE ROUTER
const itemsRouter = Router();

// GET all items
itemsRouter.get('/', getItems);

// POST add a new item
itemsRouter.post('/', createItem);

// GET a single item
itemsRouter.get('/:id', getItem);

// PATCH a new bid to an item
itemsRouter.put('/:id', addBid);

// DELETE an item
itemsRouter.delete('/:id', deleteItem);

export default itemsRouter;