import { FC, useCallback } from 'react';
import { useFormContext } from "react-hook-form";
import { Box, Typography } from '@mui/material';

import { IForm100, SanitaryTreatmentStatus } from "../../../../api";
import { IFCPropsWithReadonly } from '../../../../interfaces';

import { cursorPointerStyles, displayFlexStyles, severalInlineOptionsWrapperStyles } from "../../styles";
import { sanitaryStatusWrapperStyles } from "./styles";

export const SanitaryStatus: FC<IFCPropsWithReadonly> = ({ readonly }) => {
    const { formState, watch, setValue, clearErrors } = useFormContext<IForm100>();

    const sanitaryTreatment = watch('sanitaryTreatment');

    const error = formState.errors.sanitaryTreatment?.message;

    const updateSanitaryTreatmentStatus = useCallback((type: SanitaryTreatmentStatus) => () => {
        if (readonly) {
            return;
        }
        setValue('sanitaryTreatment', type);
        clearErrors('sanitaryTreatment')
    }, [clearErrors, readonly, setValue]);

    const getSanitaryTreatmentStatusColor = (type: SanitaryTreatmentStatus) => sanitaryTreatment === type ? 'error' : 'textPrimary';

    const clickableBoxStyles = readonly ? {} : cursorPointerStyles;

    return (
        <Box sx={sanitaryStatusWrapperStyles}>
            <Typography>
                Санітарна обробка (підкреслити)
            </Typography>
            <Box sx={severalInlineOptionsWrapperStyles}>
                <Box sx={displayFlexStyles}>
                    <Box sx={clickableBoxStyles} onClick={updateSanitaryTreatmentStatus(SanitaryTreatmentStatus.FULL)}>
                        <Typography color={getSanitaryTreatmentStatusColor(SanitaryTreatmentStatus.FULL)}>
                            {SanitaryTreatmentStatus.FULL}
                        </Typography>
                    </Box>,
                </Box>
                <Box sx={displayFlexStyles}>
                    <Box sx={clickableBoxStyles} onClick={updateSanitaryTreatmentStatus(SanitaryTreatmentStatus.PARTICULAR)}>
                        <Typography color={getSanitaryTreatmentStatusColor(SanitaryTreatmentStatus.PARTICULAR)}>
                            {SanitaryTreatmentStatus.PARTICULAR}
                        </Typography>
                    </Box>,
                </Box>
                <Box sx={clickableBoxStyles} onClick={updateSanitaryTreatmentStatus(SanitaryTreatmentStatus.NONE)}>
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
