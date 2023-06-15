import { Box, Typography } from '@mui/material';

import { boldTextStyles, displayFlexStyles } from "../../styles";

import { Stage } from "../Stage";
import { Form100Date } from '../Date';
import { BackField } from "../BackField";
import { Signature } from '../Signature';

import { backHeaderStyles, backWrapperStyles, footerStyles } from "./styles";

export const MainBack = () => {
    return (
        <Box sx={backWrapperStyles}>
            <Box sx={backHeaderStyles}>
                <Stage />
                <Box sx={{ textAlign: 'center'}}>
                    <Typography sx={boldTextStyles}>НАДІЙШОВ</Typography>
                    <Form100Date />
                </Box>
            </Box>
            <BackField title='Уточнений діагноз' field='fullDiagnosis' />
            <BackField title='Надана допомога' field='treatmentInfo' rows={7} />
            <BackField title='Евакуювати (куди, коли)' field='fullEvacuationInfo' />
            <BackField title='Результат (який, коли)' field='fullDiagnosis' />
            <Box sx={footerStyles}>
                <Typography>
                    ЛІКАР
                </Typography>
                <Signature />
                <Form100Date withoutTime={true} />
            </Box>
        </Box>
    );
};
