import { Box, Container, ThemeProvider, Typography } from "@mui/material"
import hotel from '../assets/hotel.jpg';
import './about.css'
import { createTheme } from '@mui/material/styles';

export const About = () => {

    const theme = createTheme({
        typography: {
            fontFamily: 'Rubik, sans-serif',
        },
    });

    return (


        <ThemeProvider theme={theme}>
            <div className="Image">-
                <Container maxWidth="md" sx={{
                    mt: 4
                }} className="continer">
                    <Typography variant="h4" align="center" sx={{ mb: 4 }}>
                        אודות המלון
                    </Typography>
                    <Typography variant="h6" align="center" sx={{ mb: 3 }}>
                        !ברוכים הבאים למלון  שלנו
                    </Typography>
                    <Typography variant="body1" align="center" sx={{ mb: 2 }}>
                        .אנחנו מאמינים בספקטרום המלא של חוויות ואנו מתאמצים לספק את השירותים הטובים ביותר
                        לאורחים שלנו
                    </Typography>
                    <Typography variant="body1" align="center" sx={{ mb: 2 }}>
                        . המלון שלנו ממוקם במקום מרכזי ומציע נופים מהממים של הים והאזור הסביבתי

                    </Typography>
                    <Typography variant="body1" align="center" sx={{ mb: 2 }}>
                        ,המלון שלנו מציע מגוון חדרים יוקרתיים ומרווחים, מסעדה איכותית, בר, בריכה, מרכז כושר ועוד
                    </Typography>
                    <Typography variant="body1" align="center" sx={{ mb: 2 }}>
                        . תפנו אלינו לשאול שאלות או
                        לבצע הזמנות ואנחנו נשמח לעמוד לשירותכם
                    </Typography>
                    <Typography variant="body1" align="center" sx={{ mb: 2 }}>
                        כמו כן, אנחנו גאים בצוות המקצועי שלנו שמתעדכן בכל הטכנולוגיות העדכניות ומחויב לספק את החוויות הטובות ביותר
                        לכל אחד מהאורחים שלנו
                    </Typography>
                    <Typography variant="h6" align="center">
                        .אנו מזמינים אתכם לבקר במלון שלנו ולחוות את האירוח המופלא שאנחנו מספקים
                    </Typography>
                    <br />
                    <Typography variant="h5" align="center">
                        ! נשמח לראותכם
                    </Typography>
                </Container></div></ThemeProvider>
    )


}