import { Box, Typography } from '@mui/material';

import { BodyDamageInfo, IForm100 } from '../../../../api';

import { boldTextStyles, cursorPointerStyles, displayFlexStyles, severalInlineOptionsWrapperStyles } from '../../styles';

import {
    bodyDamageInfoWrapperStyles,
    bodyDamageWrapperStyles,
    bodyImageTipWrapperStyles,
    bodyImagesWrapperStyles
} from './styles';
import { useFormContext } from 'react-hook-form';

export const BodyDamage = () => {
    const { watch, setValue } = useFormContext<IForm100>();

    const { bodyDamage: info, bodyImage } = watch();
    const { front, back } = bodyImage;

    const getBodyDamageColor = (damage: BodyDamageInfo) => info.includes(damage) ? 'error' : 'textPrimary';

    const updateBodyDamage = (damage: BodyDamageInfo) => () => {
        const damageIdx = info.findIndex(d => d === damage) ?? -1;
        const newInfo = damageIdx < 0 ? [...info, damage] : [...info.slice(0, damageIdx), ...info.slice(damageIdx + 1)];
        setValue('bodyDamage', newInfo);
    };

    return (
        <Box sx={bodyDamageWrapperStyles}>
            <Box sx={bodyImageTipWrapperStyles}>
                <Typography sx={{ textAlign: 'center', fontSize: '0.6rem' }} variant='subtitle2'>
                    локалізацію обвести
                </Typography>
            </Box>
            <Box sx={bodyImagesWrapperStyles}>
                <Box sx={cursorPointerStyles}>
                    {front ?? null}
                </Box>
                <Box sx={cursorPointerStyles}>
                    {back ?? null}
                </Box>
            </Box>
            <Box sx={bodyDamageInfoWrapperStyles}>
                <Typography sx={boldTextStyles}>
                    підкреслити
                </Typography>
                <Box sx={displayFlexStyles}>
                    <Box sx={cursorPointerStyles} onClick={updateBodyDamage(BodyDamageInfo.SOFT_TISSUES)}>
                        <Typography color={getBodyDamageColor(BodyDamageInfo.SOFT_TISSUES)}>
                            {BodyDamageInfo.SOFT_TISSUES}
                        </Typography>
                    </Box>,
                </Box>
                <Box sx={severalInlineOptionsWrapperStyles}>
                    <Box sx={displayFlexStyles}>
                        <Box sx={cursorPointerStyles} onClick={updateBodyDamage(BodyDamageInfo.BONES)}>
                            <Typography color={getBodyDamageColor(BodyDamageInfo.BONES)}>
                                {BodyDamageInfo.BONES}
                            </Typography>
                        </Box>,
                    </Box>
                    <Box sx={displayFlexStyles}>
                        <Box sx={cursorPointerStyles} onClick={updateBodyDamage(BodyDamageInfo.VESSELS)}>
                            <Typography color={getBodyDamageColor(BodyDamageInfo.VESSELS)}>
                                {BodyDamageInfo.VESSELS}
                            </Typography>
                        </Box>,
                    </Box>
                </Box>
                <Box sx={displayFlexStyles}>
                    <Box sx={cursorPointerStyles} onClick={updateBodyDamage(BodyDamageInfo.CAVITY_WOUNDS)}>
                        <Typography color={getBodyDamageColor(BodyDamageInfo.CAVITY_WOUNDS)}>
                            {BodyDamageInfo.CAVITY_WOUNDS}
                        </Typography>
                    </Box>,
                </Box>
                <Box sx={cursorPointerStyles} onClick={updateBodyDamage(BodyDamageInfo.BURN)}>
                    <Typography color={getBodyDamageColor(BodyDamageInfo.BURN)}>
                        {BodyDamageInfo.BURN}
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
};
