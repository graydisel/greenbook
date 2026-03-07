import {Link} from "react-router-dom";
import {Container} from "@mui/material";

export const Home = () => {
    return (
        <Container sx={{display: 'flex', flexDirection: 'column', gap: '1rem', px: {xs: '10px', md: '20px'}}}>
            <h1>Welcome Home</h1>
            <div>
                <Link to={'/books'}>Books</Link>
            </div>
        </Container>
    )
}