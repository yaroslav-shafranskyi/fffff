import { useFormContext } from "react-hook-form";
import { Box, Typography } from '@mui/material';

import { IForm100, SanitaryTreatmentStatus } from "../../../../api";
import { cursorPointerStyles, displayFlexStyles, severalInlineOptionsWrapperStyles } from "../../styles";
import { sanitaryStatusWrapperStyles } from "./styles";

export const SanitaryStatus = () => {
    const { formState, watch, setValue } = useFormContext<IForm100>();

    const sanitaryTreatment = watch('sanitaryTreatment');

    const error = formState.errors.sanitaryTreatment?.message;

    const updateSanitaryTreatmentStatus = (type: SanitaryTreatmentStatus) => () => {
        setValue('sanitaryTreatment', type);
    };

    const getSanitaryTreatmentStatusColor = (type: SanitaryTreatmentStatus) => sanitaryTreatment === type ? 'error' : 'textPrimary';

    return (
        <Box sx={sanitaryStatusWrapperStyles}>
            <Typography>
                Санітарна обробка (підкреслити)
            </Typography>
            <Box sx={severalInlineOptionsWrapperStyles}>
                <Box sx={displayFlexStyles}>
                    <Box sx={cursorPointerStyles} onClick={updateSanitaryTreatmentStatus(SanitaryTreatmentStatus.FULL)}>
                        <Typography color={getSanitaryTreatmentStatusColor(SanitaryTreatmentStatus.FULL)}>
                            {SanitaryTreatmentStatus.FULL}
                        </Typography>
                    </Box>,
                </Box>
                <Box sx={displayFlexStyles}>
                    <Box sx={cursorPointerStyles} onClick={updateSanitaryTreatmentStatus(SanitaryTreatmentStatus.PARTICULAR)}>
                        <Typography color={getSanitaryTreatmentStatusColor(SanitaryTreatmentStatus.PARTICULAR)}>
                            {SanitaryTreatmentStatus.PARTICULAR}
                        </Typography>
                    </Box>,
                </Box>
                <Box sx={cursorPointerStyles} onClick={updateSanitaryTreatmentStatus(SanitaryTreatmentStatus.NONE)}>
                    <Typography color={getSanitaryTreatmentStatusColor(SanitaryTreatmentStatus.NONE)}>
                        {SanitaryTreatmentStatus.NONE}
                    </Typography>
                </Box>
            </Box>
            {error && <Typography color='error'>{error}</Typography>}
            <Typography>
                Евакуйований (потрібне обвести)
            </Typography>
        </Box>
    );
};
