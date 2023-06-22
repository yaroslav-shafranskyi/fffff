import {   createTheme } from '@mui/material';
import { ukUA } from '@mui/material/locale'

export const theme = createTheme({
    palette: {
        secondary: {
            main: '#F4E2F6',
            dark: '#EDDFEF',
            contrastText: '#1E1E1E',
        },
        primary: {
            light: '#D5D8E3',
            200: '#C0C2CC',
            main: '#ADAFB',
            400: '#9B9DA5',
            dark: '#1B504E',
            contrastText: '#1E1E1E',
        },
        text: {
            primary: '#1E1E1E',
        },
        background: {
            paper: '#F5F2F2',
            default: '#F5F2F2',
        },
        error: {
            main: '#FE654F',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                colorInherit: {
                    backgroundColor: '#1B504E',
                    color: '#F5F2F2',
                    '&:hover': {
                        backgroundColor: '#3AA9A5',
                    }
                },
                containedPrimary: {
                    backgroundColor: '#48D1CC',
                    '&:hover': {
                        backgroundColor: '#3AA9A5',
                    },
                },
                containedSecondary: {
                    backgroundColor: '#B0ECEA',
                    '&:hover': {
                        backgroundColor: '#54EDE7',
                    },
                },
            },
        },
    },
}, ukUA);

/*
    the previous version of primary colors
    different variants of light green color

            primary: {
            50: '#A7F9F6',
            light: '#B0ECEA',
            200: '#54EDE7',
            main: '#48D1CC',
            400: '#41BCB8',
            dark: '#3AA9A5',
            contrastText: '#1E1E1E',
        },
*/
