import {Schema, model, models} from 'mongoose';

const bookSchema = new Schema({
    title : {
        type: String,
        unique: [true, 'Book Title Already Exists'],
        required: [true, 'Title is Required'],
    },
    author : {
        type: String,
        required: [true, 'Author is Required'],
    },
    cover : {
        type: String,
        required: [true, 'Cover is Required'],
    },
    review : {
        type: String,
        required: [true, 'Review is Required'],
    },
    rating : {
        type: Number,
        required: [true, 'Rating is Required'],
    }
}) 

const Book = models.Book || model('Book', bookSchema);

export default Book;