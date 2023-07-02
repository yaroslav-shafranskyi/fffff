import {  useCallback, useState } from 'react';

import { UseOpenFormComponentType } from '../../interfaces';


export const useOpenFormDialog = (Component: UseOpenFormComponentType) => {
    const [open, setOpen] = useState<boolean>(false);
    
    const handleOpen = useCallback(() => {
        setOpen(true);
    }, []);

    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);

    const node = open && <Component onClose={handleClose} />;

    return [node, handleOpen] as const;
};
