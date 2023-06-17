import BookPage from '@components/SchoolPage';



export default function Book({ params } ) {
    
    return (
        <div>
            <BookPage bookId={params.bookId} />
        </div>
    )
}