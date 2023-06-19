import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { UseOpenFormComponentType } from '../../interfaces';

import { OpenFormDialog } from '../OpenForm';

export const OpenForm100Dialog: UseOpenFormComponentType = ({ onClose }) => {
    const navigate = useNavigate();

    const goToUpdateMode = useCallback((personId?: string) => () => {
        if (!personId) {
            return;
        }
        navigate(`/form100/${personId}`, { state: { readonly: true } });
    }, [navigate]);

    const goToCreateMode = useCallback(() => {
        navigate('/form100', { state: { readonly: true } });
    }, [navigate]);

    const title = 'Ви бажаєте створити нову Форму 100 чи переглянути існуючу?'

    return (
        <OpenFormDialog
            title={title}
            goToUpdateMode={goToUpdateMode}
            goToCreateMode={goToCreateMode}
            onClose={onClose}
        />
    );
};
