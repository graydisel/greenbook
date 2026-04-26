import type {BookCartType} from "../../redux/bookCart/bookCartTypes.ts";
import {Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Stack, Typography} from "@mui/material";
import {mainColor} from "../../assets/style/variables.ts";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface BookCardProps {
    bookInfo: BookCartType,
    increaseQuantity: (bookId: string) => void,
    decreaseQuantity: (bookId: string) => void,
    removeFromCart: (bookId: string) => void,
}

export const BookCardCart = ({bookInfo, increaseQuantity, decreaseQuantity, removeFromCart}: BookCardProps) => {
    return (
        <Card
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: 3,
                border: "1px solid rgba(40, 104, 67, 0.16)",
                boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
            }}
        >
            <Box sx={{p: 1.5, display: "flex", gap: 1.5, flexGrow: 1}}>
                <CardMedia
                    image={bookInfo.volumeInfo.imageLinks?.smallThumbnail}
                    title="Book Picture"
                    sx={{
                        width: 90,
                        height: 130,
                        borderRadius: 2,
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                        backgroundColor: "#f7f7f7",
                    }}
                />
                <CardContent sx={{p: 0, "&:last-child": {pb: 0}, flexGrow: 1}}>
                    <Typography
                        component="div"
                        sx={{
                            fontWeight: 700,
                            mb: 0.5,
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                        }}
                    >
                        {bookInfo.volumeInfo.title}
                    </Typography>
                    <Typography variant="body2" sx={{color: "text.secondary", mb: 1}}>
                        {bookInfo.volumeInfo.authors}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                        <Chip
                            label={`Price: ${bookInfo.saleInfo.listPrice?.amount}$`}
                            size="small"
                            sx={{backgroundColor: "rgba(40, 104, 67, 0.08)", color: mainColor}}
                        />
                        <Chip
                            label={`Qty: ${bookInfo.quantity}`}
                            size="small"
                            sx={{backgroundColor: "rgba(40, 104, 67, 0.08)", color: mainColor}}
                        />
                    </Stack>
                </CardContent>
            </Box>
            <CardActions sx={{px: 1.5, pb: 1.5, pt: 0.5, display: "flex", gap: 1, justifyContent: "space-between"}}>
                <Stack direction="row" spacing={1}>
                    <Button
                        size="small"
                        variant="contained"
                        onClick={() => increaseQuantity(bookInfo.id)}
                        sx={{minWidth: 36, backgroundColor: mainColor, "&:hover": {backgroundColor: mainColor, opacity: 0.9}}}
                    >
                        <AddIcon />
                    </Button>
                    <Button
                        size="small"
                        variant="outlined"
                        onClick={() => decreaseQuantity(bookInfo.id)}
                        sx={{minWidth: 36, borderColor: mainColor, color: mainColor}}
                    >
                        <RemoveIcon />
                    </Button>
                </Stack>
                <Button
                    size="small"
                    color={"warning"}
                    variant="text"
                    onClick={() => removeFromCart(bookInfo.id)}
                >
                    Remove
                </Button>
            </CardActions>
        </Card>
    )
}