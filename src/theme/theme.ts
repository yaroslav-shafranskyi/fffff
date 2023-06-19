import {   createTheme } from '@mui/material';
import { ukUA } from '@mui/material/locale'

export const theme = createTheme({
    palette: {
        primary: {
            50: '#A7F9F6',
            light: '#B0ECEA',
            200: '#54EDE7',
            main: '#48D1CC',
            400: '#41BCB8',
            dark: '3AA9A5',
            contrastText: '#1E1E1E',
        },
        secondary: {
            main: '#F4E2F6',
            dark: '#EDDFEF',
            contrastText: '#1E1E1E',
        },
        grey: {
            100: '#D5D8E3',
            200: '#C0C2CC',
            300: '#ADAFB',
            400: '#9B9DA5',
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
}, ukUA);
