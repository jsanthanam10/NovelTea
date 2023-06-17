import Book from '@models/bookinfo'
import { connectToDB } from "@utils/database";

export const GET = async (req) => {
    try {
        await connectToDB();
        const books = await Book.find({});
        console.log('Books fetched', books);
        return new Response(JSON.stringify(books), { status: 200 });

    } catch (error) {
        console.log(error);
        return new Response("Failed to fetch books", { status: 500 });
    }
}

