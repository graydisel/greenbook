import {Box, Link, Typography} from "@mui/material";
import CallIcon from '@mui/icons-material/Call';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import {mainColor} from "../../assets/style/variables.ts";

export const Footer = () => {
    return (
        <Box sx={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '1rem',
            justifyContent: 'space-between', backgroundColor: mainColor,
            color: 'white'
        }}>
            <Box sx={{ display: 'flex', justifyContent: {xs: 'center', md: 'start'}, gap: '5px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
                    <Typography>Contacts:</Typography>
                    <CallIcon/>
                    <Link href="tel:+3596640781" underline="none" sx={{ color: 'white', ":hover": {color: '#c3c3c3'}}}>
                        {'+3596640781'}
                    </Link>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
                    <Typography>Messengers:</Typography>
                    <Box>
                        <Link href="#" underline="none" sx={{ color: 'white', ":hover": {color: '#c3c3c3'}}}>
                            <InstagramIcon/>
                        </Link>
                        <Link href="#" underline="none" sx={{ color: 'white', ":hover": {color: '#c3c3c3'}}}>
                            <WhatsAppIcon/>
                        </Link>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant="caption">"GREENBOOK". All rights reserved.</Typography>
            </Box>
        </Box>
    )
}