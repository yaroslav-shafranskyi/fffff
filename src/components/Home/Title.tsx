import { Typography, Box } from "@mui/material"

import { titleWrapperStyles } from "./styles"

export const Title = () => 
    <Box sx={titleWrapperStyles}>
        <Typography variant='h4'>
            Опіка за Пораненими: Швидко та Надійно
        </Typography>
        <Typography>
            Інтегроване рішення для обліку та моніторингу стану поранених
        </Typography>
    </Box>
