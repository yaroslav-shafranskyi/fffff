import { FC, useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';

import { BodyDamageInfo, IForm100 } from '../../../../api';

import { boldTextStyles, cursorPointerStyles, displayFlexStyles, severalInlineOptionsWrapperStyles } from '../../styles';

import {
    bodyDamageInfoWrapperStyles,
    bodyDamageWrapperStyles,
    bodyImageTipWrapperStyles,
    bodyImagesWrapperStyles
} from './styles';

import { IFCPropsWithReadonly } from '../../../../interfaces';

export const BodyDamage: FC<IFCPropsWithReadonly> = ({ readonly }) => {
    const { watch, setValue } = useFormContext<IForm100>();

    const { bodyDamage: info, bodyImage } = watch();
    const { front, back } = bodyImage;

    const getBodyDamageColor = (damage: BodyDamageInfo) => info.includes(damage) ? 'error' : 'textPrimary';

    const updateBodyDamage = useCallback((damage: BodyDamageInfo) => () => {
        if (readonly) {
            return;
        }
        const damageIdx = info.findIndex(d => d === damage) ?? -1;
        const newInfo = damageIdx < 0 ? [...info, damage] : [...info.slice(0, damageIdx), ...info.slice(damageIdx + 1)];
        setValue('bodyDamage', newInfo);
    }, [info, readonly, setValue]);

    const clickableBoxStyles = readonly ? {} : cursorPointerStyles;

    return (
        <Box sx={bodyDamageWrapperStyles}>
            <Box sx={bodyImageTipWrapperStyles}>
                <Typography sx={{ textAlign: 'center', fontSize: '0.6rem' }} variant='subtitle2'>
                    локалізацію обвести
                </Typography>
            </Box>
            <Box sx={bodyImagesWrapperStyles}>
                <Box sx={clickableBoxStyles}>
                    {front ?? null}
                </Box>
                <Box sx={clickableBoxStyles}>
                    {back ?? null}
                </Box>
            </Box>
            <Box sx={bodyDamageInfoWrapperStyles}>
                <Typography sx={boldTextStyles}>
                    підкреслити
                </Typography>
                <Box sx={displayFlexStyles}>
                    <Box sx={clickableBoxStyles} onClick={updateBodyDamage(BodyDamageInfo.SOFT_TISSUES)}>
                        <Typography color={getBodyDamageColor(BodyDamageInfo.SOFT_TISSUES)}>
                            {BodyDamageInfo.SOFT_TISSUES}
                        </Typography>
                    </Box>,
                </Box>
                <Box sx={severalInlineOptionsWrapperStyles}>
                    <Box sx={displayFlexStyles}>
                        <Box sx={clickableBoxStyles} onClick={updateBodyDamage(BodyDamageInfo.BONES)}>
                            <Typography color={getBodyDamageColor(BodyDamageInfo.BONES)}>
                                {BodyDamageInfo.BONES}
                            </Typography>
                        </Box>,
                    </Box>
                    <Box sx={displayFlexStyles}>
                        <Box sx={clickableBoxStyles} onClick={updateBodyDamage(BodyDamageInfo.VESSELS)}>
                            <Typography color={getBodyDamageColor(BodyDamageInfo.VESSELS)}>
                                {BodyDamageInfo.VESSELS}
                            </Typography>
                        </Box>,
                    </Box>
                </Box>
                <Box sx={displayFlexStyles}>
                    <Box sx={clickableBoxStyles} onClick={updateBodyDamage(BodyDamageInfo.CAVITY_WOUNDS)}>
                        <Typography color={getBodyDamageColor(BodyDamageInfo.CAVITY_WOUNDS)}>
                            {BodyDamageInfo.CAVITY_WOUNDS}
                        </Typography>
                    </Box>,
                </Box>
                <Box sx={clickableBoxStyles} onClick={updateBodyDamage(BodyDamageInfo.BURN)}>
                    <Typography color={getBodyDamageColor(BodyDamageInfo.BURN)}>
                        {BodyDamageInfo.BURN}
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
};
