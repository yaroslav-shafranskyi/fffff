import { useFormContext } from "react-hook-form";
import { Box, Typography } from '@mui/material';

import { IForm100, SanitaryTreatmentStatus } from "../../../../api";
import { cursorPointerStyles, displayFlexStyles, severalInlineOptionsWrapperStyles } from "../../styles";
import { sanitaryStatusWrapperStyles } from "./styles";

export const SanitaryStatus = () => {
    const { watch, setValue } = useFormContext<IForm100>();

    const sanitaryTreatment = watch('sanitaryTreatment');

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
            <Typography>
                Евакуйований (потрібне обвести)
            </Typography>
        </Box>
    );
};
