import {  useCallback, useState } from 'react';

import { OpenForm100Dialog } from './OpenForm100';

export const useOpenForm100Dialog = () => {
    const [open, setOpen] = useState<boolean>(false);
    
    const handleOpen = useCallback(() => {
        setOpen(true);
    }, []);

    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);

    const node = open && <OpenForm100Dialog onClose={handleClose} />;

    return [node, handleOpen] as const;
};
