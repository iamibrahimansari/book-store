const mongoose = require('mongoose');

const Book = require('../models/book.model');

const sendResponse = (statusCode, response, data) =>{
    response.status(statusCode).send(typeof data === 'string' ? {error: data} : data);
}

const createBook = async (req, res) =>{
    const {title, author, publishYear} = req.body;
    if(!(title && author && publishYear)){
        return sendResponse(400, res, 'Fill all required fields: title, author and publishYear');
    }
    let newBook = new Book({...req.body});
    try{
        newBook = await newBook.save();
    }catch(error){
        return sendResponse(400, res, 'Duplicate book title is not allowed');
    }

    sendResponse(201, res, newBook);
}

const getBooks = async (req, res) =>{
    const books = await Book.find({});
    if(!books.length){
        return sendResponse(404, res, 'Book store is empty now');
    }
    if(!books){
        return sendResponse(400, res, 'Something went wrong while fetching the books');
    }    
    sendResponse(200, res, {count: books.length, data: books});
}

const getBook = async (req, res) =>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return sendResponse(404, res, 'This book is not avilable');
    }

    const book = await Book.findById(id);
    if(!book){
        return sendResponse(404, res, 'This book is not avilable');
    }
    sendResponse(200, res, book);
}

const updateBook = async (req, res) =>{
    const {title, author, publishYear} = req.body;
    if(!(title && author && publishYear)){
        return sendResponse(400, res, 'You can\'t update any field to empty space');
    }
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return sendResponse(404, res, 'This book is not avilable');
    }
    const updatedBook = await Book.findByIdAndUpdate(id, {...req.body}, {new: true});
    if(!updateBook){
        return sendResponse(404, res, 'This book is not avilable');
    }
    sendResponse(200, res, updatedBook);
}

const deleteBook = async (req, res) =>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return sendResponse(404, res, 'This book is not avilable');
    }
    const deletedBook = await Book.findByIdAndDelete(id);
    if(!deletedBook){
        return sendResponse(404, res, 'This book is not avilable');
    }
    sendResponse(200, res, deletedBook);
}

module.exports = {createBook, getBooks, getBook, updateBook, deleteBook};