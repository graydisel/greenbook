import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import AddShoppingCartTwoToneIcon from '@mui/icons-material/AddShoppingCartTwoTone';
import type {GoogleBook} from "../../redux/books/booksTypes.ts";
import {Link as RouterLink} from "react-router-dom";
import {designTokens} from "../../assets/style/variables.ts";

interface BookCardProps {
    book: GoogleBook;
    onAddBook: (book: GoogleBook) => void;
}

export const BookCard = ({book, onAddBook}: BookCardProps) => {
    const generatedPrice = ((book.id.charCodeAt(0) + book.id.length) % 21) + 8.99;
    const shouldShowGeneratedPrice = book.id.charCodeAt(book.id.length - 1) % 2 === 0;
    const displayPrice = book.saleInfo.listPrice?.amount
        ? `${book.saleInfo.listPrice.amount.toFixed(2)} $`
        : shouldShowGeneratedPrice
            ? `${generatedPrice.toFixed(2)} $`
            : "Price on request";

    return (
        <Card sx={{height: '100%', display: 'flex', flexDirection: 'column', borderRadius: designTokens.radius.card}}>
            <CardActionArea component={RouterLink} to={`/book/${book.id}`} sx={{flexGrow: 1}}>
                <CardMedia
                    sx={{
                        height: 240,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundColor: designTokens.color.cardMediaBackground,
                    }}
                    image={book.volumeInfo.imageLinks?.thumbnail ?? book.volumeInfo.imageLinks?.smallThumbnail}
                    title="Book Picture"
                />
                <CardContent sx={{flexGrow: 1}}>
                    <Typography gutterBottom variant="h6" component="div" noWrap>
                        {book.volumeInfo.title}
                    </Typography>
                    <Typography variant="body2" sx={{color: 'text.secondary'}}>
                        {book.volumeInfo.authors?.join(', ') ?? "Unknown author"}
                    </Typography>
                    <Typography variant="body2" sx={{color: 'text.secondary', mt: 1}}>
                        Price: {displayPrice}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" onClick={() => onAddBook(book)} startIcon={<AddShoppingCartTwoToneIcon/>}>
                    Add to Cart
                </Button>
            </CardActions>
        </Card>
    )
}