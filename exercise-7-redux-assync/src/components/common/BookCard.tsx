import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import AddShoppingCartTwoToneIcon from '@mui/icons-material/AddShoppingCartTwoTone';
import type {GoogleBook} from "../../redux/books/booksTypes.ts";

interface BookCardProps {
    book: GoogleBook;
    onAddBook: (book: GoogleBook) => void;
}

export const BookCard = ({book, onAddBook}: BookCardProps) => {
    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardMedia
                sx={{
                    height: 200,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    pt: 2,
                    backgroundColor: 'inherit',
                }}
                image={book.volumeInfo.imageLinks?.smallThumbnail}
                title="Book Picture"
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                    {book.volumeInfo.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {book.volumeInfo.authors ? (
                        book.volumeInfo.authors.join(', ')
                    ) : (
                        "No Author"
                    )}
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    Rating: {book.volumeInfo.averageRating ? book.volumeInfo.averageRating : ('No rating')}
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    Sale: {(book.saleInfo.saleability === "FOR_SALE") ? (book.saleInfo.listPrice?.amount.toFixed(2) + '$') : "Not available"}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => onAddBook(book)} disabled={!book.saleInfo.listPrice?.amount}><AddShoppingCartTwoToneIcon/></Button>
            </CardActions>
        </Card>
    )
}