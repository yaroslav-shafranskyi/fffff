import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { personsUrl } from '../../constants';
import { Forms } from '../../api';

import { useOpenFormDialog } from '../OpenForm';
import { OpenForm100Dialog } from '../Form100';
import { OpenPersonDialog } from '../PersonPage';
import { OpenDischargeForm } from '../Discharge';
import { OpenReferralForm } from '../Referral';
import { OpenConclusionForm } from '../Conclusion';

import { 
    buttonDescStyles,
    form100ButtonStyles,
    lightButtonStyles,
    mainButtonStyles,
    mainLowerButtonsStyles,
    mainUpperButtonsStyles,
    mainWrapperStyles,
    searchButtonStyles
} from './styles';

export const Main = () => {
    const [Form100Dialog, openForm100Dialog] = useOpenFormDialog(OpenForm100Dialog);
    const [PersonDialog, openPersonDialog] = useOpenFormDialog(OpenPersonDialog);
    const [DischargeFormDialog, openDischargeFormDialog] = useOpenFormDialog(OpenDischargeForm);
    const [ReferralDialog, openReferralDialog] = useOpenFormDialog(OpenReferralForm);
    const [ConclusionDialog, openConclusionFormDialog] = useOpenFormDialog(OpenConclusionForm);

    const navigate = useNavigate();

    const goToPersonsTable = () => {
        navigate(personsUrl);
    }

    return (
        <Box sx={mainWrapperStyles}>
            <Box sx={mainUpperButtonsStyles}>
                <Button variant='contained' sx={form100ButtonStyles} onClick={openForm100Dialog}>
                    <Typography variant='h4'>
                        {Forms.FORM_100}
                    </Typography>
                    <Typography sx={buttonDescStyles}>
                        Створіть або перегляньте форму для поранених чи хворих військовослужбовців.
                    </Typography>
                </Button>
                <Box sx={searchButtonStyles} onClick={openPersonDialog}>
                    <Button  variant='contained' color='secondary' sx={lightButtonStyles}>
                        <Typography variant='h5'>
                            Швидкий Пошук
                        </Typography>
                        <Typography sx={buttonDescStyles}>
                            Знайдіть інформацію про хворого чи пораненого швидко та ефективно.
                        </Typography>
                    </Button>
                    <Button  variant='contained' color='secondary' sx={lightButtonStyles} onClick={goToPersonsTable}>
                        <Typography variant='h5'>
                            Перелік Поранених
                        </Typography>
                        <Typography sx={buttonDescStyles}>
                            Перегляньте всю базу даних поранених.
                        </Typography>
                    </Button>
                </Box>
            </Box>
            <Box sx={mainLowerButtonsStyles}>
                <Button variant='contained' color='secondary' sx={mainButtonStyles}>
                    <Typography variant='h5' sx={{ textAlign: 'left' }} onClick={openConclusionFormDialog}>
                        {Forms.CONCLUSION}
                    </Typography>
                </Button>
                <Button variant='contained' color='secondary' sx={mainButtonStyles} onClick={openDischargeFormDialog}>
                    <Typography variant='h5'>
                        {Forms.DISCHARGE}
                    </Typography>
                </Button>
                <Button variant='contained' color='secondary' sx={mainButtonStyles} onClick={openReferralDialog}>
                    <Typography variant='h5'>
                        {Forms.REFERRAL}
                    </Typography>
                </Button>
            </Box>
            {Form100Dialog}
            {PersonDialog}
            {DischargeFormDialog}
            {ReferralDialog}
            {ConclusionDialog}
        </Box>
    );
};
