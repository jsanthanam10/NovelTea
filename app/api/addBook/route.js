import Book from '@models/bookinfo'
import { connectToDB } from "@utils/database";



export const POST = async (req) => {
    const body = await req.json();
    try {
        await connectToDB();
        const newBook = new Book({
            title: body.title,
            author: body.author,
            cover: body.cover,
            review: body.review,
            rating: body.rating,
            categories: body.categories,
        })
        console.log('book info received')
        console.log('NEW BOOK INFO', newBook)
        console.log('req.body', body)
        await newBook.save();
        console.log('New book added')
        return new Response(JSON.stringify(newBook), { status: 201 })

    } catch (error) {
        console.log(error);
        return new Response("Failed to create a new book", { status: 500 });
    }
}




