import Book from '@models/bookinfo'
import { connectToDB } from "@utils/database";

export const GET = async (req) => {
    const bookId = req.params.id; // Assuming your route is set up to pass id as a URL parameter

    if (!bookId) {
        return new Response("No book ID provided", { status: 400 });
    }

    try {
        await connectToDB();
        const book = await Book.findById(bookId);
        console.log('Book fetched', book);

        if (!book) {
            return new Response("No such book exists", { status: 404 });
        }

        return new Response(JSON.stringify(book), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Failed to fetch book", { status: 500 });
    }
}
