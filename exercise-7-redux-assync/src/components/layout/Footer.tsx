import { Box, Typography } from "@mui/material";
import { mainColor } from "../../assets/style/variables.ts";
import { Contacts } from "../common/Contacts.tsx";

export const Footer = () => {
    return (
        <Box
            sx={{
                padding: '10px',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                justifyContent: 'space-between',
                backgroundColor: mainColor,
                color: 'white',
            }}
        >
            <Contacts />
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant="caption">"GREENBOOK". All rights reserved.</Typography>
            </Box>
        </Box>
    )
}