import { FC, useState, useEffect, useCallback } from 'react';
import { Box, Typography } from '@mui/material';

import { BodyDamageInfo, IBodyImage } from '../../../../api';

import { boldTextStyles, cursorPointerStyles, displayFlexStyles, severalInlineOptionsWrapperStyles } from '../../styles';

import { IBodyDamageProps, BodyDamageDataType } from './types';
import {
    bodyDamageInfoWrapperStyles,
    bodyDamageWrapperStyles,
    bodyImageTipWrapperStyles,
    bodyImagesWrapperStyles
} from './styles';
import { defaultBodyDamageData } from './constants';

export const BodyDamage: FC<IBodyDamageProps> = (props) => {
    const { data, onChange } = props;
    const { image: propsImage, info: propsInfo } = data ?? defaultBodyDamageData;

    const [state, setState] = useState<BodyDamageDataType>(defaultBodyDamageData);

    const { info, image } = state;

    const updateState = useCallback((key: keyof BodyDamageDataType, value: IBodyImage | BodyDamageInfo[]) => {
        setState((prevState: BodyDamageDataType) => ({ ...prevState, [key]: value }))
    }, []); 

    useEffect(() => {
        updateState('image', propsImage);
    }, [propsImage, updateState]);

    useEffect(() => {
        updateState('info', propsInfo ?? []);
    }, [propsInfo, updateState]);

    const getBodyDamageColor = (damage: BodyDamageInfo) => info.includes(damage) ? 'error' : 'textPrimary';

    const updateBodyDamage = (damage: BodyDamageInfo) => () => {
        const damageIdx = info.findIndex(d => d === damage) ?? -1;
            setState(prevState => {
                const newInfo = damageIdx < 0 ? [...prevState.info, damage] : [...info.slice(0, damageIdx), ...info.slice(damageIdx + 1)];
                const newState = { ...prevState, info: newInfo };
                onChange?.(newState);
                return newState;
            });
    };

    return (
        <Box sx={bodyDamageWrapperStyles}>
            <Box sx={bodyImageTipWrapperStyles}>
                <Typography sx={{ textAlign: 'center' }} variant='subtitle2'>
                    локалізацію обвести
                </Typography>
            </Box>
            <Box sx={bodyImagesWrapperStyles}>
                <Box sx={cursorPointerStyles}>
                    {image?.front ?? null}
                </Box>
                <Box sx={cursorPointerStyles}>
                    {image?.back ?? null}
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
