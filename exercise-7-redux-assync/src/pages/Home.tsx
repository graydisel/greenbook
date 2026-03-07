import {Link} from "react-router-dom";
import {Box, Container, Typography} from "@mui/material";
import {BookCarousel} from "../components/common/BookCarousel.tsx";

export const Home = () => {
    return (
        <Container sx={{display: 'flex', flexDirection: 'column', gap: '1rem', px: {xs: '10px', md: '20px'}}}>
            <Box sx={{display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center'}}>
                <Typography sx={{textAlign: "center"}} variant={"h3"}>Welcome Home</Typography>
                <Box sx={{maxWidth: {xs: '80%', md: '600px'}}}
                    component={'img'} src="/home/book.png" alt="Book">
                </Box>
            </Box>
            <div>
                <Link to={'/books'}>Books</Link>
            </div>
            <Box sx={{mt: 2}}>
                <BookCarousel/>
            </Box>
        </Container>
    )
}
