import Book from '@models/bookinfo'
import { connectToDB } from "@utils/database";


export const GET = async (req, { params }) => {
    try {
        await connectToDB()
        // Print bookId
        const book = await Book.findById(params.bookId)
        if (!book) return new Response("Book Not Found", { status: 404 });

        return new Response(JSON.stringify(book), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}
