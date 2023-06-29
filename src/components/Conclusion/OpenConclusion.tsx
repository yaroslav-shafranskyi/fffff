import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { UseOpenFormComponentType } from '../../interfaces';
import { conclusionUrl } from '../../constants';
import { IPerson } from '../../api';

import { OpenFormDialog } from '../OpenForm';

export const OpenConclusionForm: UseOpenFormComponentType = ({ onClose }) => {
    const navigate = useNavigate();

    const goToUpdateMode = useCallback((person?: IPerson) => () => {
        if (!person) {
            return;
        }
        const lastConclusionId = person.lastRecords.conclusion?.id;
        const formIdUrl = lastConclusionId !== undefined ? '/' + lastConclusionId : '';
        navigate(`${conclusionUrl}/${person.id}${formIdUrl}`, { state: { readonly: true } });
    }, [navigate]);

    const goToCreateMode = useCallback((personId?: string) => () => {
        const url = !personId ? `${conclusionUrl}/create` : `${conclusionUrl}/${personId}`
        navigate(url);
    }, [navigate]);

    const title = 'Ви бажаєте створити новий консультаційний висновок чи переглянути існуючий?'

    return (
        <OpenFormDialog
            title={title}
            goToUpdateMode={goToUpdateMode}
            goToCreateMode={goToCreateMode}
            onClose={onClose}
        />
    );

};
