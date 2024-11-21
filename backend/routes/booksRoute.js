import express from 'express';
import {Book} from '../models/bookModel.js'

const router = express.Router()

//To get all books
router.get('/', async (req, res) => {
    try {

        const books = await Book.find({});

        return res.status(200).json({
            count: books.length,
            data: books
        });
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: error.message})   
    }
})

//to get a single book by its id
router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const book = await Book.findById(id);

        return res.status(200).json(book);
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: error.message})   
    }
})
//To create a book in the database.
router.post('/', async (req, res) => {
    try {
        if(!req.body.title || !req.body.author || !req.body.publishYear || !req.body.price){
            return res.status(400).send({message: 'send all required fileds: title, author, publishYear, price'})
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
            price: req.body.price
        };

        const book = await Book.create(newBook);
        return res.status(201).send(book)
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
        
    }
})

//To update a book
router.put('/:id', async(req, res) => {
    try {
        if(!req.body.title || !req.body.author || !req.body.publishYear || !req.body.price){
            return res.status(400).send({message: 'send all required fileds: title, author, publishYear, price'})
        }
        const {id} = req.params;

        const result = await Book.findByIdAndUpdate(id, req.body);

        if(!result){
            return res.status(404).send({message: 'Book not found'})
        }
        return res.status(200).send({message: 'Book updated successfully'})
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
})
//To delete a book
router.delete('/:id', async (req,res) => {
    try {
        const {id} = req.params;

        const bookDeleted = await Book.findByIdAndDelete(id);

        if(!bookDeleted){
            return res.status(404).json({message: 'Book not found'})
        }

        return res.status(200).json({message: 'Book has been deleted'})
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

export default router;