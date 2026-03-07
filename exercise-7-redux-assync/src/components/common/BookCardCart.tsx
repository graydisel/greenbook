import type {BookCartType} from "../../redux/bookCart/bookCartTypes.ts";
import {Box, Button, ButtonGroup, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";

interface BookCardProps {
    bookInfo: BookCartType,
    increaseQuantity: (bookId: string) => void,
    decreaseQuantity: (bookId: string) => void,
    removeFromCart: (bookId: string) => void,
}

export const BookCardCart = ({bookInfo, increaseQuantity, decreaseQuantity, removeFromCart}: BookCardProps) => {
    return (
        <Card sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
            <Box sx={{px: '5px', display: "flex", flexGrow: 1}}>
                <CardMedia image={bookInfo.volumeInfo.imageLinks?.smallThumbnail} title="Book Picture"
                           sx={{
                               width: 120,
                               backgroundSize: 'contain',
                               backgroundPosition: 'center',
                               backgroundColor: 'inherit',
                           }}
                />
                <CardContent>
                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                        {bookInfo.volumeInfo.authors}
                    </Typography>
                    <Typography component="div" sx={{maxWidth: '100%'}}>
                        {bookInfo.volumeInfo.title}
                    </Typography>
                    <Typography variant="body2">
                        Price: {bookInfo.saleInfo.listPrice?.amount}
                    </Typography>
                    <Typography variant="body2">
                        Quantity: {bookInfo.quantity}
                    </Typography>
                </CardContent>
            </Box>
            <CardActions>
                <ButtonGroup variant="contained" color="primary" aria-label="Medium-sized button group">
                    <Button size="small" onClick={() => increaseQuantity(bookInfo.id)}>+</Button>
                    <Button size="small" onClick={() => decreaseQuantity(bookInfo.id)} disabled={bookInfo.quantity === 1}>-</Button>
                    <Button size="small" color={"warning"} onClick={() => removeFromCart(bookInfo.id)}>Remove from Cart</Button>
                </ButtonGroup>
            </CardActions>
        </Card>
    )
}